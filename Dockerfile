# Stage 1: Build React frontend
FROM node:18-alpine as build-frontend

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ .
RUN npm run build

# Stage 2: Setup backend + serve React build
FROM python:3.11-slim

WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y build-essential

# Copy backend requirements & install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy React build from previous stage
COPY --from=build-frontend /app/client/build ./client/build

# Collect static files (serve React build as static files)
RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Start Gunicorn, backend serve API & React build come static files
CMD ["gunicorn", "website.wsgi:application", "--bind", "0.0.0.0:8000"]
