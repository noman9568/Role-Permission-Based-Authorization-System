import { useContext, useState, createContext } from "react";
// import { store } from "../store";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  let parsedUser = null;
  try{
    parsedUser = storedUser ? JSON.parse(storedUser) : null;
  } catch(e) {
    console.log("Invalid user in local storage : ", e);
    localStorage.removeItem("user");
    parsedUser = null;
  }
  const [user, setUser] = useState(parsedUser);

  const isAuthenticated = Boolean(token && user);

  const login = ({token, user}) =>{
    // console.log("Login called");
    if(!user || !token) return;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{login, logout, user, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);



