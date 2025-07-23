# E-commerce
A full-stack e-commerce application built with **ReactJS + TailwindCSS** on the frontend, and **NodeJS + MongoDB** on the backend. Supports secure authentication, payment with Stripe, cloud image upload, and admin management.

<img width="1280" height="720" alt="Image" src="https://github.com/user-attachments/assets/805b00d7-0434-4e92-b06d-212ea8e70977" />


## 🍄 Live Demo 
https://github.com/user-attachments/assets/253e24fb-e4ed-4512-b321-7451d238cf99

👉  <a href='https://ecommercr.netlify.app' target="_blank">E-commerce</a>

## 🔥 Features

- 🔐 Secure authentication system (with access roles for user/admin)
- 🛒 Product listing with full CRUD (admin only)
- 💳 Stripe payment integration
- 🌤️ Image upload via Cloudinary
- 📱 Fully responsive layout
- ⬆️ Scroll-to-top and smooth navigation
- ⚙️ RESTful APIs for frontend-backend interaction

## 🍀 Tech Stack
  <i>Frontend :</i>
  <ul>
      <li>ReactJS</li>
      <li>AOS</li>  
      <li>Axios</li>
      <li>Slick</li>
      <li>TailwindCSS</li>
  </ul>
  
  <i>Backend :</i>
  <ul>
      <li>NodeJS</li>
      <li>ExpressJS</li>  
  </ul>

  <i>Database :</i>
  <ul>
      <li>MongoDB</li>
  </ul>

  <i>External Services :</i>
  <ul>
      <li>Stripe (payment)</li>
      <li>Cloudinary (image storage)</li>
  </ul>


## ❄️ Installation

1. Clone this repository :

```bash
git clone https://github.com/SupakunZ/E-commerce.git
```

2. Navigate to the project folder and install dependencies :

```
cd E-commerce
npm install
```

3. Set up the environment variables :

 - Create a `.env.local` file in the client and server root directory.

 - Add the following variables to the .env file on client, replacing the placeholder values with your own:

```
VITE_APP_API = http://localhost:4000
VITE_STRIPE_PUBLIC_KEY = <your_stripe_public_key>
```

 - Add the following variables to the .env file on server, replacing the placeholder values with your own:

```
PORT = 4000
MONGO_URL = <your_mongoDB_url>
CLIENT_URL = http://localhost:5173 #onLocal
CLOUDINARY_NAME = <your_cloudinary_name>
CLOUDINARY_API_KEY = <your_cloudinary_api_key>
CLOUDINARY_API_SECRET = <your_cloudinary_api_secret>
STRIPE_SECRET_KEY = <your_stripe_secret_key>
STRIPE_ENDPOINT_SECRET = <your_stripe_endpoint_secret>
```

4. Launch the application in development mode :

```
npm run dev
```
