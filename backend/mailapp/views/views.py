from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password, check_password
from mailapp.models import Email, UserMail
from django.http import JsonResponse
import boto3
import psycopg2
import os
import threading
thread_local = threading.local()

ENDPOINT = "mailapp-database-instance.c1woi26qsnpj.us-east-1.rds.amazonaws.com"
DATABASE_ID = "mailapp-database-instance"
PORT = 5432
USER = "postgres"
ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY_ID")
SECRET_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
PASSWORD = os.environ.get("AWS_DATABASE_PASSWORD")
REGION = "us-east-1"
DBNAME = "mail_db"


def get_connection():
    """
    Get a connection to the RDS PostgreSQL database.

    :return: The connection to the RDS PostgreSQL database.
    """
    # Retrieve or create a client for the current thread
    if not hasattr(thread_local, "connection"):
        # Set up the boto3 client
        rds_client = boto3.client(
            'rds',
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY,
            region_name=REGION,
        )

        # Get the RDS instance details
        response = rds_client.describe_db_instances(DBInstanceIdentifier=DATABASE_ID)
        rds_endpoint = response['DBInstances'][0]['Endpoint']['Address']

        # Connect to the RDS PostgreSQL database using psycopg2
        connection = psycopg2.connect(
            host=rds_endpoint,
            user=USER,
            password=PASSWORD,
            database=DBNAME,
            port=PORT
        )

        thread_local.client = rds_client
        thread_local.connection = connection
    # Return the client
    return thread_local.connection


class MailsReceivedUser(APIView):

    def get(self, request, user_mail) -> JsonResponse:
        """
        :param user_mail:
        :param request:
        """
        try:
            response = []
            user = get_object_or_404(UserMail, email=user_mail)
            user_emails = Email.objects.filter(recipient_email=user)
            if not user_emails:
                return JsonResponse({'error': 'No emails found'}, status=404)
            for email in user_emails:
                response.append({
                    'id': email.id,
                    'sender_email': email.sender_email.email,
                    'recipient_email': email.recipient_email.email,
                    'subject': email.subject,
                    'message': email.message,
                    'date': email.date
                })
            return JsonResponse(response, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class MailsSentUser(APIView):

    def get(self, request, user_mail):
        """
        :param request:
        :param user_mail:
        """
        try:
            response = []
            user = get_object_or_404(UserMail, email=user_mail)
            user_emails = Email.objects.filter(sender_email=user)
            if not user_emails:
                return JsonResponse({'error': 'No emails found'}, status=404)
            for email in user_emails:
                response.append({
                    'id': email.id,
                    'sender_email': email.sender_email.email,
                    'recipient_email': email.recipient_email.email,
                    'subject': email.subject,
                    'message': email.message,
                    'date': email.date
                })
            return JsonResponse(response, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class InformationForMail(APIView):

    def get(self, request, mail_id):
        """
        :param request:
        :param mail_id:
        """
        try:
            email_data = Email.objects.filter(id=mail_id).first()
            if email_data:
                response = {
                    'mail_id': email_data.id,
                    'sender_email': email_data.sender_email.email,
                    'recipient_email': email_data.recipient_email.email,
                    'subject': email_data.subject,
                    'message': email_data.message,
                    'date': email_data.date
                }
                return JsonResponse(response, status=200, safe=False)
            else:
                return JsonResponse({'error': 'Email does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class SendMail(APIView):

    def post(self, request):
        """
        :param request:
        :return:
        """
        try:
            sender_email = request.data['sender_email']
            receiver_email = request.data['receiver_email']
            subject = request.data['subject']
            message = request.data['content']

            # Ensure both sender and receiver emails exist
            sender_user = get_object_or_404(UserMail, email=sender_email)
            receiver_user = get_object_or_404(UserMail, email=receiver_email)

            Email.objects.create(
                sender_email=sender_user,
                recipient_email=receiver_user,
                subject=subject,
                message=message
            )
            return JsonResponse({'message': 'Email sent successfully'}, status=201)

        except UserMail.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class CreateUser(APIView):

    def post(self, request) -> JsonResponse:
        """
        :param request:
        """
        try:
            email = request.data['email']
            password = request.data['password']
            user, created = UserMail.objects.get_or_create(email=email, password=make_password(password))
            if created:
                return JsonResponse({'message': 'User created successfully'}, status=201)
            else:
                return JsonResponse({'error': 'User with this email already exists'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class AuthenticationUserGetterEndpoint(APIView):
    def get(self, request, email, password):
        """
        :param request:
        :param email:
        :param password:
        """
        try:
            user = get_object_or_404(UserMail, email=email)
            if check_password(password, user.password):
                return JsonResponse({'message': 'User authenticated successfully'}, status=200)
            else:
                return JsonResponse({'error': 'Incorrect password'}, status=401)
        except Exception as e:
            return JsonResponse({'error': 'Incorrect password or email'}, status=500)
