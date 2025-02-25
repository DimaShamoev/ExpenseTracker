<img src='./client/src/assets/banner_img.jpg' width='100%' height='400'>

# Expense Tracker
Expense Tracker is a full-stack web application built using React TypeScript for the frontend and NestJS with TypeScript for the backend, designed to manage expenses and income transactions with user authentication and category management.

## Technologies Used
- **Frontend**
    - React TypeScript
    - Tailwind CSS
    - Redux
    - Axios
- **Backend**
    - NestJS
    - JWT authentication
    - Postgres
- **Database**
    - PostgreSQL

## Getting Started
```bash
$ git clone https://github.com/DimaShamoev/ExpenseTracker.git
```
### Setup Backend
```bash
$ cd server
$ npm i
$ npm run start:dev
```
### Setup .env File
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=expense_tracker_db
```

### Setup Frontend
```bash
$ cd client
$ npm i
$ npm run dev
```