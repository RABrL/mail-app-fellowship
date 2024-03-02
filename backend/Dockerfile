FROM python:3.9-alpine3.13

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY ./requirements.txt /backend/requirements.txt

RUN apk update && \
    apk add --no-cache postgresql-client postgresql-dev && \
    apk add --no-cache --virtual .build-deps gcc musl-dev && \
    pip install --upgrade pip && \
    pip install -r requirements.txt && \
    apk del .build-deps

COPY . .

EXPOSE 8000

CMD python manage.py runserver 0.0.0.0:8000