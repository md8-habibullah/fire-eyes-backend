# 🔥 Fire Eyes Backend

An Express.js REST API designed to support the Fire Eyes web application. This backend handles user authentication, product management, and integrates with MongoDB for data persistence.

---

## 🚀 Features

* User Registration & Authentication
* JWT-based Authorization
* CRUD Operations for Products
* MongoDB Integration with Mongoose
* Environment Variable Configuration

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* dotenv

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/md8-habibullah/fire-eyes-backend.git
   cd fire-eyes-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   * Create a `.env` file in the root directory.
   * Add the following variables:

     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server:**

   ```bash
   npm start
   ```

---

## 📂 Project Structure

```
fire-eyes-backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## 🧪 API Endpoints

### Authentication

* **POST** `/api/auth/register` - Register a new user
* **POST** `/api/auth/login` - Login and receive JWT

### Products

* **GET** `/api/products` - Retrieve all products
* **GET** `/api/products/:id` - Retrieve a product by ID
* **POST** `/api/products` - Create a new product
* **PUT** `/api/products/:id` - Update a product by ID
* **DELETE** `/api/products/:id` - Delete a product by ID

---

## 🛡️ Environment Variables

Ensure you have a `.env` file with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

## 📬 Contact

For any inquiries or feedback, please contact [md8-habibullah](https://github.com/md8-habibullah).

---
