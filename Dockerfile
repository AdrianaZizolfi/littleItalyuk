# ---------- Stage 1: Build frontend (from client/) ----------
FROM node:18-alpine AS frontend-build
WORKDIR /app/client

# Copy package files and install dependencies
COPY client/package*.json client/yarn.lock* ./
RUN npm ci

# Copy frontend source and build
COPY client/ ./
ENV NODE_OPTIONS=--max_old_space_size=512
RUN npm run build   # produces dist/ by default for Vite

# ---------- Stage 2: Build python dependencies ----------
FROM python:3.11-slim AS python-base
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# OS deps for some Python packages (psycopg2 etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc libpq-dev curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend
# Copy only requirements first for better caching
COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# ---------- Stage 3: Final image (copy backend + frontend build) ----------
FROM python-base AS final
WORKDIR /app

# Copy backend source (including manage.py and website package)
COPY backend/ ./backend/

# Copy the built frontend from frontend-build into the exact path Django expects
# BASE_DIR in settings.py = /app/backend, so "client/dist/assets" = /app/backend/client/dist/assets
RUN mkdir -p /app/backend/client/dist
COPY --from=frontend-build /app/client/dist /app/backend/client/dist

# Set default env vars (override on Render)
ENV DJANGO_SETTINGS_MODULE=website.settings
ENV PYTHONPATH=/app
ENV PATH="/root/.local/bin:$PATH"
ENV PORT=8000

EXPOSE 8000

# Entrypoint: run migrations then collectstatic then start Gunicorn
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn website.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
