"""
    Use this file to define serializers for your models.
"""
from rest_framework import serializers
from mailapp.models import Email


class EmailSerializer(serializers.ModelSerializer):
    """
    Serializer for the Email model.
    """
    class Meta:
        """
        Meta class for the EmailSerializer.
        """
        model = Email
        fields = '__all__'
        depth = 1

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'sender_email': instance.sender_email.email,
            'recipient_email': instance.recipient_email.email,
            'subject': instance.subject,
            'message': instance.message,
            'date': instance.date
        }
