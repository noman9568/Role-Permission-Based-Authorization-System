"use client"
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { asyncUpdateUser } from "@/store/actions/userAction"


import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react";




const RequiredLabel = ({ children }) => (
  <span>
    {children}
    <span className="text-red-500 ml-1">*</span>
  </span>
)

const EditUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    department: "",
    role: "",
    permissions : []
  })
  const { id } = useParams();

  const { users } = useSelector(state => state.userReducer);
  const user = users.find(u => u._id == id);
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  

  useEffect(()=>{
    if(!user) return;
    setForm({
      name: user.name,
      email: user.email,
      gender: user.gender,
      department: user.department?._id
        ? user.department._id.toString()
        : "",
      role: user.role ? user.role.toLowerCase().replace(" ", "_") : "",
      permissions: user.permissions || [],
    })
  },[user]);


  const [confirmData, setConfirmData] = useState({
    show: false,
    departmentName: ""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { departments } = useSelector(state => state.departmentReducer);
  

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.role === "manager") {
      const dept = departments.find(d => d._id === form.department);

      if(dept?.manager){
        setConfirmData({
          show: true,
          departmentName: dept.name
        });
        return;
      }
    }

    // const id = form.department;
    await dispatch(asyncUpdateUser(id, form));
    // console.log(form)
    toast({
      title: "Success",
      description: "User Registered successfully!",
      duration: 1500
    });
    navigate("/users")
  }
  const ALL_PERMISSIONS = [
    "create_user",
    "delete_user",
    "update_user",
    "change_role"
  ]

  return (
    <div className="flex flex-col items-start mt-10 px-4">
      <Dialog
        open={confirmData.show}
        onOpenChange={() => setConfirmData({ show: false })}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Change Department Manager?</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            This department already has a manager.
            Assigning a new manager will replace the current one.
          </p>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setConfirmData({ show: false })}
            >
              Cancel
            </Button>

            <Button
              className="bg-black text-white"
              onClick={async () => {
                setConfirmData({ show: false });
                // Directly call the form submission logic
                await dispatch(asyncUpdateUser(id, form));
                toast({
                  title: "Success",
                  description: "User Registered successfully!",
                  duration: 1500,
                });
                navigate("/users");
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 w-fit
                  cursor-pointer rounded-2xl px-3 py-2
                  bg-zinc-100 text-zinc-800
                  hover:bg-zinc-200 active:scale-95
                  transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </div>

      <Card className="w-full max-w-4xl mx-auto shadow-none px-4">
        <CardHeader>
          <CardTitle className="text-2xl">User Details</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-16">

              {/* Name */}
              <div className="flex flex-col gap-2">
                <Label>
                  <RequiredLabel>Name</RequiredLabel>
                </Label>
                <Input
                  placeholder="Enter name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label>
                  <RequiredLabel>Email</RequiredLabel>
                </Label>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-2">
                <Label>
                  <RequiredLabel>Gender</RequiredLabel>
                </Label>
                <Select
                key={form.gender}
                  value={form.gender}
                  onValueChange={(v) => handleChange("gender", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Department */}
              <div className="flex flex-col gap-2">
                <Label>
                  <RequiredLabel>Department</RequiredLabel>
                </Label>
                <Select
                  key={form.department}
                  value={form.department}
                  onValueChange={(v) => handleChange("department", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl">
                    {departments.map((data) =>(
                      <SelectItem key={data._id} value={data._id.toString()}>{data.code}</SelectItem>
                    ))}
                    
                    {/* <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="CS">CS</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              {/* <div className="flex flex-col gap-2">
                <Label>
                  <RequiredLabel>Password</RequiredLabel>
                </Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </div> */}

              {/* Role */}
              <div className="flex flex-col gap-2">
                <Label>
                  <RequiredLabel>Role</RequiredLabel>
                </Label>
                <Select
                  key={form.role}
                  value={form.role}
                  onValueChange={(v) => handleChange("role", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl">
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    {loggedUser?.role === "super_admin" ? 
                      <SelectItem value="super_admin">Super Admin</SelectItem> : ""
                    }
                  </SelectContent>
                </Select>
              </div>


              {/* Permissions */}
              <div className="flex flex-col gap-2">
                <Label>
                  <RequiredLabel>Permissions</RequiredLabel>
                </Label>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline">
                      Select Permissions
                      {form.permissions.length > 0 && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({form.permissions.length} selected)
                        </span>
                      )}
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Assign Permissions</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 mt-4">
                      {ALL_PERMISSIONS.map((permission) => (
                        <div
                          key={permission}
                          className="flex items-center gap-3"
                        >
                          <Checkbox
                            checked={form.permissions.includes(permission)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setForm({
                                  ...form,
                                  permissions: [...form.permissions, permission],
                                })
                              } else {
                                setForm({
                                  ...form,
                                  permissions: form.permissions.filter(
                                    (p) => p !== permission
                                  ),
                                })
                              }
                            }}
                          />

                          <span className="text-sm capitalize">
                            {permission.replace("_", " ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

            {/* STATUS */}
            {/* <div className="flex flex-col gap-2">
              <Label>
                <RequiredLabel>Status</RequiredLabel>
              </Label>
              <Select
                value={form.status}
                onValueChange={(v) => handleChange("status", v)}
              >
                <SelectTrigger className="w-full md:w-1/2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-xl">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            </div>



            {/* SUBMIT */}
            <Button type="submit" className="w-full bg-zinc-50 rounded-xl">
              Update User details
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditUser
