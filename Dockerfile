FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system packages for Pillow & build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    curl \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

COPY ./backend/requirements.txt /app/backend/requirements.txt

RUN pip install --upgrade pip
RUN pip install -r /app/backend/requirements.txt
RUN pip install gunicorn
