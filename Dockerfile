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

# Copy backend source (manage.py and project package expected under /app)
COPY backend/ ./

# Ensure expected client dist folders exist
RUN mkdir -p /app/client/dist
RUN mkdir -p /app/client/dist/assets

# Copy the built frontend from frontend-build stage into the exact path expected by settings.py
COPY --from=frontend-build /app/client/dist /app/client/dist

# Also copy a convenient fallback location
RUN mkdir -p /app/frontend_dist
COPY --from=frontend-build /app/client/dist /app/frontend_dist

# Set default env vars (override on Render)
ENV DJANGO_SETTINGS_MODULE=website.settings
ENV PYTHONPATH=/app
ENV PATH="/root/.local/bin:$PATH"
ENV PORT=8000

EXPOSE 8000

# IMPORTANT: do NOT run collectstatic during image build.
# Run migrations & collectstatic at runtime (CMD) or better: use Render "Release Command".
# Entrypoint: run migrations then collectstatic then start Gunicorn
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn website.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
