const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



const register = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      mobile,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registered Succesful!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not Exist" });
    }
    const isPassword = await bycrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token,user: {
      userId: user._id,
      name: user.name,
      email: user.email
  }});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getUser=async(req,res)=>{

//   try{
//     const user=await User.findById(req.user.userId).select('-password');
//     if(!user){
//       return res.status(404).json({user});
//     }
//   }
//   catch(error){
//     console.error(error);
//     res.status(401).json({error:"You are not Authenticated User"})
//   }
// }

module.exports={register,login};
