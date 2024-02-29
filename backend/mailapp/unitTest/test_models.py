from mailapp.models import Email, UserMail, Folder
from django.test import TestCase


class UserMailTestCase(TestCase):

    def test_create_user_model(self):
        UserMail.objects.create(email="juan1010.jerm@gmail.com", password="somePassword")
        self.assertEqual(UserMail.objects.first().email, 'juan1010.jerm@gmail.com')

    def test_create_unique_user(self):
        """
        Test that the user email is unique
        """
        try:
            UserMail.objects.create(email="juan1010.jerm@gmail.com", password="somePassword")
        except Exception as e:
            self.assertEqual(str(e), 'UNIQUE constraint failed: mailapp_usermail.email')


class EmailTestCase(TestCase):
    def setUp(self):
        """
        Create two users
        """
        self.first_user = UserMail.objects.create(email="juan1010.jerm@gmail.com", password="somePassword")
        self.second_user = UserMail.objects.create(email="camiloPaez@gmail.com", password="otherPassword")

    def test_create_email(self):
        Email.objects.create(sender_email=self.first_user, recipient_email=self.second_user, subject="COMUNICADO",
                             message="Hola reciba un cordial saludo del sacerdote de la iglesia ******")
        self.assertEqual(Email.objects.first().sender_email.email, "juan1010.jerm@gmail.com")
        self.assertEqual(Email.objects.count(), 1)

    def test_create_email_without_recipient(self):
        try:
            Email.objects.create(sender_email=self.first_user, subject="COMUNICADO",
                                 message="Hola reciba un cordial saludo del sacerdote de la iglesia ******")
            self.assertEqual(Email.objects.count(), 0)
        except Exception as e:
            pass

    def test_foreign_key_recipient(self):
        """
        Test that the sender_email is a foreign key
        """
        Email.objects.create(sender_email=self.first_user, recipient_email=self.second_user, subject="COMUNICADO",
                             message="Hola reciba un cordial saludo del sacerdote de la iglesia ******")
        email = Email.objects.filter(recipient_email=self.second_user)
        self.assertEqual(email.count(), 1)


class FolderTestCase(TestCase):
    def setUp(self):
        """
        Create two users
        """
        self.first_user = UserMail.objects.create(email="juan1010.jerm@gmail.com", password="somePassword")
        self.second_user = UserMail.objects.create(email="camiloPaez@gmail.com", password="otherPassword")
        Email.objects.create(sender_email=self.first_user, recipient_email=self.second_user, subject="COMUNICADO",
                             message="Hola reciba un cordial saludo del sacerdote de la iglesia ******")

    def test_create_folder(self):
        Folder.objects.create(name="inbox", user=self.first_user)
        self.assertEqual(Folder.objects.first().name, "inbox")
        self.assertEqual(Folder.objects.count(), 1)
