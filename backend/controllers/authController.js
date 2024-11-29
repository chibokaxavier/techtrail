import User from "../model/userSchema.js";
import bcrypt from "bcrypt";

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
  res
    .status(200)
    .json({ success: true,  message: "User created successfully" });
};

export { registerUser };
