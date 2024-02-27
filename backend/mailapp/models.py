from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager


# Create your models here.
class CustomUserManager(BaseUserManager):
    """
    Custom user manager
    """

    def create_user(self, email, password, **extra_fields):
        """

        :param email:
        :param password:
        :param extra_fields:
        :return:
        """
        if not email:
            raise ValueError('The Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """

        :param email:
        :param password:
        :param extra_fields:
        :return:
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class UserMail(AbstractUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = CustomUserManager()

    class Meta:
        """
        db_table
        """
        db_table = "users"
        managed = True

    def __str__(self):
        return {
            "email": self.email,
        }


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
