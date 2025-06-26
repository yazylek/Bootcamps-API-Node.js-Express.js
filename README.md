# 📚 Bootcamp API

This API allows users to register, manage bootcamps, create courses, and handle authentication processes like login and password reset.

## DOC
https://documenter.getpostman.com/view/38402479/2sB2xEC99a

## 🚀 Base URL

[https://bootcamps-api-use1.onrender.com/api/v1](https://bootcamps-api-use1.onrender.com/api/v1)

---

## 🧩 Features

- ✅ User registration & login
    
- 🔐 JWT-based authentication with cookies
    
- 🔁 Forgot & reset password flows
    
- 🏕️ Manage bootcamps and courses (CRUD)
    
- 🔍 Advanced filtering, sorting, and pagination
    
- ⚙️ Middleware protection and role-based access
    
- 🧼 Security: rate limiting, sanitization, XSS protection
    

---

## 🔑 Authentication

Most endpoints require an **Authorization token**.  
After login or registration, a **JWT token** is sent in a cookie and can also be passed as a Bearer token:  
Authorization: Bearer

---

## 📂 Available Collections

### 🧑 Auth

- `POST /auth/register` – Register new user
    
- `POST /auth/login` – Login
    
- `GET /auth/user` – Get current user (auth required)
    
- `POST /auth/forgotpassword` – Send password reset email
    
- `PUT /auth/resetpassword/:resettoken` – Reset password
    
- `POST /auth/logout` – Logout user
    

### 🏕️ Bootcamps

- `GET /bootcamps` – Get all bootcamps
    
- `POST /bootcamps` – Create new bootcamp (auth required)
    
- `GET /bootcamps/:id` – Get single bootcamp
    
- `GET /bootcamps/:zipcode/:distance` – Get bootcamps within a radius
    
- `PUT /bootcamps/:id` – Update bootcamp (auth + ownership)
    
- `DELETE /bootcamps/:id` – Delete bootcamp (auth + ownership)
    

### 🎓 Courses

- `GET /courses` – Get all courses
    
- `GET /bootcamps/:bootcampId/courses` – Get courses for a bootcamp
    
- `GET /courses/:id`– Get courses by ID
    
- `POST /bootcamps/:bootcampId/courses` – Add course (auth required)
    
- `PUT /courses/:id` – Update course
    
- `DELETE /courses/:id` – Delete course
    

---

## ⚠️ Notes

- Ensure MongoDB is running locally or in the cloud (e.g. MongoDB Atlas).
    
- Protect your `.env` file in public repositories.
    
- Some routes are protected and require a valid token and user role (`user` or `publisher`).
    

---

## 📦 Technologies Used

- Node.js
    
- Express.js
    
- MongoDB (Atlas)
    
- Mongoose
    
- JWT (JSON Web Token)
    
- Cookie Parser
    
- Multer (for file uploads)
    
- Nodemailer (email functionality)
    
- dotenv (env config)
    
- Helmet, xss-clean, express-mongo-sanitize (security)
    

---

## Swagger

To run swagger, type:
```
node swagger.js
```
run localhost:5000/api-docs

![image](https://github.com/user-attachments/assets/a60ac8b7-69fe-4039-a120-47edd905102b)


