import axios from "axios";
import { departmentStatusChange, updateDepartment, addDepartment, deleteDepartment } from "../departmentReducer";


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
    const res = await axios.post("http://localhost:3000/api/department/register", data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    // console.log(res);
    
    dispatch(addDepartment(res.data.dept));
    return true;
  } 
  catch(err){
    console.log("Error creating new user: ", err);
    return false;
  }
}

export const asyncDepartmentStatus = (id, status) => async (dispatch) =>{
  try{
    const token = localStorage.getItem("token");
    await axios.patch(`http://localhost:3000/api/department/${id}/statusUpdate`, {status} , {
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
  try{
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:3000/api/department/${id}/update`, form, {
      headers: {
        Authorization : `Bearer ${token}`
      }
    })
    dispatch(asyncDepartments());
  } catch(err){
    console.log("Error in updating the department: ",err);
    
  }
}

export const asyncDeleteDepartment = (id) => async (dispatch) =>{
  try{
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/api/department/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    
    dispatch(deleteDepartment(id));

    return true;
  } catch(err){
    console.log("Error in deleting the department: ", err);
    return false;
  }
}