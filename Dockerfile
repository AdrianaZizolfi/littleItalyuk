# ---------- Stage 1: Build frontend ----------
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json frontend/yarn.lock* ./
# prefer npm or yarn depending on your frontend; adapt commands accordingly
RUN npm ci
COPY frontend/ .
RUN npm run build   # produces dist/ by default for Vite

# ---------- Stage 2: Build python dependencies ----------
FROM python:3.11-slim AS python-base
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# OS deps for common packages (add libpq-dev if you compile psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc libpq-dev curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# ---------- Stage 3: Copy source + frontend build, collectstatic ----------
FROM python-base AS final
WORKDIR /app

# Copy backend source
COPY backend/ ./

# Copy built frontend into Django static files (assumes STATIC_ROOT collects from 'static/')
# Adjust dest path if you want e.g. project/static_src/frontend_dist
RUN mkdir -p /app/frontend_dist
COPY --from=frontend-build /app/frontend/dist /app/frontend_dist

# Create static root and copy dist into static/ or into STATIC_ROOT source directory
# This example assumes Django will collect from /app/static_src
RUN mkdir -p /app/static_src/frontend
RUN cp -r /app/frontend_dist/* /app/static_src/frontend/

# Set env vars defaults (override on Render)
ENV DJANGO_SETTINGS_MODULE=projectname.settings
ENV PYTHONPATH=/app
ENV PATH="/root/.local/bin:$PATH"

# Collect static (ensure settings handle STATIC_ROOT and staticfiles dirs)
RUN python manage.py collectstatic --noinput || true

# Expose port
EXPOSE 8000

# Entrypoint: run migrations then start gunicorn
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn projectname.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
