import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const seedSuperAdmin = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({role : "super_admin"});
    if(existingAdmin) {
      console.log("Super Admin already exists.");
      process.exit(0);
      
    }

    const password = "superadmin";
    const hashPassword = await bcrypt.hash(password, 10);
    const superAdmin = await User.create({
      name: "Super Admin",
      email: "superadmin@gmail.com",
      password: hashPassword,
      role: "super_admin"
    })

    console.log("Super Admin created.");
    console.log({
      email: "superadmin@gmail.com",
      password 
    });
    
    process.exit(0);
  } catch(err) {
    console.log("Error seeding super admin - ", err);
    process.exit(1);
  }
}

seedSuperAdmin();