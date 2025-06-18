# Bootcamps API | Node.js, Express.js

This is a RESTful API built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**.  
The project is currently **under development** and is meant to serve as a backend for a bootcamp directory platform.

## 🚀 Technologies Used

- Node.js
- Express.js
- MongoDB Atlas / local MongoDB
- Mongoose ODM

## 📌 Available Endpoints

### Bootcamps

| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | `/api/v1/bootcamps`         | Get all bootcamps       |
| GET    | `/api/v1/bootcamps/:id`     | Get single bootcamp     |
| POST   | `/api/v1/bootcamps`         | Create a new bootcamp   |
| PUT    | `/api/v1/bootcamps/:id`     | Update bootcamp         |
| DELETE | `/api/v1/bootcamps/:id`     | Delete bootcamp         |

## 📂 Project Structure

├── controllers/ # Route logic (CRUD functions)
├── models/ # Mongoose schemas
├── routes/ # Express route definitions
├── config/ # DB config, env variables
├── server.js # App entry point

## 🔧 Coming Soon

Auth (register/login with JWT)

Role-based access (admin/publisher/user)

Upload bootcamp photos

Advanced filtering, pagination, geolocation

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yazylek/Bootcamps-API-Node.js-Express.js.git
```
```bash
cd Bootcamps-API-node.js-Express.js
```
```bash
npm install
```
Create a .env file in the root directory and add the following:

```bash
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```
```bash
npm run dev
```
