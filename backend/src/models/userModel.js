import mongoose from "mongoose";

const{Schema, model}=mongoose;

const userSchema = new Schema({
   name:{
    type:String,
    required:true,
    trim:true,
   },

   phone:{
    type:String,
    required:true,
    trim:true,
    unique:true,
   },

   email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
   },
   password:{
    type:String,
    required:true,
    trim:true,
   },
   image:{
    type:String,
   },
   role:{
    type:String,
    enum:["user","admin"],
    default:"user",
   },
},{
    timestamps:true,
});

const User = model("User", userSchema);

export default User;