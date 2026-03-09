import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name : { type : String, required: true, default : "No username"},
  email : { type : String, required : true},
  gender: { type: String, required : true},
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null
  },
  password: { type : String, required: true},
  roleCode : {
    type: Number,
    enum : [100, 200, 300, 400],
    default : 400
  },
  role : {
    type : String,
    enum : ["super_admin", "admin", "manager", "employee"],
    default : "employee",
  },
  status: {
    type: String,
    enum: ["active", "blocked"],
    default: "active"
  },
  permissions: {
    type : [String],
    enum : ["create_user", "delete_user", "update_user", "change_role"],
    default: []
  }
})

export default mongoose.model("User", userSchema);