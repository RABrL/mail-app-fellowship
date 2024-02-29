from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from mailapp.models import UserMail, Email, Folder


# Create your tests here.
class UserMailTestCase(APITestCase):

    def test_create_user(self):
        url = reverse('create_user')
        data = {
            "email": "juan1010.jerm@gmail.com",
            "password": "somePassword"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserMail.objects.count(), 1)

        data = {
            "email": "camilo2020@gmail.com",
            "password": "somePassword1"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserMail.objects.count(), 2)


class EmailTestCase(APITestCase):
    def setUp(self):
        """
        Create two users
        """
        self.first_user = UserMail.objects.create(email="juan1010.jerm@gmail.com", password="somePassword")
        self.second_user = UserMail.objects.create(email="camilo2020@gmail.com", password="somePassword1")

    def test_send_email(self):
        url = reverse('send_mail')
        data = {
            "sender_email": "juan1010.jerm@gmail.com",
            "receiver_email": "camilo2020@gmail.com",
            "subject": "COMUNICADO",
            "content": "Hola reciba un cordial saludo del sacerdote de la "
                       "iglesia ******"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Email.objects.count(), 1)
        self.assertEqual(Email.objects.get().sender_email.email, "juan1010.jerm@gmail.com")


class EmailReceiveTestCase(APITestCase):
    def setUp(self):
        """
        Create two users and an email
        """
        self.first_user = UserMail.objects.create(email="juan1010.jerm@gmail.com", password="somePassword")
        self.second_user = UserMail.objects.create(email="camilo2020@gmail.com", password="somePassword1")
        self.email = Email.objects.create(sender_email=self.first_user, recipient_email=self.second_user,
                                          subject="COMUNICADO",
                                          message="Hola reciba un cordial saludo "
                                                  "del sacerdote de la iglesia ******")

    def test_receive_email(self):
        url = reverse('mails_list', args=['camilo2020@gmail.com'])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Email.objects.count(), 1)
        data = response.json()
        self.assertEqual(data[0]['recipient_email'], "camilo2020@gmail.com")

    def test_email_info(self):
        url = reverse('mail_info', args=[self.email.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['sender_email'], self.first_user.email)


class UserAuthenticationTestCase(APITestCase):
    def setUp(self):
        """
        Create a user
        """
        url = reverse('create_user')
        data = {
            "email": "julian2003@gmail.com",
            "password": "somePassword"
        }
        response = self.client.post(url, data, format='json')

    def test_authentication_user(self):
        data = {
            "email": "julian2003@gmail.com",
            "password": "somePassword"
        }
        url = reverse('authentication_user')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['message'], 'User authenticated successfully')
