from django.urls import path
from .views.views import *

urlpatterns = [
    path('received/<str:user_mail>/', MailsReceivedUserGetterEndpoint.as_view()),
    path('sent/<str:user_mail>/', MailsSentUserGetterEndpoint.as_view()),
    path('information/<str:mail_id>', InformationForMailGetterEndpoint.as_view()),
    path('/', SendMailPostEndpoint.as_view()),
]