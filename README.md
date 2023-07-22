# Bookstore API Project

This is a project to design and implement a RESTful API for an online bookstore using NestJS and MongoDB. The API will allow CRUD operations for managing books, each with properties such as title, author, genre, price, and availability. The project will also implement pagination and filtering options for fetching books. Additionally, there is a bonus task to implement email notifications when a user creates a book.

## Requirements

To run this project, you need to have the following installed:

- Node.js
- NestJS
- MongoDB
- Docker (for containerization)

MongoDB Connection Configuration
Before running the application, you need to set up the MongoDB connection. Follow these steps:

Install MongoDB on your machine or use a remote MongoDB service.
Create a new MongoDB database for the bookstore application.
Update the connection URL in the application's configuration file (src/config/database.config.ts) to point to your MongoDB instance.
typescript
Copy code
// src/config/database.config.ts

export default {
  mongoURI: 'mongodb://localhost:27017/bookstore', // Update this URL with your MongoDB connection
};

## Getting Started

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the application using `npm run start:dev`.
4. The application will be accessible at `http://localhost:3000`.

## Docker

The project includes a Dockerfile that defines the Docker image for the application. To containerize the application, follow these steps

Docker provides a lightweight and consistent environment for running applications, ensuring that the application behaves the same in development, testing, and production environments. It simplifies the deployment process by packaging the application and its dependencies into a container, making it easy to move and run across different platforms. With Docker, you can scale your application easily by running multiple containers on the same host or distributing them across multiple hosts using orchestration tools like Kubernetes.

**Build the Docker image:**

``` docker build -t bookstore-api . ```

**Run the Docker container:**

```docker run -p 3000:3000 -d bookstore-api```

The application will be accessible at <http://localhost:3000>.

## API Endpoints

The following API endpoints are available for managing books:

1. **Create Book**

   - Method: POST
   - URL: `/books`
   - Description: Creates a new book with the provided details.
   - Request Body: JSON object with the book details (title, author, genre, price, availability).

2. **Get All Books**

   - Method: GET
   - URL: `/books`
   - Description: Retrieves a paginated list of all books.
   - Parameters:
     - `page`: Query parameter (number) for the page number.
     - `perPage`: Query parameter (number) for the number of items per page.
     - `availability`: Query parameter (boolean) to filter books by their availability.

3. **Get Single Book**

   - Method: GET
   - URL: `/books/:id`
   - Description: Fetches the details of a specific book using its ID.

4. **Update Book**

   - Method: PUT
   - URL: `/books/:id`
   - Description: Updates the details of a specific book using its ID.
   - Request Body: JSON object with the book details to be updated.

5. **Delete Book**

   - Method: DELETE
   - URL: `/books/:id`
   - Description: Deletes a specific book using its ID.

## API Documentation for Books Application

This document provides an overview of the available API endpoints and their functionalities for the "Books" application. The API allows users to manage books and in the system.

## Get All Books with Query

- **Method:** GET
- **URL:** `http://localhost:3000/books?availability=false`
- **Description:** Retrieves a list of all books with the availability set to `false`.
- **Parameters:**
  - `availability`: Query parameter (boolean) to filter books by their availability.

## Get All Books with Pagination

- **Method:** GET
- **URL:** `http://localhost:3000/books?page=2&perPage=1`
- **Description:** Retrieves a paginated list of all books.
- **Parameters:**
  - `page`: Query parameter (number) for the page number.
  - `perPage`: Query parameter (number) for the number of items per page.

## Get a Single Book

- **Method:** GET
- **URL:** `http://localhost:3000/books/64ba9923f181ea917cc2ed57`
- **Description:** Fetches the details of a specific book using its ID.

## Update a Single Book

- **Method:** PUT
- **URL:** `http://localhost:3000/books/64ba9923f181ea917cc2ed57`
- **Description:** Updates the details of a specific book using its ID.
- **Request Body:** JSON object with the book details to be updated.

```json {
  "title": "Updated Book Title",
  "author": "Updated Author Name",
  "genre": "Updated Genre",
  "price": 24.99,
  "availability": false
}
```

## Delete a Single Book

- **Method:** DELETE
- **URL:** `http://localhost:3000/books/64ba995ff181ea917cc2ed5a`
- **Description:** Deletes a specific book using its ID.

## Create Book

- **Method:** POST
- **URL:** `http://localhost:3000/books`
- **Description:** Creates a new book with the provided details.
- **Request Body:** JSON object with the new book details.

```json {
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "price": 19.99,
  "availability": true
}
```
