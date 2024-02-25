from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Email(models.Model):
    id = models.AutoField(primary_key=True)
    sender_email = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_email')
    recipient_email = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipient_email')
    subject = models.CharField(max_length=150)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
            ordering by createdAt
        """
        ordering = ['-date']
        db_table = "emails"
        managed = True
