# NestJS Authentication and Product Management API

This project is a NestJS-based API that provides authentication and product management functionalities. It includes features like user registration, login, email verification, password reset, and CRUD operations for products. The API is built with TypeScript, TypeORM for database management, and Swagger for API documentation.

## Features

- **Authentication**:

  - User registration with email verification.
  - User login with JWT-based authentication.
  - Password reset functionality with email verification.
  - Email verification code resend.

- **Product Management**:

  - Create, read, update, and delete products.
  - Pagination support for product listing.
  - Role-based access control (Admin-only operations).

- **Email Notifications**:

  - Email verification during registration.
  - Password reset emails.
  - Welcome emails.

- **Database**:

  - PostgreSQL database integration.
  - TypeORM for database operations.

- **API Documentation**:
  - Swagger UI for API documentation.
  - Bearer token authentication for protected endpoints.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript that supports PostgreSQL, MySQL, and other databases.
- **JWT (JSON Web Tokens)**: Used for secure user authentication.
- **Bcrypt**: For password hashing and verification.
- **Sendinblue**: For sending transactional emails (verification, password reset, etc.).
- **Swagger**: For API documentation and testing.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Sendinblue API key (for email functionality)
- Environment variables (see `.env.example` for reference)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Mohmed-saleh1/auth-task.git
   cd auth-task
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory.
   - Copy the contents of `.env.example` into `.env` and fill in the required values.

4. **Database setup**:

   - Ensure PostgreSQL is running.
   - Update the database connection details in the `.env` file.

5. **Start the application**:

   ```bash
   npm run start
   ```

6. **Access the API**:
   - The API will be running on `http://localhost:3000`.
   - Swagger documentation will be available at `http://localhost:3000/api-docs`.

## API Endpoints

### Authentication

- **POST /auth/signup**: Register a new user.
- **POST /auth/login**: Log in and receive a JWT token.
- **POST /auth/verify-email**: Verify email using the code sent to the user's email.
- **POST /auth/resend-verify-email**: Resend the email verification code.
- **POST /auth/forgot-password**: Request a password reset code.
- **POST /auth/verify-reset-code**: Verify the password reset code.
- **POST /auth/reset-password**: Reset the password using a valid token.

### Product Management

- **POST /products**: Create a new product (Admin only).
- **GET /products**: Get a paginated list of products.
- **GET /products/:id**: Get a product by ID.
- **PUT /products/:id**: Update a product (Admin only).
- **DELETE /products/:id**: Delete a product (Admin only).

## Environment Variables

- `DB_HOST`: Database host (e.g., `localhost`).
- `DB_PORT`: Database port (e.g., `5432`).
- `DB_USER`: Database username.
- `DB_PASS`: Database password.
- `DB_NAME`: Database name.
- `JWT_SECRET`: Secret key for JWT token generation.
- `API_KEY`: Sendinblue API key for email functionality.
- `SENDER_EMAIL`: Email address used to send emails.
- `SENDER_NAME`: Name of the sender for emails.

## Running Tests

To run the tests, use the following command:

```bash
npm run test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NestJS for providing a robust framework for building scalable applications.
- TypeORM for simplifying database operations.
- Sendinblue for enabling seamless email communication.

---

