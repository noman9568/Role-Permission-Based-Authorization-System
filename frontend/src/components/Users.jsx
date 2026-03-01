import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AdminTable } from "./admins/AdminTable"
import { userColumns } from "./admins/admin-columns"
import {
  asyncDeleteEmployee,
  asyncUsers,
  asyncUserStatus,
} from "../store/actions/userAction"
import { Input } from "./ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import { useToast } from "@/hooks/use-toast"
import UserDetailsDialog from "./users/UserDetailsDialog"

const Users = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { users } = useSelector((state) => state.userReducer)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const [selectedUser, setSelectedUser] = useState(null)
  const [openDetails, setOpenDetails] = useState(false)

  useEffect(() => {
    dispatch(asyncUsers())
  }, [dispatch])

  const filteredUsers = users?.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === "all" ? true : u.role === roleFilter
    return matchesSearch && matchesRole
  }) || []

  const handleEditUser = (id) => navigate(`/users/edit/${id}`)
  const handleDeleteUser = async (id) => {
    try {
      await dispatch(asyncDeleteEmployee(id))
      toast({ title: "User deleted", description: "User removed", duration: 1000 })
    } catch (err) {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" })
    }
  }
  const handleUserStatus = async (id, status) => {
    try {
      await dispatch(asyncUserStatus(id, status))
      const message = status === "active" ? "Blocked" : "Unblocked"
      toast({
        title: `User ${message}`,
        description: `The user has been ${message.toLowerCase()} successfully`,
        duration: 1000,
      })
    } catch (err) {
      toast({ title: "Status update failed", description: err.message, variant: "destructive" })
    }
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    // console.log(selectedUser)
    setOpenDetails(true)
  }

  return (
    <div className="px-5 py-3">
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="super_admin">Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AdminTable
        data={filteredUsers}
        columns={userColumns(handleEditUser, handleDeleteUser, handleUserStatus, handleViewUser)}
      />

      <UserDetailsDialog
        open={openDetails}
        onOpenChange={() => setOpenDetails(false)}
        user={selectedUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  )
}

export default Users
