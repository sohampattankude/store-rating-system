#  Store Rating Platform

A full-stack **Store Rating Platform** that allows customers to rate stores, owners to manage their stores, and admins to oversee platform statistics.  

Built with **Node.js, Express, MySQL** for backend and **HTML, CSS, JavaScript** for frontend.

---

## Features

### Customer
- Register & login securely
- View all stores
- Rate stores (1–5 scale)
- See store ratings

### Store Owner
- Register & login as an owner
- Add and manage owned stores
- View customer ratings for their stores

### Admin
- Register & login as admin
- View all users, stores, and ratings
- See platform statistics (counts of users, stores, ratings)

---

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express  
- **Database**: MySQL  
- **Authentication**: JWT (JSON Web Tokens)  
- **Password Security**: bcrypt hashing  
- **API Testing**: Postman  

---

## Project Structure

store-rating-platform/
├── backend/
│ ├── config
|    ├──database.js
│ ├── node modules
| ├── routes
|    ├──admin.js
|    ├──auth.js
|    ├──store.js
|    ├──user.js
| ├──package.json
| ├──package_lock.json
| ├──server.js
├── frontend/
│ ├── public
|    ├──index.html
│ ├── src
|    ├──App.css
|    ├──App.js
|    ├──inex.js
│ ├── package.json
├──daatbase
| ├──schema.sql
| ├──seed.sql
└── README.md



---

## 🗄 Database Schema

sql
CREATE DATABASE store_rating;

USE store_rating;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('user','owner','admin')
);

CREATE TABLE stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  address VARCHAR(255),
  owner_id INT,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  store_id INT,
  user_id INT,
  value INT,
  FOREIGN KEY (store_id) REFERENCES stores(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


