# Blog Application

A full-stack blog application built with React, Node.js, Express, and MongoDB.

## Deployment Instructions

### Frontend Deployment (GitHub Pages)

1. Push your code to GitHub repository
2. Install gh-pages if not already installed:
   ```bash
   cd client
   npm install gh-pages --save-dev
   ```
3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

### Backend Deployment (Render)

1. Create a Render account at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the following:
   - Build Command: `npm install`
   - Start Command: `node Index.js/server.js`
   - Environment Variables:
     ```
     PORT=4000
     MONGODB_URI=your_mongodb_atlas_uri
     JWT_SECRET=your_jwt_secret
     NODE_ENV=production
     ```

### Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add the connection string to Render environment variables

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd api
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```
3. Create a `.env` file in the api directory with your environment variables
4. Start the development servers:
   ```bash
   # Start backend server
   cd api
   npm start

   # Start frontend server
   cd ../client
   npm start
   ```

## Environment Variables

Create a `.env` file in the api directory with the following variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Features

- User authentication (register/login)
- Create, read, update, and delete blog posts
- Responsive design
- Protected routes
- MongoDB database integration

## Technologies Used

- Frontend: React, React Router
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Deployment: GitHub Pages (frontend), Render (backend), MongoDB Atlas (database)
