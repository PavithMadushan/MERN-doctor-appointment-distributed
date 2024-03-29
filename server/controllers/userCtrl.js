const userModel=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//register callback
const registerController=async(req,res)=>{
    try{
        const exisitingUser=await userModel.findOne({email:req.body.email})
        if(exisitingUser){
            return res
            .status(200)
            .send({message:'Userr Already Exist',success:false});
        }
        const password=req.body.password;
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        req.body.password=hashedPassword;
        const newUser=new userModel(req.body);
        await newUser.save();
        res.status(201).send({message:"Register Successfully",success:true});

    }catch(error){
        console.log(error);
        res.status(500)
        .send({success:false,message:`Registerr Controller ${error.message}`})

    }
};

const loginController= async(req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'user not found',success:false})
        }
        const isMatch=await bcrypt.compare(req.body.password, user.password)

        if(!isMatch){
            return res.status(200).send({message:'Invalide Mail or Password', success:false})
        }

        const token=jwt.sign({id:user._id },process.env.JWT_SECRET,{
            expiresIn:'1d',})

            res.status(200).send({message:"Login Success", success:true,token});

    }catch(error){
        console.log(error)
        res.status(500).send({message:`Error in Login CTRL ${error.message}`})
        

    }

}

const authController= async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        if(!user){
            return res.status(200).send({
                message:'user not found',
                success:false
            })
        }else{
            res.status(200).send({
                success:true,
                data:{
                    name:user.name,
                    email:user.email,
                }
            })
        }

    }catch(error){

    }

}

const applyDoctorController=()=>{

}

const getAllDoctorsController=async(req,res)=>{
    try{
        const doctor=await doctorModel.find({status:'approved'});
        res.status(200).send({
            sucess:true,
            message:"Doctor lists fetched successfully",
            data:doctor,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error while fetching Doctor'
        })

    }
}

module.exports={loginController,registerController,authController,getAllDoctorsController};