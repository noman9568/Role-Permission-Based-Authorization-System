import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
    uppercase: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  isActive:{
    type: Boolean,
    default: true
  },
  description:{
    type: String,
    required: false
  }
});

export default mongoose.model("Department", departmentSchema);