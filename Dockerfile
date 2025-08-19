# Используем официальный образ Bun
FROM oven/bun:1.2.18 as base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install

# Копируем исходный код
COPY . .

# Создаем production образ
FROM base as production

ENV VITE_APP_URL="https://calendar.yz13.ru"

# Собираем приложение
RUN bun run build

# Создаем минимальный runtime образ
FROM base as runtime

WORKDIR /app

# Копируем standalone сборку из production образа
COPY --from=production /app/package.json ./
COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/build ./build

# Открываем порт (Yandex Cloud использует 8080)
EXPOSE 8080

# Устанавливаем переменную окружения
ENV NODE_ENV=production
ENV PORT=8080

# Запускаем приложение
CMD ["bun", "run", "start"]
