#SMTP SEND EMAIL
import os 
import smtplib
import ssl

from dotenv import load_dotenv
load_dotenv()

def send_email(subject, message, to):
    email = os.getenv('SMTP_USER')
    password = os.getenv('SMTP_PASSWORD')
    smtp = os.getenv('SMTP_SERVER')
    port = os.getenv('SMTP_PORT')

    msg = f'Subject: {subject}\n\n{message}'
    
    context = ssl.create_default_context()
    with smtplib.SMTP(smtp, port) as server:
        server.starttls(context=context)
        server.login(email, password)
        server.sendmail(email, to, msg)