from django.urls import path
from .views.views import *

urlpatterns = [
    path('mails/get/received/<str:user_mail>/', MailsReceivedUserGetterEndpoint.as_view()),
    path('mails/get/sent/<str:user_mail>/', MailsSentUserGetterEndpoint.as_view()),
    path('mail/get/information/<str:mail_id>', InformationForMailGetterEndpoint.as_view()),
    path('mail/post/mail/', SendMailPostEndpoint.as_view()),
    path('user/post/create/', CreateUserPostEndpoint.as_view()),
    path('user/get/authentication/<str:email>/<str:password>/', AuthenticationUserGetterEndpoint.as_view()),
]