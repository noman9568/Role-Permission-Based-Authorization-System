import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import Department from "../models/Department.js";

const role_code = {
  super_admin: 100,
  admin: 200,
  manager: 300,
  employee: 400
};



export const userLogin = async (req, res) =>{
  const {email, password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message : "User Not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.json({message : "Wrong password."});
    }
    if(user.status==="blocked"){
      return res.status(403).json({message : "Blocked"});
    }

    const token = await jsonwebtoken.sign({id: user._id, role: user.role, roleCode: user.roleCode}, process.env.JWT_SECRET, {expiresIn : "1d"})

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Login successfull.",
      token,
      user: userResponse
    });
  } catch(err){
    return res.status(500).json({message : "Server error."});
  }
}


export const userRegister = async (req, res) =>{
  try {
    const {name, email, gender, department, password, role, status, permissions} = req.body;
    // console.log(req.body);
    
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.json({message : "User already exists."});
    }

    if(role==="manager"){
      const existingManager = await User.findOne({role: "manager", department, status: "active"});
      if(existingManager){
        existingManager.role = "employee";
        await existingManager.save();
      }
    }

    const roleCode = role_code[role];
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      name,
      email,
      gender,
      department,
      password : hashPassword,
      roleCode,
      role,
      status,
      permissions
    });
    

    const userResponse = user.toObject();
    delete userResponse.password;
    if (role === "manager") {
      await Department.findByIdAndUpdate(
        department,
        { manager: user._id }
      );
    }

    res.status(201).json({message: "Registered successfully", user: userResponse});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export const getUsers = async (req, res) =>{
    try {
      const users = await User.find().populate("department", "name code");
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
} 


export const getUserById = async (req, res) =>{
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "User not found." });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


export const deleteUserById = async (req, res) =>{
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.json({message : "User Deleted successfully.", id: req.params.id});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


export const userStatusChange = async (req, res) =>{
  try{

    const user = await User.findById(req.params.id);

    user.status = req.body.status === "active" ? "blocked" : "active";
    await user.save();

    res.json({message : "User status changed.", id: req.params.id});
  } catch (err) {
    res.status(500).json({ message: "Failed to change the status", error: err});
  }
}


export const userRoleChange = async (req, res) =>{
  try{
    
    const user = await User.findOneAndUpdate({_id : req.params.id}, {role: req.body.role});

    res.json({message : "User role changed.", id: req.params.id});
  } catch (err) {
    res.status(500).json({ message: "Failed to change role", error: err });
  }
}


export const userPermissionChange = async (req, res) =>{
  try{

    const ALLOWED_PERMISSIONS = [
      "create_user",
      "delete_user",
      "update_user",
      "change_role"
    ];

    const filteredPermissions = req.body.permissions.filter(p =>
      ALLOWED_PERMISSIONS.includes(p)
    );

    await User.findByIdAndUpdate(
      req.params.id,
      {permissions: filteredPermissions},
      { new : true}
    );

    res.json({message : "User role changed.", id: req.params.id});
  } catch (err) {
    res.status(500).json({ message: "Failed to update permissions", error: err });
  }
}


export const userUpdate = async (req, res) => {
  try {

    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.role === "manager") {

      const department = await Department.findById(updatedUser.department);

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      if (
        department.manager &&
        department.manager.toString() !== userId
      ) {
        await User.findByIdAndUpdate(
          department.manager,
          { role: "employee" }
        );
      }

      department.manager = userId;
      await department.save();
    }else{
      const dept = await Department.findById(updatedUser.department);
      dept.manager = null;
      dept.save();
      // console.log(dept);
    }

    // 3️⃣ Return updated user
    res.json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({
      message: "Update failed",
      error: err.message
    });
  }
};