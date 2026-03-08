import axios from "axios";
import { departmentStatusChange, updateDepartment } from "../departmentReducer";


export const asyncDepartments = () => async (dispatch) =>{
  try{
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/department/departments", {
      headers : {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(response);
    
    dispatch(updateDepartment(response.data));
  } catch(err){
    console.log("Error fetching departments: ", err);
  }
}

export const asyncRegisterDepartment = (data) => async (dispatch) =>{
  try{
    // console.log(data);
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/api/department/registerDepartment", data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    dispatch(asyncDepartments);
  } 
  catch(err){
    console.log("Error creating new user: ", err);
  }
}

export const asyncDepartmentStatus = (id, status) => async (dispatch) =>{
  try{
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:3000/api/department/departmentStatusChange/${id}`, {status} , {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    // console.log("API :",res);
    
    dispatch(departmentStatusChange(id));
    return true;
  } catch(err){
    console.log("Error in blocking the user: ", err);
  }
}
export const asyncUpdateDepartment = (id, form) => async (dispatch) =>{
  
}