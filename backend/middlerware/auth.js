import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const role_code = {
  super_admin: 100,
  admin: 200,
  manager: 300,
  employee: 400
};

export const verifyToken = async (req,res, next) =>{
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(req.headers);
  
  if(!token) return res.status(401).json({message : "No Token Provided."});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch(error) {
    return res.status(403).json({message : "Invalid Token"});
  }
}


export const authorizeRoles = (...allowedRoles) =>{
  return (req,res,next) =>{
    // console.log(req.user.role);
    if(!allowedRoles.includes(req.user.role)){
      return res.status(403).json({message : "Access denied"});
    }
    next();
  }
}

export const hasPermission = (...permissions) =>{
  return (req, res, next) =>{
    const user = req.user;

    if(user.role==="super_admin") return next();

    const hasAccess = permissions.some(p =>
      user.permissions.includes(p)
    );

    if(!hasAccess) {
      return res.status(403).json({message : "Forbidden"});
    }
    next();
  }
}

export const checkHierarchy = async (req, res, next) =>{
  const roleCode = req.user.roleCode;
  
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if(roleCode<user.roleCode || req.params.id===req.user._id){
    next();
  }else{
    return res.status(403).json("Unauthorised");
  }
}