#!/bin/bash

# deploy.sh - Скрипт для деплоя Financial News Aggregator
# Предполагается, что скрипт запускается в корне проекта (financial-news-aggregator)
# Требования: Node.js, npm, PM2 (установите через npm install -g pm2)

echo "Starting deployment of Financial News Aggregator..."

# Функция для проверки ошибок
check_error() {
  if [ $? -ne 0 ]; then
    echo "Error: $1"
    exit 1
  fi
}

# 1. Установка зависимостей и сборка frontend
echo "Building frontend..."
cd frontend
npm install
check_error "Failed to install frontend dependencies"

npm run build
check_error "Failed to build frontend"

echo "Frontend built successfully."

# 2. Установка зависимостей backend
echo "Setting up backend..."
cd ../backend
npm install
check_error "Failed to install backend dependencies"

# 3. Создание .env файла, если не существует (скопируйте из примера)
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example..."
  cp .env.example .env 2>/dev/null || echo "Warning: .env.example not found. Please create .env manually."
fi

# 4. Запуск backend с PM2 (для продакшена)
echo "Starting backend with PM2..."
pm2 stop financial-news-backend 2>/dev/null || true  # Остановить, если запущен
pm2 delete financial-news-backend 2>/dev/null || true  # Удалить, если существует

pm2 start src/server.js --name financial-news-backend
check_error "Failed to start backend with PM2"

echo "Backend started successfully."

# 5. Опционально: Скопировать build frontend в backend/public (если backend обслуживает статические файлы)
# Раскомментируйте, если backend настроен на статические файлы
# echo "Copying frontend build to backend..."
# cp -r ../frontend/build public/ 2>/dev/null || mkdir -p public && cp -r ../frontend/build/* public/

# 6. Проверка здоровья API
echo "Checking API health..."
sleep 5  # Ждем запуска
curl -f http://localhost:5000/api/health || echo "Warning: API health check failed. Check logs with 'pm2 logs financial-news-backend'"

echo "Deployment completed successfully!"
echo "Frontend: Serve build folder (e.g., via nginx) or integrate with backend."
echo "Backend: Running on http://localhost:5000"
echo "To view logs: pm2 logs financial-news-backend"
echo "To restart: pm2 restart financial-news-backend"