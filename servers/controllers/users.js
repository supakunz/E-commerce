const UserSchema = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    let users = await UserSchema.find({});
    console.log("All Users Fetched");
    res.send(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createUsers = async (req, res) => {
  try {
    // เช็ตว่าใน database มีข้อมู email นี้ไหม
    let check = await UserSchema.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(400)
        .json({ suscess: false, errors: "Duplicate email address." });
    }

    const user = new UserSchema({
      // กำหนกค่าลงใน Table
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save(); // save data at database

    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    // ** use Json Web Token **
    const token = jwt.sign(data, "secret_ecom", { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: "Failed Registering.", status: error });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { id } = req.params;

    const data = {
      name,
      email,
      role,
    };

    if (password) {
      data.password = password;
    }

    const updated = await UserSchema.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    console.log(updated);
    res.json({ message: "Update User Successfully" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const deleteUsers = async (req, res) => {
  await UserSchema.findOneAndDelete({ _id: req.body.id });
  console.log("Remove Users");
  res.json({ success: true, name: req.body.name });
};

const getUsersID = async (req, res) => {
  try {
    const { id } = req.params;
    let users = await UserSchema.find({ _id: id });
    console.log("UsersID Fetched");
    res.send(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const loginUsers = async (req, res) => {
  let user = await UserSchema.findOne({ email: req.body.email });
  if (user) {
    // 1. check ว่า มี email นี้อยูใน database ไหม
    const passCompare = req.body.password == user.password; // 2.Check ว่า password ที่ login เข้ามาตรงกับ database
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      const token = jwt.sign(data, "secret_ecom", { expiresIn: "1h" }); // 3. ส่ง Token กลับไป
      res.json({ success: true, token });
    } else {
      res.json({
        suscess: false,
        errors: "Invalid password please try again.",
      });
    }
  } else {
    res.json({ suscess: false, errors: "Invalid email please try again." });
  }
};

module.exports = {
  getAllUsers,
  getUsersID,
  createUsers,
  updateUsers,
  deleteUsers,
  loginUsers,
};
