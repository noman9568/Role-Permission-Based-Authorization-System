import express from "express";
import Department from "../models/Department.js";
import Users from "../models/User.js";
import { verifyToken, authorizeRoles, hasPermission } from "../middlerware/auth.js"; // note .js extension

const router = express.Router();

router.post("/register", verifyToken, authorizeRoles("super_admin", "admin"), hasPermission("create_user"), async (req,res) =>{
  try{
    const { name, code, manager, isActive } = req.body;
    
    const existingDepartment = await Department.findOne({name});
    if(existingDepartment) return res.json({message : "Department already exists."});

    const dept = await Department.create({
      name,
      code,
      manager: manager || null,
      isActive
    });
    return res.status(201).json({message : "Department registered successfully.", dept});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


router.get("/departments", verifyToken, authorizeRoles("super_admin", "admin"), async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.patch("/:id/statusUpdate", verifyToken, authorizeRoles("super_admin", "admin"), async (req,res) =>{
  try{
    const dept = await Department.findById(req.params.id);
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }
    
    dept.isActive = !dept.isActive;
    await dept.save();
    
    res.json({message : "Department status changed.", id: req.params.id, isActive : dept.isActive});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


router.put("/:id/update", verifyToken, authorizeRoles("super_admin", "admin"), async (req, res) =>{

  try{
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, {new : true});
    return res.status(200).json({message: "Department updated."});

  } catch(err){
    return res.status(400).json({message: "Error in updating the department.", err});
  }
  
})

router.delete("/:id/delete", verifyToken, authorizeRoles("super_admin", "admin"), async (req, res) =>{
  try{
    await Department.findByIdAndDelete(req.params.id);
    await Users.updateMany(
      {department : req.params.id},
      {$set : {department : null }}
    );
    return res.status(200).json({message : "Department deleted successfully."});
  } catch(err){
    return res.status(400).json({message: "Error in deleting the department.", err});
  }
})


export default router;