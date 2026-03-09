import { AlertCircle, Edit, Trash2, Circle, Shield, Briefcase, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"

export const userColumns = (onUserEdit, onDelete, onStatusChange, onView) => [
  {
    id: "alert",
    header: "",
    size: 20,
    cell: ({ row }) => {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      const user = row.original;

      const isActionDisabled = loggedUser.role !== "super_admin" && user.role === "super_admin";
      const color = user.status === "active" ? "text-green-500" : "text-red-500";

      return (
        !isActionDisabled && (
        <div className="flex justify-center">
          <AlertCircle
            className={`w-4 h-4 cursor-pointer ${color} hover:scale-110 transition`}
            onClick={() => onView(user)}
          />
        </div>
        )
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 80
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 150
  },
  {
    accessorKey: "gender",
    header: "Gender",
    size: 60
  },
  {
    accessorKey: "department",
    header: "Dept.",
    size: 40,
    cell: ({ row }) => <span>{row.original.department?.code}</span>
  },
  {
    accessorKey: "role",
    header: "Role",
    size: 80,
    cell: ({ row }) => <span className="capitalize font-medium">{row.original.role.replace("_", " ")}</span>
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 60,
    cell: ({ row }) => (
      <span className={row.original.status === "active" ? "text-green-600" : "text-red-600"}>
        {row.original.status === "active" ? "Active" : "Blocked"}
      </span>
    )
  },
  {
    id: "actions",
    header: "Actions",
    size: 40,
    cell: ({ row }) => {
      const loggedUser = JSON.parse(localStorage.getItem("user"))
      const user = row.original
      const isActionDisabled = loggedUser.role !== "super_admin" && user.role === "super_admin"

      return (
        !isActionDisabled && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-white">
              <DropdownMenuItem
                onClick={() => onUserEdit(user._id)}
                className="cursor-pointer gap-2 data-[highlighted]:bg-zinc-100"
              >
                <Edit className="h-4 w-4 text-zinc-500" />
                Edit User
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onStatusChange(user._id, user.status)}
                className="cursor-pointer gap-2 data-[highlighted]:bg-zinc-100"
              >
                {user.status === "blocked" ? (
                  <>
                    <Circle className="h-4 w-4 text-green-600" />
                    Unblock User
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4 text-yellow-600" />
                    Block User
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onDelete(user._id)}
                className="cursor-pointer gap-2 text-red-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      )
    }
  }
]
