const express = require("express");
const productsRouter = require("./routes/product");
const usersRouter = require("./routes/users");
const paymentRouter = require("./routes/payment");
const connectDB = require("./utils/db");
const multer = require("multer"); // Middleware ที่ช่วยจัดการการอัพโหลดไฟล์ในฝั่ง Node.js
const dotenv = require("dotenv").config();
var cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middleware เพื่อแปลงข้อมูลฟอร์ม
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/payment", paymentRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
