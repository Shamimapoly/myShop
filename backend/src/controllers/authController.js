
  
const { emailRegex, passwordRegex } = require("../helpers/allRegex")
const bcrypt = require('bcrypt');
const authModel = require("../models/authModel");
const saltRounds = 10;
var jwt = require('jsonwebtoken');

// ===register controller=====
const register =async (req, res)=> {
   try{
     const {userName, email ,password, phone, gender} = req.body
    if(!userName || !email || !password || !phone || !gender){
        return res.status(400).json({message: "All fields are required"})
        }
    if(!emailRegex.test(email)|| !passwordRegex.test(password)){
     return res.status(400).json({message: "Invalid email or password format"})
    }
     const existuser=await authModel.findOne({email})
    if (existuser) {
  return res.status(409).json({
    message: "This email is already registered. Please log in."
  });
}
    
    let avatar = "";

    if (gender.toLowerCase() === "male") {
        avatar = "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";
    } else if (gender.toLowerCase() === "female") {
        avatar = "https://cdn-icons-png.flaticon.com/512/4140/4140047.png";
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newAuth =new authModel({
        userName:userName.trim(),
        email,
        password: hashedPassword, 
        phone, 
        gender,
        avatar: avatar,
        

        })
      

     await newAuth.save();
    

   
      const userinfo={
        "userid":newAuth.id,
        "userName":newAuth.userName,
        "email":newAuth.email,
        "avatar":newAuth.avatar,
        "phone":newAuth.phone,
        "gender":newAuth.gender
      }
      
       
    res.status(200).json({message: "User registered successfully", userinfo})
    }catch(error){
    console.error(error);
    res.status(500).json({message: "Internal server error"})
}
      
    
};


const login =async(req,res)=>{
    try{
    const {email,password}=req.body
  if(!email||!password)return res.status(404).send('invalid data')
    if(!emailRegex.test(email)||!passwordRegex.test(password))return res.status(404).send('user email and password is invaild')
    const existuser=await authModel.findOne({email})
  if(!existuser)return res.status(404).send('user not found please register')
    if(existuser.isVarified===false)return res.status(401).send('user is not verified')

      const bcryptpass=await bcrypt.compare(password, existuser.password)
      if(!bcryptpass)return res.status(401).send('wrong password')

        let token = jwt.sign({ id: existuser._id }, "aaaa", { expiresIn: '1h' });
        
 

      
        const userinfo={
          "userid":existuser.id,
          "userName":existuser.userName,
          "email":existuser.email,
          "avatar":existuser.avatar,
          "phone":existuser.phone,
          "gender":existuser.gender
        }
        return res.status(200).json({
      message: "login success",
      token: token,userinfo
    });

    
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).send("server error");
  }
}


module.exports={register,login}