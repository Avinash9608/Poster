# Publicity Poster Website

A full-stack web application for creating and sharing publicity posters. The application includes a public view for browsing posters, user authentication, and an admin panel for managing website content.

## Features

- **Public View**: Browse featured and all public posters
- **User Authentication**: Register, login, and manage your account
- **User Dashboard**: Create, edit, and manage your posters
- **Admin Panel**: Manage all posters, website content, and users
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend

- React with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/publicity-poster.git
   cd publicity-poster
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/publicity-poster
   JWT_SECRET=your_jwt_secret_key_change_in_production
   ```

4. Start the development server

   ```bash
   npm run start
   ```

   This will start both the frontend (Vite) and backend (Express) servers.

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/              # Static files
├── src/
│   ├── api/             # API utilities
│   ├── assets/          # Images, fonts, etc.
│   ├── backend/         # Backend code
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   └── server.js    # Express server
│   ├── components/      # React components
│   │   ├── admin/       # Admin components
│   │   ├── auth/        # Authentication components
│   │   ├── layout/      # Layout components
│   │   ├── posters/     # Poster-related components
│   │   └── ui/          # UI components
│   ├── context/         # React context
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
└── README.md           # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
