# **EasyDrop API**

## **Overview**
This is a RESTful API built for managing user authentication and todo lists. It allows users to register, log in, create, retrieve, update, and delete todos. The project demonstrates core backend development skills, including user authentication, database management, and API design.

---

## **Features**
- **User Management**:
  - Register a new user with a unique username and password.
  - Log in to receive a JWT token for secure session management.
  - Log out (simulates clearing the token).

- **Todo Management**:
  - Create new todos with titles and descriptions.
  - Retrieve all todos belonging to the authenticated user.
  - Retrieve a specific todo by its ID.
  - Update existing todos.
  - Delete specific todos.

- **Security**:
  - Password hashing using `bcryptjs`.
  - Token-based authentication using JSON Web Tokens (JWT).

- **Database Integration**:
  - MySQL as the database.
  - Knex.js for query building and migrations.

---

## **Technologies Used**
- **Backend Framework**: Express.js
- **Database**: MySQL
- **Query Builder**: Knex.js
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv
- **Logging**: Morgan
- **Containerization**: Docker Compose

---

## **Getting Started**

### **Prerequisites**
- Docker (with Docker Compose support)
- Postman or any API testing tool

### **Setup Instructions**

#### **Using Docker Compose**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/REFATBHUYAN/easydrop-api.git
   cd easydrop-api
   ```

2. **Build and Start the Services**:
   Run the following command to start both the MySQL database and the API server:
   ```bash
   docker-compose up --build
   ```

   - The database will be available at `db:3306` inside the containers.
   - The API will be accessible at `http://localhost:5000`.

3. **Run Migrations**:
   After starting the services, run the migrations and seeds:
   ```bash
   docker-compose exec app npx knex migrate:latest
   docker-compose exec app npx knex seed:run
   ```

4. **Test the API**:
   Use Postman or any API testing tool to test the endpoints.

---

### **Endpoints**

| Method | Endpoint            | Description                                   |
|--------|---------------------|-----------------------------------------------|
| POST   | `/api/auth/register` | Register a new user                          |
| POST   | `/api/auth/login`    | Log in a user and receive a JWT token        |
| POST   | `/api/auth/logout`   | Log out the user (simulates clearing the token) |
| POST   | `/api/todos`         | Create a new todo                            |
| GET    | `/api/todos`         | Retrieve all todos for the authenticated user|
| GET    | `/api/todos/:id`     | Retrieve a specific todo by its ID           |
| PUT    | `/api/todos/:id`     | Update a specific todo                       |
| DELETE | `/api/todos/:id`     | Delete a specific todo by its ID             |

---

## **Database Structure**

The application uses two main tables:

1. **Users Table**:
   - `id`: Unique identifier for each user.
   - `username`: User's chosen username (unique).
   - `password`: Hashed password for security.

2. **Todos Table**:
   - `id`: Unique identifier for each todo.
   - `user_id`: Foreign key linking the todo to a user.
   - `title`: Title of the todo.
   - `description`: Detailed description of the todo.
   - `completed`: Boolean indicating if the todo is completed.
   - `created_at`: Timestamp when the todo was created.
   - `updated_at`: Timestamp when the todo was last updated.

---

## **Project Structure**

```
easydrop-api/
│
├── src/
│   ├── index.js              # Main server file
│   ├── routes/               # API routes
│   │   ├── auth.js           # Authentication routes
│   │   └── todos.js          # Todo management routes
│   ├── models/               # Database models
│   │   ├── user.js           # User model
│   │   └── todo.js           # Todo model
│   ├── utils/                # Utility functions
│   │   └── authenticate.js   # Authentication middleware
│   └── db/                   # Database migrations and seeds
│       ├── migrations/       # Database schema migrations
│       └── seeds/            # Seed data for the database
├── knexfile.js               # Knex configuration
├── .env                      # Environment variables
├── package.json              # Project dependencies
├── Dockerfile                # Docker configuration for the app
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # This file
```

---

## **Environment Variables**
Create a `.env` file in the root directory and add the following variables:
```env
PORT=5000
JWT_SECRET=your_very_secure_secret_key
MYSQL_HOST=db
MYSQL_USER=root
MYSQL_PASSWORD=rootpassword
MYSQL_DATABASE=easydrop
```

> **Note**: When using Docker Compose, the `MYSQL_HOST` should point to the service name `db` instead of `localhost`.

---

## **How to Test**

### **User Authentication**
1. **Register a User**:
   - Endpoint: `POST /api/auth/register`
   - Payload:
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```

2. **Log In**:
   - Endpoint: `POST /api/auth/login`
   - Payload:
     ```json
     {
       "username": "testuser",
       "password": "password123"
     }
     ```
   - Response:
     ```json
     {
       "token": "your_jwt_token_here"
     }
     ```

3. **Log Out**:
   - Endpoint: `POST /api/auth/logout`
   - Headers:
     ```
     Authorization: Bearer your_jwt_token_here
     ```

---

### **Todo Management**
1. **Create a Todo**:
   - Endpoint: `POST /api/todos`
   - Headers:
     ```
     Authorization: Bearer your_jwt_token_here
     ```
   - Payload:
     ```json
     {
       "title": "Buy groceries",
       "description": "Pick up groceries from the store."
     }
     ```

2. **Retrieve All Todos**:
   - Endpoint: `GET /api/todos`
   - Headers:
     ```
     Authorization: Bearer your_jwt_token_here
     ```

3. **Retrieve a Specific Todo**:
   - Endpoint: `GET /api/todos/:id`
   - Headers:
     ```
     Authorization: Bearer your_jwt_token_here
     ```

4. **Update a Todo**:
   - Endpoint: `PUT /api/todos/:id`
   - Headers:
     ```
     Authorization: Bearer your_jwt_token_here
     ```
   - Payload:
     ```json
     {
       "title": "Updated title",
       "description": "Updated description"
     }
     ```

5. **Delete a Todo**:
   - Endpoint: `DELETE /api/todos/:id`
   - Headers:
     ```
     Authorization: Bearer your_jwt_token_here
     ```

---

## **Using Docker Compose**

To simplify the setup process, you can use Docker Compose to start both the MySQL database and the API server with a single command.

### **Steps**
1. **Install Docker and Docker Compose**:
   Ensure Docker and Docker Compose are installed on your system.

2. **Start the Services**:
   Run the following command to start the application and database:
   ```bash
   docker-compose up --build
   ```

   - The database will be available at `db:3306` inside the containers.
   - The API will be accessible at `http://localhost:5000`.

3. **Run Migrations**:
   After starting the services, run the migrations and seeds:
   ```bash
   docker-compose exec app npx knex migrate:latest
   docker-compose exec app npx knex seed:run
   ```

4. **Stop the Services**:
   To stop the services, press `Ctrl+C` in the terminal where Docker Compose is running.

---

## **Contact**
For any questions or feedback, please contact:
- Name: MD. REFAT BHUYAN
- Email: refatbubt@gmail.com

---

### **Key Benefits of Using Docker Compose**
- **Simplified Setup**: Both the application and the database can be started with a single command.
- **Reproducibility**: Ensures consistent environments across different machines.
- **Ease of Use**: Reduces the complexity of managing multiple containers manually.