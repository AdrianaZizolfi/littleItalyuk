# Stage 1: Build frontend con Vite
FROM node:18-alpine as build-frontend

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build

# Stage 2: Backend Django + frontend static files
FROM python:3.11-slim

# Install dependencies di sistema
RUN apt-get update && apt-get install -y build-essential

WORKDIR /app

# Copia requirements e installa dipendenze Python
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il backend
COPY backend/ .

# Copia la build frontend (dist)
COPY --from=build-frontend /app/client/dist ./client/dist

# Raccogli i file statici Django
RUN python manage.py collectstatic --noinput

# Espone la porta di Gunicorn
EXPOSE 8000

# Avvia Gunicorn con il wsgi in website/wsgi.py
CMD ["gunicorn", "website.wsgi:application", "--bind", "0.0.0.0:8000"]
