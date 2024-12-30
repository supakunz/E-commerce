# E-commerce
E-commerce Website is developed using ReactJS TailwindCSS for the client and NodeJS MongoDB for the server.

https://github.com/user-attachments/assets/253e24fb-e4ed-4512-b321-7451d238cf99

## 🍄 Live Demo 
<a href='https://ecommercr.netlify.app' target="_blank">E-commerce</a>

## 🔥 Features

  <ul>
      <li>A robust authentication system ensures user data is safeguarded and protected.</li>
      <li>Includes a smooth scroll-to-top feature for effortless navigation and improved usability.</li>
      <li>Supports secure and reliable payments via Stripe. Helps users to make transactions easily.</li>
      <li>Access rights are carefully differentiated, providing distinct privileges for users and admins.</li>
      <li>The website is fully responsive, adapting flawlessly to all devices, from desktops to smartphones.</li>
      <li>Seamless access control is implemented via APIs, ensuring secure and efficient permission management.</li>
      <li>An intuitive admin panel enables the addition, editing, and deletion of products and users with ease.</li>
  </ul>

## 🍀 Technologyies Used
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

  <i>Platform :</i>
  <ul>
      <li>Stripe</li>
      <li>Cloudinary</li>
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
