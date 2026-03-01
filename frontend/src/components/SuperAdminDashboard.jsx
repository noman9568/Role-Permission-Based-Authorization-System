import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardContent } from "./ui/card";
import { useDispatch, useSelector } from "react-redux";
import { asyncUsers } from "@/store/actions/userAction";
import { asyncDepartments } from "@/store/actions/departmentAction";
import { AdminTable } from "./admins/AdminTable";
import { userColumn } from "./admins/user-column";
import UserDetailsDialog from "./admins/UserDetailsDialog";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { users } = useSelector((state) => state.userReducer);

  const activeUsers = users.filter((u) => u.status === "active");
  const blockedUsers = users.filter((u) => u.status === "blocked");

  useEffect(() => {
    dispatch(asyncUsers()).finally(() => setLoading(false));
    dispatch(asyncDepartments());
  }, [dispatch]);

  useEffect(() => {
    setTableData(users);
  }, [users]);

  return (
    <div className="px-5 flex flex-col gap-10">
      {/* Stats Cards */}
      <div className="w-full py-3 flex gap-20">
        <Card
          onClick={() => setTableData(users)}
          className="w-max pt-2 h-24 pb-4 pl-4 pr-10 flex flex-col gap-1 justify-end hover:bg-zinc-100 cursor-pointer"
        >
          <CardContent className="p-0 text-xl">
            {users.length}
          </CardContent>
          <CardDescription className="text-zinc-500">
            Total Users
          </CardDescription>
        </Card>

        <Card
          onClick={() => setTableData(activeUsers)}
          className="w-max pt-2 h-24 pb-4 pl-4 pr-10 flex flex-col gap-1 justify-end hover:bg-green-50 cursor-pointer"
        >
          <CardContent className="p-0 text-xl">
            {activeUsers.length}
          </CardContent>
          <CardDescription className="text-green-600">
            Active Users
          </CardDescription>
        </Card>

        <Card
          onClick={() => setTableData(blockedUsers)}
          className="w-max pt-2 h-24 pb-4 pl-4 pr-10 flex flex-col gap-1 justify-end hover:bg-red-50 cursor-pointer"
        >
          <CardContent className="p-0 text-xl">
            {blockedUsers.length}
          </CardContent>
          <CardDescription className="text-red-600">
            Blocked Users
          </CardDescription>
        </Card>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <AdminTable
          data={tableData}
          columns={userColumn(setSelectedUser, setOpen)}
        />
      )}

      {/* Dialog */}
      <UserDetailsDialog
        open={open}
        onOpenChange={setOpen}
        user={selectedUser}
      />
    </div>
  );
};

export default SuperAdminDashboard;
