import React from "react";
import { AlertCircle } from "lucide-react";

export const userColumn = (setSelectedUser, setOpen) => [
  {
    id: "alert",
    header: "",
    cell: ({ row }) => {
      const user = row.original;
      const status = user.status;

      let colourClass = "text-green-500";
      if (status === "blocked") colourClass = "text-red-500";

      return (
        <div className="flex justify-center">
          <AlertCircle
            className={`w-4 h-4 ${colourClass} cursor-pointer hover:scale-110 transition`}
            onClick={() => {
              setSelectedUser(user);
              setOpen(true);
            }}
          />
        </div>
      );
    },
    size: 20,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 100,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 80,
    cell: ({ row }) => (
      <span
        className={
          row.original.status === "active"
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {row.original.status === "active" ? "Active" : "Blocked"}
      </span>
    ),
  },
];
