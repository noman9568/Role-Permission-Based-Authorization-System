export const selectedDepartmentColumn = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      const isManager = user.role === "manager";

      return (
        <span className={isManager ? "font-semibold text-blue-700" : ""}>
          {user.name}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const isManager = row.original.role === "manager";

      return (
        <span
          className={
            isManager
              ? "text-blue-700 px-2 py-1 font-medium"
              : "capitalize px-2 py-1"
          }
        >
          {row.original.role}
        </span>
      );
    },
  },
];