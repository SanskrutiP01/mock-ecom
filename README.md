# 🛍️ Vibe Commerce — Mock E-Commerce Cart App

A simple **full-stack shopping cart application** built for the Vibe Commerce coding assignment.  
It demonstrates core e-commerce features like adding/removing products, viewing cart items, and mock checkout — using **React**, **Node.js (Express)**, and **MongoDB**.

---

## 🚀 Project Overview

This project simulates a basic shopping cart flow with mock products.  
Users can:
- View a list of products
- Add or remove products from the cart
- Checkout with name and email validation
- Get an instant receipt confirmation (mock order)

---

## 🏗️ Tech Stack

**Frontend:** React 
**Backend:** Node.js, Express.js  
**Database:** Mongo DB  
**Version Control:** Git & GitHub

---

## 📁 Folder Structure

mock-ecom/
│
├── backend/ # Express server + APIs
│ ├── server.js
│ ├── package.json
│
├── frontend/ # React application
│ ├── src/
│ │ ├── App.js
│ │ ├── App.css
│ │ └── index.js
│ ├── package.json
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SanskrutiP01/mock-ecom.git
cd mock-ecom
2️⃣ Setup Backend
cd backend
npm install
node server.js
Server runs on:
👉 http://localhost:5000

3️⃣ Setup Frontend
Open another terminal:
cd frontend
npm install
npm start
App runs on:
👉 http://localhost:3000

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch all products
GET	/api/cart	Fetch cart items
POST	/api/cart	Add item to cart
DELETE	/api/cart/:id	Remove item from cart
POST	/api/checkout	Mock checkout and generate receipt

💻 Features
🧾 View product list (name, description, price)

🛒 Add or remove products from cart

💸 Auto-calculated total price

🧍 Checkout form with validation (name + email)

📄 Order receipt popup with total and timestamp

🧠 Key Learnings
Building RESTful APIs with Express.js

Using React Hooks for UI interactivity

Handling form validation and state updates

Connecting frontend and backend smoothly

📸 Screenshots
<img width="1360" height="582" alt="image" src="https://github.com/user-attachments/assets/b7de598c-6ec8-4ea8-a87d-d1c34b5f731d" />
<img width="1360" height="725" alt="image" src="https://github.com/user-attachments/assets/d8dec771-7473-4d8d-aa28-409346274965" />
<img width="1360" height="728" alt="image" src="https://github.com/user-attachments/assets/0ad9639c-3a05-44cf-aa5f-b9763606075a" />

👩‍💻 Author
Sanskruti Pawaskar
📍 MCA Student 
🔗 SanskrutiP01









