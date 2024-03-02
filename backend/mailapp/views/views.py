from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from mailapp.models import Email, UserMail, Folder
from django.http import JsonResponse
from django.contrib.auth import login


class MailsListView(APIView):

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


class MailsSentView(APIView):

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


class MailInfoView(APIView):

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


class SendMailView(APIView):

    def post(self, request):
        """
        :param request:
        :return:
        """
        try:
            sender_email = request.data['sender_email']
            receiver_email = request.data['receiver_email']
            if not receiver_email:
                return JsonResponse({'error': 'Sender and receiver emails are required'}, status=400)
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


class CreateUserView(APIView):

    def post(self, request) -> JsonResponse:
        """
        :param request:
        """
        try:
            email = request.data['email']
            password = request.data['password']
            first_name = request.data['email']
            # Validate email format
            try:
                validate_email(email)
            except ValidationError:
                return JsonResponse({'error': 'Invalid email format'}, status=400)

            user = UserMail.objects.filter(email=email).first()
            
            if user:
                return JsonResponse({'error': 'User already exists'}, status=409)
            
            # Create user using create_user method of the manager
            user = UserMail.objects.create_user(email=email, username=email, first_name=first_name, password=password)
            return JsonResponse({'message': 'User created successfully'}, status=201)

        except ValidationError as ve:
            return JsonResponse({'error': str(ve)}, status=400)

        except Exception as e:
            print(e.__context__)
            return JsonResponse({'error': f'Unexpected error: {str(e)}'}, status=500)


class AuthenticationUserView(APIView):
    def post(self, request):
        """
        :param request:
        :param email:
        :param password:
        """
        try:
            email = request.data['email']
            password = request.data['password']
            user = get_object_or_404(UserMail, email=email)
            if check_password(password, user.password):
                login(request, user)
                res = {'message': 'User authenticated successfully', 'user': user.email}
                return JsonResponse(res, status=200)
            else:
                return JsonResponse({'error': 'Incorrect password or email'}, status=400)
        except UserMail.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': 'Incorrect password or email'}, status=500)


class CreateFolderView(APIView):

    def post(self, request):
        """
        :param request:
        """
        try:
            folder_name = request.data['folder_name'].strip().lower()
            user_email = request.data['user_email']
            user = get_object_or_404(UserMail, email=user_email)
            if Folder.objects.filter(name=folder_name, user=user).exists():
                return JsonResponse({'error': 'Folder with this name already exists'}, status=400)
            Folder.objects.create(name=folder_name, user=user)
            return JsonResponse({'message': 'Folder created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class SaveEmailsView(APIView):

    def post(self, request):
        """
            :param request:
            """
        try:
            emails = request.data['emails']
            user_email = request.data['user_email']
            folder_name = request.data['folder_name']
            user = get_object_or_404(UserMail, email=user_email)
            folder_obj = Folder.objects.filter(name=folder_name, user=user).first()
            if not folder_obj:
                return JsonResponse({'error': 'Folder with this name does not exist'}, status=404)
            for email in emails:
                email_obj = get_object_or_404(Email, id=email['id'])
                if not email_obj.folder:
                    email_obj.folder = folder_obj
                    email_obj.save()
            return JsonResponse({'message': 'Emails saved in folder successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


class EmailsFolderView(APIView):

    def get(self, request, folder_name, user_email):
        """
        :param user_email:
        :param request:
        :param folder_name:
        """
        try:
            user = get_object_or_404(UserMail, email=user_email)
            folder_obj = Folder.objects.filter(name=folder_name, user=user).first()
            if not folder_obj:
                return JsonResponse({'error': 'Folder with this name does not exist'}, status=404)
            emails = Email.objects.filter(folder=folder_obj)
            response = []
            for email in emails:
                response.append({
                    'id': email.id,
                    'sender_email': email.sender_email.email,
                    'recipient_email': email.recipient_email.email,
                    'subject': email.subject,
                    'message': email.message,
                    'date': email.date,
                    'folder': email.folder.name
                })
            return JsonResponse(response, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
