<<<<<<< HEAD
# Каталог недвижимости

React приложение для просмотра каталога недвижимости с интеграцией с backend API.

## Backend Integration

Приложение интегрировано с backend API по адресу `http://217.114.3.46:8000/api`.

### API Endpoints

- `GET /api/catalog/room-types` - получение списка номеров/квартир

### Параметры запроса

- `price_from` - минимальная цена
- `price_to` - максимальная цена  
- `size_from` - минимальная площадь
- `size_to` - максимальная площадь
- `category` - категория (например, "Номер")
- `adult_bed` - количество спальных мест
- `sort_by` - сортировка (например, "size")

### Пример запроса

```bash
curl -X 'GET' \
  'http://217.114.3.46:8000/api/catalog/room-types?price_from=1000&price_to=3000&size_from=30&size_to=50&category=%D0%9D%D0%BE%D0%BC%D0%B5%D1%80&adult_bed=3&sort_by=size' \
  -H 'accept: application/json'
```

## Структура проекта

- `src/services/api.js` - API сервис для работы с backend
- `src/context/CatalogContext.jsx` - контекст для управления состоянием каталога
- `src/screens/CatalogSections/` - компоненты каталога
  - `PropertyListSection.jsx` - список объектов недвижимости
  - `CatalogHeaderSection.jsx` - фильтры

## Запуск

```bash
npm install
npm run dev
```

## Функциональность

- Загрузка данных с backend API
- Фильтрация по цене и количеству спальных мест
- Отображение аменities с иконками
- Обработка ошибок и состояний загрузки
- Fallback на mock данные в режиме разработки при ошибках API
=======
# Site-
>>>>>>> 0891a0c5c665fba8cde65351a59c049ab03e2d69
