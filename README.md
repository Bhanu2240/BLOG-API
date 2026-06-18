# Blog API

A RESTful Blog API built using Node.js, Express.js, MongoDB Atlas, and Mongoose.

## Features

- Create Categories
- Get Categories
- Create Posts
- Get All Posts
- Get Single Post
- Update Posts
- Delete Posts
- Filter Posts by Category
- Pagination

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Installation

1. Clone repository

2. Install dependencies

npm install

3. Create .env

PORT=5000
MONGO_URI=your_mongodb_connection_string

4. Run project

npm run dev

## API Endpoints

### Categories

POST /categories

GET /categories

### Posts

POST /posts

GET /posts

GET /posts/:id

PUT /posts/:id

DELETE /posts/:id

### Filter

GET /posts?category=Technology

### Pagination

GET /posts?page=1&limit=5

## Live Deployment

🚀 Live URL: https://blog-api-738r.onrender.com