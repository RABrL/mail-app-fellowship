from django.urls import path
from .views.views import *

urlpatterns = [
    path('received/<str:user_mail>/', MailsReceivedUser.as_view(), name='mails_received'),
    path('sent/<str:user_mail>', MailsSentUser.as_view(), name='mails_sent'),
    path('information/<str:mail_id>', InformationForMail.as_view(), name='mail_information'),
    path('', SendMail.as_view(), name='send_mail'),
    path('user/', CreateUser.as_view(), name='create_user'),
    path('user/authentication/<str:email>/<str:password>', AuthenticationUserGetterEndpoint.as_view(), name='authentication_user'),
    path('create_folder/', CreateFolder.as_view(), name='create_folder'),
    path('save_mails/', SaveEmailsInFolder.as_view(), name='save_mails_in_folder'),
    path('folder/<str:folder_name>/<str:user_email>', GetEmailsFolder.as_view(), name='get_emails_folder'),
]
