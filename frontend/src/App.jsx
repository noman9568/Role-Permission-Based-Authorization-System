import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Layout from "./components/Layout";
import Login from "./components/Login";
import Users from "./components/Users";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import RegisterUser from "./components/RegisterUser";
import { Toaster } from "@/components/ui/toaster";
import RoleAndPermission from "./components/RoleAndPermission";
import Departments from "./components/Departments";
import AddDepartment from "./components/AddDepartment";
import EditUser from "./components/EditUser";
import EditDepartment from "./components/EditDepartment";
import SelectedDepartment from "./components/SelectedDepartment";
import Developer from "./components/Developer";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
    <Toaster />
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/user_overview"
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/register"
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <RegisterUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments/register"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <AddDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments/:code/edit"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <EditDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/role_permission"
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <RoleAndPermission />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <Departments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments/:id"
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <SelectedDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments/:id/employee_register"
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <RegisterUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/developer"
          element={ <Developer />}
        />

        {/* <Route path="/register-admin" element={<RegisterAdmin />} /> */}

      </Route>
      <Route
          path="/"
          element={ <Login />}
      />
    </Routes>
    </>
  );
};

export default App;
