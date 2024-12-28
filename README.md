# Sunyata Product Management App

## Overview

This project is a simple product management application built with Vue.js. It allows users to view, create, edit, and delete products. This was a learning project for myself so please forgive any mistakes. It was created as a personal challenge to learn two frameworks in two days so please forgive any minor mistakes. I initially started in Angular, but I was able to move to Vue in a single day. As a result, I'm still learning the ins and outs, so any feedback would be appreciated. 😅

## Key Features

This application showcases:

- **User Authentication:** Secure login and registration functionality, with user roles (Admin/User).
- **Product Management:**
  - Display of product lists, including details like name, description, price, category, brand, and stock.
  - Ability to add new products (Admin only).
  - Ability to edit existing products (Admin only).
  - Ability to delete products (Admin only).
- **Responsive Design:** A minimalist dark theme with a clean UI.
- **Vue Router:** Navigation between pages with dynamic routes for product editing.
- **Pinia:** State management for handling user authentication state.
- **Basic API interaction:** Simple interaction with a backend API for authentication and product data.

## Tech Stack

- **Frontend:** Vue.js 3
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** Custom CSS with a Google Gemini/Apple minimalist theme

## Functionality

1.  **Home Page:**

    - Displays a welcome message.
    - Provides login and register links for unauthenticated users.
    - Provides View Products and Create/Update Product buttons for logged-in users.
      - Will redirect to Product creation or Product list page based on user role.

2.  **Login Page:**

    - Allows users to log in using a username and password.
    - Redirects to the product list after successful login.

3.  **Register Page:**

    - Allows users to register using a username and password.
    - Redirects to the login page after successful registration.

4.  **Products Page:**

    - Displays a list of products.
    - Admin users can add new products using the "Add New Product" button.
    - Admin users can edit and delete products directly from the list.

5.  **Product Form Page:**
    - Allows admin users to create new products, or edit existing products.
    - Includes input fields for product name, description, price, category, brand, SKU, and stock quantity.

## Setup

### Install Dependencies

```bash
npm install
```

Endpoints Used:

    POST /api/auth/login: For user authentication.

    POST /api/auth/register: For user registration.

    GET /api/products: To get list of products

    POST /api/products: To add a product

    PUT /api/products/:id: To update a product

    DELETE /api/products/:id: To delete a product
