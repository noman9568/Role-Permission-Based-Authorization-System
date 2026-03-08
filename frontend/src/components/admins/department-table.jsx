import { AlertCircle, Edit } from "lucide-react";

import {
  MoreVertical,
  Trash2,
  Ban,
  CheckCircle
} from "lucide-react"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";


export const departmentColumn = (onStatusChange, onDepartmentEdit) => [
  {
    accessorKey: "department",
    header: "Departments",
    size:50,
    cell: ({ row }) => {
      return (
        // <span>{row.original.code}</span>
      <Link
        to={`/departments/${row.original._id}`}
        className="
          relative
          text-blue-600
          after:absolute
          after:left-0
          after:-bottom-0.5
          after:h-[2px]
          after:w-0
          after:bg-blue-600
          after:transition-all
          after:duration-300
          hover:after:w-full
        "
      >
        {row.original.code}
      </Link>

      )
    }
  },
  {
    accessorKey: "manager",
    header: "Manager",
    size: 100
  },
  {
    assessorKey: "count",
    header: "No. Of Employees",
    size: 60,
    cell: ({ row }) => <span>{row.original.count}</span>
  },
  {
    accessorKey: "isActive",
    header: "Status",
    size:40,
    cell: ({ row }) => {
      const isActive = row.original.isActive;

      return (
        <span className={isActive ? "text-green-500" : "text-red-500"}>
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    }
  },
  {
    id: "actions",
    header: "Actions",
    size: 40,
    cell: ({ row }) => {
      const department = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-4 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44 bg-white">
          
            <DropdownMenuItem
              onClick={() => onDepartmentEdit(department.code)}
              className="cursor-pointer gap-2 data-[highlighted]:bg-zinc-100"
            >
              <Edit className="h-4 w-4 text-zinc-500"/>
              Edit Department
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onStatusChange(department._id)}
              className="cursor-pointer gap-2 data-[highlighted]:bg-zinc-100"
            >
              {!department.isActive ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Unblock Department
                </>
              ) : (
                <>
                  <Ban className="h-4 w-4 text-yellow-600" />
                  Block Department
                </>
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              // onClick={() => onDelete(user._id)}
              className="cursor-pointer gap-2 text-red-600 
                        data-[highlighted]:bg-red-50 
                        data-[highlighted]:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Delete Department
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

      )
    },
  }
]