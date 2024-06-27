import User from "../model/authModel.js";
import emailvalidator from "email-validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

//Sign- Up

const registerUser = async (req, res) => {
  try {
    let { name, email, password, mobile} = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", payload: [] });
    }
    if (!emailvalidator.validate(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email address", payload: [] });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists.", payload: [] });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      mobile: mobile,
      active: "1",
    });
    const result = await newUser.save();
    if (result) {
      return res
        .status(200)
        .json({ message: "User registered successfully", payload: result });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to register user", payload: [] });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", payload: [] });
  }
};

//log-In

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("emailemailemailemailemail", email);
    console.log("passwordpasswordpasswordpassword", password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch, "password is matched");
    if (passwordMatch) {
      const token = JWT.sign({ userId: user._id }, "your_secret_key", {
        expiresIn: "1.5h",
      });
      return res.status(200).json({ message: "User login successfully.", token });
    } else {
      return res.status(401).json({ message: "Wrong password." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//getUser

const getUser = async (req, res) => {
  try {
    const users = await User.find({ active: "1" });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  };
};  

//Log-Out

const logout = async( req , res ) => {
  try{
    return res.status(200).json({ message:" logout Successfully "});
  }catch(error){
    console.error("Error is showing", error);
    return res.status(500).json({ message:"Internal server error"})
  };
};

//Delete User By Email

const deleteUserByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    };
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error." });
  };
};


//Update User Using Id


const UpdateUser = async ( req, res) => {
  const { id } = req.params;
  try {
    const { name , email , password, mobile } = req.body;
    if(!name && !email && !password && !mobile) {
      return res.status(400).json({ message: "At least one field is required for update.."});
    }
    let user = await User.findById(id);

    if(!user) {
      return res.status(404).json({ message: "User not found..."});
    }
    if(name) user.name = name;
    if(email) user.email = email;
    if(password) {
      const hashedPassword = await bcrypt.hash(password,10);
      user.password = hashedPassword;
    };
    if(mobile) user.mobile = mobile;
    user = await user.save();
    return res.status(200).json({ message: "User Data is updated successfully...", user});

  }catch(error){
    console.error("Error in updating user:", error);
    return res.status(500).json({ message : "Internal server error.." });
  };
};
export { registerUser, login, getUser , logout ,deleteUserByEmail, UpdateUser };