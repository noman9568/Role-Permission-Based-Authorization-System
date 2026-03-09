import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
}

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers:{
    updateDepartment: (state, action) =>{
      state.departments = action.payload;
    },
    departmentStatusChange: (state, action) =>{
      const department = state.departments.find(u => u._id === action.payload);
      if(department){
        department.isActive = !department.isActive;
      }
    },
    addDepartment: (state, action) =>{
      state.departments.push(action.payload);
    },
    deleteDepartment: (state, action) =>{
      state.departments = state.departments.filter(dpt => dpt._id!== action.payload);
    }
  }
});


export const { updateDepartment, departmentStatusChange, addDepartment, deleteDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;