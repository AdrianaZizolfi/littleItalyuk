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

# Set working directory to the Django project folder (where manage.py lives)
WORKDIR /app/backend

# Copy backend source (manage.py and website package) into /app/backend
COPY backend/ ./

# Ensure the client dist path exists and copy the built frontend into it
RUN mkdir -p /app/backend/client/dist
# COPY --from=frontend-build /app/client/dist /app/backend/client/dist

# Copy the built frontend
COPY --from=frontend-build /app/client/dist /app/backend/client/dist

# Add this line to flatten the static folder:
RUN if [ -d "/app/backend/client/dist/static" ]; then \
      cp -r /app/backend/client/dist/static/* /app/backend/client/dist/ && \
      rm -rf /app/backend/client/dist/static; \
    fi
# Ensure staticfiles output exists and is writable
RUN mkdir -p /app/backend/staticfiles

# Set default env vars (override on Render)
ENV DJANGO_SETTINGS_MODULE=website.settings
ENV PYTHONPATH=/app/backend
ENV PATH="/root/.local/bin:$PATH"
ENV PORT=8000

EXPOSE 8000

# Entrypoint: run migrations then collectstatic then start Gunicorn
# (Optional: move migrate+collectstatic to Render Release Command and make CMD just start Gunicorn)
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn website.wsgi:application --bind 0.0.0.0:$PORT --workers 3"]