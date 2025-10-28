# 🛒 Mock E-Commerce Cart

A simple **full-stack shopping cart** web application built for the **Vibe Commerce Screening Assignment**.  
This project demonstrates seamless integration between a **React frontend** and a **Node.js + Express backend**, using mock product data and REST APIs — with features like Add to Cart, Remove Item, and Checkout.

---

## ⚙️ Tech Stack

**Frontend:** React (Vite)  
**Backend:** Node.js, Express.js  
**Database:** Mock Data (In-Memory)  
**Version Control:** Git & GitHub

---

## 📁 Project Structure
mock-ecom/
│
├── backend/
│ ├── server.js # Express server with API routes
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── App.js # Main React component
│ │ ├── App.css # UI styling
│ │ ├── components/ # Cart, Checkout, Product List
│ │ └── assets/
│ ├── package.json
│ └── vite.config.js
│
└── README.md

---

## 🚀 Setup Instructions

### 🖥 Backend Setup
```bash
cd backend
npm install
npm start
Runs at: http://localhost:5000

💻 Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Runs at: http://localhost:5173

✅ Make sure the backend is running before starting the frontend.

🧩 Features
✔️ Display of mock products (with name, price & description)
✔️ Add / Remove items from cart
✔️ Auto-calculated cart total
✔️ Checkout with name & email validation
✔️ Thank-you receipt popup with dynamic customer name
✔️ Clean, responsive UI with persistent cart view

📦 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch all mock products
GET	/api/cart	Fetch current cart items & total
POST	/api/cart	Add product to cart
DELETE	/api/cart/:id	Remove product from cart
POST	/api/checkout	Checkout & generate receipt

🖼 Screenshots
Home Page	Cart View	Checkout Popup
<img width="1360" height="582" alt="image" src="https://github.com/user-attachments/assets/b7de598c-6ec8-4ea8-a87d-d1c34b5f731d" />
<img width="1360" height="725" alt="image" src="https://github.com/user-attachments/assets/d8dec771-7473-4d8d-aa28-409346274965" />
<img width="1360" height="728" alt="image" src="https://github.com/user-attachments/assets/0ad9639c-3a05-44cf-aa5f-b9763606075a" />



👩‍💻 Author
Sanskruti Pawaskar
🔗 SanskrutiP01

🧠 Notes
The project uses mock data (no database).

Focused on core e-commerce functionality and frontend-backend communication.

Designed for assignment demonstration — lightweight & easily deployable.

⭐ If you like this project, consider giving it a star on GitHub!

---







