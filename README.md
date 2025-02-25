# 🏋️ Онлайн-магазин GYMSHARK

## 📌 Опис проєкту

**GYMSHARK** — це онлайн-магазин спортивного одягу та аксесуарів. Проєкт включає фронтенд на **React** та бекенд на **Node.js** з використанням **Express** і **PostgreSQL**. На даний момент користувачі можуть переглядати доступні товари, а адміністратори мають можливість додавати бренди, типи і товари.

---

## 🚀 Інструкції з встановлення та запуску

### ✅ Передумови

Для запуску проєкту необхідно встановити:
- **Node.js** (v14 або вище)
- **PostgreSQL**
- **Git**

### 🛠️ Кроки для встановлення

1. **Клонуйте репозиторій:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Встановіть залежності:**
   ```bash
   cd backend
   npm install
   ```
   ```bash
   cd ../frontend
   npm install
   ```
3. **Налаштуйте базу даних:**
   - Створіть базу даних у PostgreSQL.
   - Створіть `.env` файл у папці `backend` і налаштуйте з’єднання:
     ```env
     DB_NAME=your_db_name
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_HOST=localhost
     DB_PORT=5432
     ```
4. **Запустіть бекенд:**
   ```bash
   cd ../backend
   node index.js
   ```
5. **Запустіть фронтенд:**
   ```bash
   cd ../frontend
   npm start
   ```
6. **Відкрийте браузер та перейдіть за адресою:**
   ```
   http://localhost:3000
   ```

---

## 📂 Структура проєкту

```
📦 your-repo-name
 ├── backend/        # Бекенд (Node.js, Express, PostgreSQL)
 │   ├── controllers/ # Логіка обробки запитів
 │   ├── models/      # Моделі бази даних
 │   ├── routes/      # Маршрути API
 │   ├── middleware/  # Проміжне ПЗ
 │   ├── .env         # Конфігураційний файл
 │   ├── index.js     # Вхідний файл сервера
 ├── frontend/       # Фронтенд (React)
 │   ├── components/  # Компоненти React
 │   ├── pages/       # Сторінки додатку
 │   ├── store/       # Управління станом (MobX)
 │   ├── http/        # HTTP-запити до API
 │   ├── App.js       # Головний файл додатку
 │   ├── .env         # Конфігураційний файл
```

---

## 🛠️ Використані технології

### 🎨 Frontend:
- ⚛️ **React**
- 🎨 **React Bootstrap**
- 🔄 **MobX**
- 🌍 **Axios**

### ⚙️ Backend:
- 🟢 **Node.js**
- 🚀 **Express**
- 🗄️ **Sequelize**
- 🛢️ **PostgreSQL**

### 🔧 Інші інструменти:
- 🌱 **Git**
- 📦 **npm**
- 🔑 **dotenv**

---

## 👨‍💻 Авторство

Проєкт розроблений **Мінайленком Віктором Юрійовичем**.

## 📜 Ліцензія

Цей проєкт ліцензований за ліцензією **MIT**. Детальніше у файлі [LICENSE](LICENSE).

## 📖 Посилання на документацію

- 📄 **Swagger API Documentation**:
- 📘 **Storybook**:
- 🔒 **Privacy Policy**:

