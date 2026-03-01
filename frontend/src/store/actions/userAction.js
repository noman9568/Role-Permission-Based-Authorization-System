import axios from "axios"
import { deleteUser, updateUsers, userPermissionChange, userRoleChange, userStatusChange, updateUser } from "../userReducer"
import { asyncDepartments } from "./departmentAction";
// import { useSelector } from "react-redux";



export const asyncUsers = () => async (dispatch) =>{
  // console.log(getState);
  try{
    // const { users } = useSelector(state => state.userReducer);
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/user/users", {
      headers : {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(updateUsers(response.data));
  }
  catch(err){
    console.log("Error fetching admins: ", err);
  }
}


export const asyncAddUser = (data) => async (dispatch) =>{
  try{
    // console.log(data);
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:3000/api/user/registerUser", data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    
    dispatch(asyncUsers());
  } 
  catch(err){
    console.log("Error creating new user: ", err);
  }
}

export const asyncDeleteEmployee = (id) => async (dispatch) =>{
  try{
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:3000/api/user/deleteUser/${id}`, {} , {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    dispatch(deleteUser(id));
    return true;
  }
  catch(err){
    console.log("Error deleting the user: ", err);
    throw err;
  }
}

export const asyncUserStatus = (id, status) => async (dispatch) =>{
  try{
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:3000/api/user/userStatusChange/${id}`, {status} , {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    dispatch(userStatusChange(id));
    return true;
  } catch(err){
    console.log("Error in blocking the user: ", err);
  }
}


export const asyncUserRole = (id, role) => async (dispatch) =>{
  try{
    // console.log("CLicked")
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:3000/api/user/userRoleChange/${id}`, {role} , {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    // console.log("Clicked nothing", res);
    dispatch(userRoleChange({id, role}));
  } catch(err){
    console.log("Error in changing the role: ", err);
  }
}

export const asyncUserPermission = (id, permissions) => async (dispatch) =>{
  try{
    // console.log("CLicked")
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:3000/api/user/userPermissionChange/${id}`, {permissions} , {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    // console.log("Clicked nothing", res);
    dispatch(userPermissionChange({id, permissions}));
  } catch(err){
    console.log("Error in changing the permissions: ", err);
  }
}

export const asyncUpdateUser = (id, form) => async (dispatch) =>{
  try{
    const token = localStorage.getItem("token");
    const res = await axios.put(`http://localhost:3000/api/user/userUpdate/${id}`, form , {
      headers: {
      Authorization: `Bearer ${token}`
      },
    })
    await dispatch(updateUser(res.data.user));
    dispatch(asyncDepartments());
  } catch (err) {
    console.log("Error in updating the user: ", err);
  }
}