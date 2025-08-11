# Stage 1: Build frontend
FROM node:20 as frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 2: Backend
FROM python:3.11-slim as backend
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app
COPY backend/ /app/backend/
COPY --from=frontend /app/client/dist/ /app/backend/static/

# Install Python deps
RUN pip install --upgrade pip && \
    pip install gunicorn whitenoise && \
    pip install -r backend/requirements.txt

# Collect static files
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "website.wsgi:application", "--bind", "0.0.0.0:8000"]
