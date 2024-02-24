from rest_framework.views import APIView
from dotenv import load_dotenv
from django.http import JsonResponse
import boto3
import psycopg2
import os
import threading
import random
import string
import hashlib
thread_local = threading.local()

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

ENDPOINT = "mailapp-database-instance.c1woi26qsnpj.us-east-1.rds.amazonaws.com"
DATABASE_ID = "mailapp-database-instance"
PORT = 5432
USER = "postgres"
ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY_ID")
SECRET_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
PASSWORD = os.environ.get("AWS_DATABASE_PASSWORD")
REGION = "us-east-1"
DBNAME = "mail_db"

@staticmethod
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

class MailsReceivedUserGetterEndpoint(APIView):
    def get(self, request, user_mail):
        '''
        Handle GET requests to get all the mails received by a user

        :param request: The request object
        :param user_mail: The email of the user

        :return: A JSON response
            - If successful:
                a JSON object with the mail IDs as keys and the mail details as values
                with HTTP status code 200 (OK).
            - If unsuccessful:
                a JSON object with an error message
                with HTTP status code 500 (Internal Server Error).
        '''
        response = {}
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                get_tables_query = f'''
                    SELECT mail_id, sender_email, subject, sent_date FROM mail WHERE receiver_email =  '{user_mail}';
                '''
                cursor.execute(get_tables_query)

                # Fetch the results
                response = {}
                for row in cursor.fetchall():
                    mail_id, sender_email, subject, sent_date = row
                    response[str(mail_id)] = {
                        'sender_email': sender_email,
                        'subject': subject,
                        'sent_date': sent_date.strftime('%Y-%m-%d %H:%M:%S') if sent_date else None
                    }

        except Exception as e:
            # Handle exceptions appropriately
            response = {'error': str(e)}
            return JsonResponse(response, status=500)

        finally:
            # Close the database connection when done
            connection.close()

        # Return the JSON response
        return JsonResponse(response, status=200)
    
class MailsSentUserGetterEndpoint(APIView):
    def get(self, request, user_mail):
        '''
        Handle GET requests to get all the mails sent by a user

        :param request: The request object
        :param user_mail: The email of the user

        :return: A JSON response
            - If successful:
                a JSON object with the mail IDs as keys and the mail details as values
                with HTTP status code 200 (OK).
            - If unsuccessful:
                a JSON object with an error message
                with HTTP status code 500 (Internal Server Error).
        '''
        response = {}
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                get_tables_query = f'''
                    SELECT mail_id, receiver_email, subject, sent_date FROM mail WHERE sender_email =  '{user_mail}';
                '''
                cursor.execute(get_tables_query)

                # Fetch the results
                response = {}
                for row in cursor.fetchall():
                    mail_id, receiver_email, subject, sent_date = row
                    response[str(mail_id)] = {
                        'receiver_email': receiver_email,
                        'subject': subject,
                        'sent_date': sent_date.strftime('%Y-%m-%d %H:%M:%S') if sent_date else None
                    }

        except Exception as e:
            # Handle exceptions appropriately
            response = {'error': str(e)}
            return JsonResponse(response, status=500)

        finally:
            # Close the database connection when done
            connection.close()

        # Return the JSON response
        return JsonResponse(response, status=200)
    
class InformationForMailGetterEndpoint(APIView):
    def get(self, request, mail_id):
        '''
        Handle GET requests to get the information for a mail

        :param request: The request object
        :param mail_id: The ID of the mail

        :return: A JSON response
            - If successful:
                a JSON object with the mail details
                with HTTP status code 200 (OK).
            - If unsuccessful:
                a JSON object with an error message
                with HTTP status code 500 (Internal Server Error).
        '''
        response = {}
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                get_tables_query = f'''
                    SELECT * FROM mail WHERE mail_id = '{mail_id}';
                '''
                cursor.execute(get_tables_query)

                # Fetch the results
                for row in cursor.fetchall():
                    mail_id, sender_email, receiver_email, subject, content, folder_id, sent_date  = row
                    response = {
                        'mail_id': mail_id,
                        'sender_email': sender_email,
                        'receiver_email': receiver_email,
                        'subject': subject,
                        'content': content,
                        'folder_id': folder_id,
                        'sent_date': sent_date.strftime('%Y-%m-%d %H:%M:%S') if sent_date else None,
                    }


        except Exception as e:
            # Handle exceptions appropriately
            response = {'error': str(e)}
            return JsonResponse(response, status=500)

        finally:
            # Close the database connection when done
            connection.close()

        # Return the JSON response
        return JsonResponse(response, status=200)
    
class SendMailPostEndpoint(APIView):
    def post(self, request):
        '''
        Handle POST requests to send a mail

        :param request: The request object

        :return: A JSON response
            - If successful:
                a JSON object with a success message
                with HTTP status code 200 (OK).
            - If unsuccessful:
                a JSON object with an error message
                with HTTP status code 500 (Internal Server Error).
        '''
        response = {}
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                sender_email = request.POST.get('sender_email')
                receiver_email = request.POST.get('receiver_email')
                subject = request.POST.get('subject')
                content = request.POST.get('content')

                insert_query = f'''
                    INSERT INTO mail (sender_email, receiver_email, subject, content)
                    VALUES ('{sender_email}', '{receiver_email}', '{subject}', '{content}');
                '''
                cursor.execute(insert_query)

                connection.commit()

                # response
                response = {'message': 'Mail sent successfully'}

        except Exception as e:
            # Handle exceptions appropriately
            response = {'error': str(e)}
            return JsonResponse(response, status=500)

        finally:
            # Close the database connection when done
            connection.close()

        # Return the JSON response
        return JsonResponse(response, status=200)
    
class CreateUserPostEndpoint(APIView):
    def post(self, request):
        '''
        Handle POST requests to create a user

        :param request: The request object

        :return: A JSON response
            - If successful:
                a JSON object with a success message
                with HTTP status code 200 (OK).
            - If unsuccessful:
                - If the user already exists:
                    a JSON object with an error message
                    with HTTP status code 400 (Bad Request).
                - If there is an error:
                    a JSON object with an error message
                    with HTTP status code 500 (Internal Server Error).
        '''
        response = {}
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                # Get the email and password from the request
                email = request.POST.get('email')
                password = request.POST.get('password')
                # Check if the user already exists
                check_query = f"SELECT COUNT(*) FROM user_account WHERE email = '{email}'"
                cursor.execute(check_query)
                result = cursor.fetchone()
                if result[0] > 0:
                    # If the user already exists, return an error
                    return JsonResponse({'error': 'User with this email already exists'}, status=400)
                # Generate a random 10 characters salt
                salt = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
                # Concatenate salt with password
                salted_password = salt + password
                # Hash the salted password
                hashed_password = hashlib.sha256(salted_password.encode()).hexdigest()
                # Truncate hashed password to max 50 characters
                hashed_password = hashed_password[:50]
                # Insert the user into the database
                insert_query = f'''
                    INSERT INTO user_account (email, password, password_salt)
                    VALUES ('{email}', '{hashed_password}', '{salt}');
                '''
                cursor.execute(insert_query)

                connection.commit()

                # response
                response = {'message': 'User created successfully'}

        except Exception as e:
            # Handle exceptions appropriately
            response = {'error': str(e)}
            return JsonResponse(response, status=500)

        finally:
            # Close the database connection when done
            connection.close()

        # Return the JSON response
        return JsonResponse(response, status=200)