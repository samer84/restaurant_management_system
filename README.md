# Restaurant Management System

This project is a **Restaurant Management System** built using **NestJS** and **MongoDB**. The system provides functionalities for managing restaurant orders and generating daily sales reports.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [API Endpoints](#api-endpoints)



---

## Project Overview

The **Restaurant Management System** allows restaurant owners to:
- Manage orders with features to create, update, and retrieve them.
- Generate daily sales reports, including:
  - Total revenue
  - Number of orders
  - List of top-selling items

---

## Features
- **Order Management**:
  - Create, update, and retrieve orders.
- **Daily Sales Report**:
  - Generate a summary of daily sales using MongoDB aggregation.
- **Error Handling**:
  - Validates user inputs and handles errors gracefully.

---

## Technologies Used
- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Validation**: Class-validator and class-transformer

---

## Installation

### Prerequisites
- Node.js (v16 or later)
- MongoDB
- docker and docker compose

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/restaurant-management-system.git
   cd restaurant-management-system

2. donload mongodb locally :
   ```bash
   docker-compose up -d 
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm run start:dev
   ```

## API Endpoints

### 1. Orders

#### Create Order
 - Endpoint: POST /orders
 - Request Body
```json
   {
  "customerName": "John Doe",
  "items": [
    { "name": "pizza", "quantity": 2, "price": 140.50 },
    { "name": "Fries", "quantity": 1, "price": 40.99 }
  ],
  "totalPrice": 180.84
}
```

- response
```json
  {
  "id": "64f5a4c8396f8e0012d5f611",
  "customerName": "samer adel",
   "items": [
    { "name": "pizza", "quantity": 2, "price": 140.50 },
    { "name": "Fries", "quantity": 1, "price": 40.99 }
  ],
  "totalPrice": 180.84
  "timestamp": "2024-11-22T12:00:00Z"
}

```

#### Update Order
 - Endpoint: PATCH /orders/:id
 - Request Body
```json
   {
  "customerName": "samer adel",
  "items": [
    { "name": "pizza", "quantity": 1, "price": 120.50 }
  ],
  "totalPrice": 120.5
}
```

- response
```json
  {
  "id": "64f5a4c8396f8e0012d5f611",
  "customerName": "samer adel",
   "items": [
     { "name": "pizza", "quantity": 1, "price": 120.50 }
    { "name": "Fries", "quantity": 1, "price": 40.99 }
  ],
  "totalPrice": 160.84
  "timestamp": "2024-11-22T12:00:00Z"
}

```

#### Get Order by id 
 - Endpoint: GET /orders/:id

- response
```json
  {
  "id": "64f5a4c8396f8e0012d5f611",
  "customerName": "samer adel",
   "items": [
     { "name": "pizza", "quantity": 1, "price": 120.50 }
    { "name": "Fries", "quantity": 1, "price": 40.99 }
  ],
  "totalPrice": 160.84
  "timestamp": "2024-11-22T12:00:00Z"
}

```

#### Get All Orders
 - Endpoint: GET /orders

- response
```json
 [
  {
    "_id": "64f5a4c8396f8e0012d5f611",
    "customerName": "samer adel",
    "items": [
      { "name": "Burger", "quantity": 2, "price": 120 },
      { "name": "Fries", "quantity": 1, "price": 30 }
    ],
    "totalPrice": 160,
    "timestamp": "2024-11-23T12:00:00.000Z"
  },
  {
    "_id": "64fb6d5fabc123abcde12345",
    "customerName": "ahmad ali",
    "items": [
      { "name": "Pizza", "quantity": 1, "price": 150 }
    ],
    "totalPrice": 150,
    "timestamp": "2024-11-23T12:00:00.000Z"
  }
]


```
### 1. Reports

#### Generate Daily Sales Report

 - Endpoint: GET /reports/daily?date=YYYY-MM-DD
 - Request Body
```json
   {
  "totalRevenue": 200.50,
  "orderCount": 4,
  "topSellingItems": [
    { "name": "Pizza", "quantity": 1 },
    { "name": "Burger", "quantity": 1 },
    { "name": "Fries", "quantity": 1 }
  ]
}

```

  
