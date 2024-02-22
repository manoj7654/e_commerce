const { userModel } = require("../model/userModal");
require("dotenv").config();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const register=async(req,res)=>{
    const {name,email,password}=req.body;
  try {
    const user=await userModel.findOne({email:email});
    if(user){
        return res.json({"message":"Email already esixt !"})
    }
    bcrypt.hash(password,5,async(err,secure_password)=>{
        if(err){
            console.log(err)
        }
        const result=new userModel({name,email,password:secure_password})
        await result.save();
        res.json({"message":"User registerd successfully"})
    })
  } catch (error) {
    console.log(error);
   
  }
}


const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        
        const user=await userModel.find({email});
        if(user.length>0){
         bcrypt.compare(password,user[0].password,async(err,result)=>{
            if(result){
                const token=jwt.sign({userId:user[0]._id},process.env.secret);
                res.json({"message":"Login successfull","token":token})
            }else{
                res.json({"message":"Wrong credential"})
            }
         })
        }else{
            res.json({"message":"users not found !"})
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports={register,login}