import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
}


export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action)=>{
      state.users = action.payload;
    },
    deleteUser: (state, action)=>{
      state.users = state.users.filter((user) => user._id !== action.payload)
    },
    userStatusChange: (state, action) =>{
      const user = state.users.find(u => u._id === action.payload);
      if(user){
        user.status = user.status === "blocked" ? "active" : "blocked";
      }
    },
    userRoleChange: (state, action) =>{
      const user = state.users.find(u => u._id === action.payload.id);
      user.role = action.payload.role;
    },
    userPermissionChange: (state, action) =>{
      const user = state.users.find(u => u._id === action.payload.id);
      user.permissions = action.payload.permissions;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        u => u._id === action.payload._id
      );
      console.log("Redux update payload:", action.payload);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    }
  }
})

export const {updateUsers, deleteUser, userStatusChange, userRoleChange, userPermissionChange, updateUser} = userSlice.actions;

export default userSlice.reducer;