from django.urls import path
from .views.views import *

urlpatterns = [
    path('received/<str:user_mail>', MailsListView.as_view(), name='mails_list'),
    path('sent/<str:user_mail>', MailsSentView.as_view(), name='mails_sent'),
    path('information/<str:mail_id>', MailInfoView.as_view(), name='mail_info'),
    path('', SendMailView.as_view(), name='send_mail'),
    path('user/', CreateUserView.as_view(), name='create_user'),
    path('user/authentication/', AuthenticationUserView.as_view(), name='authentication_user'),
    path('create_folder/', CreateFolderView.as_view(), name='create_folder'),
    path('save_mails/', SaveEmailsView.as_view(), name='save_mails_in_folder'),
    path('folder/<str:folder_name>/<str:user_email>', EmailsFolderView.as_view(), name='folder_mails'),
]
