import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { userName, email, password, role } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Username or email  already exists." });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ userName, email, role, password: hashedPassword });
  const user = await newUser.save();
  res.status(200).json({ success: true, message: "User created successfully" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET, 
      { expiresIn: "120m" }
    );
    console.log(token)
    const { password: pass, ...validUser } = user._doc;
    res
      .cookie("token", token, { httpOnly: false })
      .status(200)
      .json({ validUser, token, success: true, message: "Log in successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };
