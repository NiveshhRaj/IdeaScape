# IdeaScape / Moodboard AI

## Overview

IdeaScape is a responsive web application that allows users to explore, search, and save AI-generated moodboards and images. Users can search for topics, view results in a masonry layout, and enjoy smooth cinematic animations using GSAP , Framer motion and AOS.

---

## Features

- **Responsive Design**: Works across all screen sizes.
- **Search Functionality**: Users can search for any topic and see relevant images fetched live from Unsplash API.
- **Cinematic Animations**: Smooth scroll, hover, and parallax animations using GSAP , Framer motion and AOS.
- **Navbar Behavior**:
  - Visible on the home page
  - Hidden on results and full-image pages, appears on hover at top
- **Full Image View**: Click an image to view it in full size.
- **Bonus Features**:
  - Animated search placeholder cycling through topics
  - Masonry layout for images
  - Smooth parallax effects on images
  - Authentication-ready buttons (Login / Sign Up / Logout)

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Material-UI
- **Backend**:Node js , Express js
- **Animations**: GSAP, AOS , Framer Motion
- **API**: Unsplash API
- **Version Control**: Git & GitHub
  --**Hosting**:Netlify

---

## Setup Instructions

1. **Clone the repository**:
   git clone https://github.com/your-username/idea-scape.git
2. **Install Frontend Dependencies**:
   cd client
   npm install
3. **Install the Backend Dependencies**:
   cd ../server
   npm install
4. **Setup the Environment variables**:
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongo_uri
   PORT = 5000

5. **start the Backend server**:
   cd server
   node server.js
6. **start the Frontend app**:
   cd ../client
   npm start
7. **open the application**:
   Navigate to http://localhost:3000 in your browser.

---

## Screenshots

## Author

    Niveshhraj
    Web Developer | Mern Stack Enthusiast
    Email:niveshhraj212004@gmail.com
    Github:github.com/NiveshhRaj
