# =========================
# Stage 1 – Build React app
# =========================
FROM node:20 AS frontend
WORKDIR /app
COPY client/package*.json ./client/
COPY client/ ./client/
WORKDIR /app/client
RUN npm install
RUN npm run build

# =========================
# Stage 2 – Build Python deps
# =========================
FROM python:3.11-slim AS backend
WORKDIR /app

# Install system dependencies for Django & Pillow
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt \
    gunicorn

# =========================
# Stage 3 – Final container with Nginx + app
# =========================
FROM python:3.11-slim

# Install Nginx and dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend
COPY --from=backend /usr/local /usr/local
COPY backend/ /app/backend/

# Copy React build into Django static dir
COPY --from=frontend /app/client/dist /app/backend/static/

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Collect static files
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 80

# Start Nginx and Gunicorn together
CMD service nginx start && gunicorn website.wsgi:application --bind 0.0.0.0:8000 --workers 3
