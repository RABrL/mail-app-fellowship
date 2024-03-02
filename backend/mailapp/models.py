from django.contrib.auth.hashers import make_password
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager


# Create your models here.
class CustomUserManager(BaseUserManager):
    """
    Custom user manager
    """

    def create_user(self, email, username, first_name, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        :param username:
        :param first_name:
        :param email:
        :param password:
        :param extra_fields:
        :return:
        """
        if not email:
            raise ValueError('The Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, **extra_fields)
        user.password = make_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, first_name, password, **other_fields):
        """
        Create and save a superuser with the given email and password.
        :param username:
        :param first_name:
        :param email:
        :param password:
        :return:
        """
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, first_name, password, **other_fields)


class UserMail(AbstractUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = CustomUserManager()

    class Meta:
        db_table = "users"
        managed = True

    def __str__(self):
        return self.username


class Email(models.Model):
    id = models.AutoField(primary_key=True)
    sender_email = models.ForeignKey(UserMail, on_delete=models.CASCADE, related_name='sender_email')
    recipient_email = models.ForeignKey(UserMail, on_delete=models.CASCADE, related_name='recipient_email')
    subject = models.CharField(max_length=150)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    folder = models.ForeignKey('Folder', on_delete=models.CASCADE, related_name='folder', blank=True, null=True)

    class Meta:
        """
            ordering by createdAt
        """
        ordering = ['-date']
        db_table = "emails"
        managed = True

    def __str__(self):
        return {
            "id": self.id,
            "sender_email": self.sender_email,
            "recipient_email": self.recipient_email,
            "subject": self.subject,
            "message": self.message,
            "date": self.date
        }


class Folder(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    user = models.ForeignKey(UserMail, on_delete=models.CASCADE, related_name='user_folder')

    class Meta:
        db_table = "folders"
        managed = True
