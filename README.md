## Stack

- NextJS@14
- typescript@4.8.4
- @reduxjs/toolkit@1.8.5
- react-redux@8.0.4
- redux-persist@6.0.0

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## GIT

- Создаем новую ветку от main и называем feat-<имя фичи>
- Пушим в свою ветку и по окончании работы создаем Pull request из своей ветки в ветку main
- После code review и approve сливаем изменения в ветку main
- Проверяем, что деплой прошел успешно

## Запросы

Для запросов используется собственный инстанс axios (axiosService)
`./src/utils/axios`

## Стейтменеджмент (Persist Redux)

```js
import { useSelector, useDispatch } from 'store';
```

### Весь сторь будет сохраняться в localStorage, помимо пользовательских данных

### Типизация стора `./src/types`. `DefaultRootStateProps`

## Auth (Authorization via Header)

получаем токены из запроса `/v1/auth/login/`
<br/>  
после получае данные пользователя `/v1/users/self/`

инициализируясь контекст получает токен из localStorage, если таковой есть

при каждом обновлении токена, следом же обновляем его в localStorage и делаем запрос на получение данных пользователя

## ENV example

NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_NAME=

## Packages

Excel

- "xlsx-populate": "^1.21.0",
- "file-saver": "^2.0.5",

Стили

- "@emotion/react": "^11.11.1",
- "@emotion/styled": "^11.11.0",
- "stylis-plugin-rtl": "^2.1.1",

UI-KIT (Стиль + функионал)

- "@mui/icons-material": "^5.15.11",
- "@mui/lab": "^5.0.0-alpha.166",
- "@mui/material": "^5.15.11",
- "@mui/material-nextjs": "^5.15.11",
- "@mui/system": "^5.15.11",
- "@mui/x-date-pickers": "6.11.2"

Иконки

- "@tabler/icons-react": "^2.45.0"
- "@mui/icons-material": "^5.15.11"

Aнимации движения

- "framer-motion": "^7.5.2",

Работа с датами

- "date-fns": "^3.3.1",
- "luxon": "^3.4.4",
- "@types/luxon": "^3.4.2",
- "react-timer-hook": "^3.0.7",

Календарь

- "@fullcalendar/react": "^6.1.10",
- "@types/react-calendar": "^3.5.3",

Стейт менеджеры (глобальное ранение данных)

- "react-redux": "^8.0.4",
- "redux-persist": "^6.0.0",
- "@reduxjs/toolkit": "^1.8.5",

Удобство работы с css классами

- "classnames": "^2.3.2",

Отпака запросов

- "axios": "^1.6.7",

Формы

- "formik": "^2.4.5",
- "yup": "^1.3.3"
- "react-input-mask": "^2.0.4",
- "@types/react-input-mask": "^3.0.5",

Next, react

- "next": "^14.0.4",
- "react": "18.2.0",
- "react-dom": "18.2.0",
- "@types/react": "18.0.21",
- "@types/react-dom": "18.0.6",

- "@types/node": "18.8.2",

Уведомления

- "notistack": "^3.0.1",

Отображение уведомлений

- "react-18-image-lightbox": "^5.1.4",

Интернациональность

- "@types/react-intl": "^3.0.0",
- "react-intl": "^6.4.4",

Кастомный Скролл

- "react-perfect-scrollbar": "^1.5.8",

Карусель

- "react-responsive-carousel": "^3.2.23",
- "react-slick": "^0.30.1",
- "@types/react-slick": "^0.23.10",

Одноразовый пароль

- "react18-input-otp": "^1.1.4",

Работа с кэщем

- "swr": "^2.2.4",
- "@svgr/webpack": "^6.5.1",

Правила для написания и форматирования кода

- "eslint": "8.47.0",
- "eslint-config-next": "^13.4.19",
- "eslint-config-prettier": "^9.0.0",
- "eslint-plugin-prettier": "^5.0.0",
- "prettier": "^3.0.2",
- "@typescript-eslint/eslint-plugin": "^5.59.0",
- "@typescript-eslint/parser": "^5.59.0",

Препроцессор css

- "sass": "^1.57.1",

Тайпскрипт

- "typescript": "4.8.4"
