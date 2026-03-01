import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import {
  User,
  Mail,
  ShieldCheck,
  AlertCircle,
  CalendarDays,
} from "lucide-react";
import { Button } from "../ui/button";

const UserDetailsDialog = ({ open, onOpenChange, onEdit, onDelete, user }) => {
  if (!user) return null;

  const statusColor =
    user.status === "active"
      ? "text-green-600"
      : "text-red-600";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm !rounded-xl overflow-hidden border shadow-lg px-5 py-4 bg-white">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600 w-5 h-5" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-semibold leading-tight truncate">
              {user.name}
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="mt-3 space-y-2 text-sm">

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span className="text-slate-500">Role</span>
            <span className="ml-auto font-medium capitalize">
              {user.role}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <AlertCircle className={`w-4 h-4 ${statusColor}`} />
            <span className="text-slate-500">Status</span>
            <span className={`ml-auto font-medium capitalize ${statusColor}`}>
              {user.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="w-4 h-4 text-slate-500" />
            <span className="text-slate-500">Joined</span>
            <span className="ml-auto font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-slate-500" />
            <span className="text-slate-500">Email</span>
            <span className="ml-auto font-medium truncate max-w-[140px]">
              {user.email}
            </span>
          </div>
          <div className="flex justify-between w-[60%] m-auto pt-3">

            <button className="relative px-4 py-1.5 rounded-xl bg-zinc-200 font-medium overflow-hidden transition-colors duration-300 hover:bg-zinc-100" onClick={() => onEdit(user._id)}>
              <span className="relative z-10">Edit</span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>

            <button className="relative px-4 py-1.5 rounded-xl bg-red-500 text-white font-medium overflow-hidden transition-all duration-300 hover:bg-red-600 focus:outline-none" onClick={() => {onDelete(user._id); onOpenChange(false)}}>
              <span className="relative z-10">Delete</span>
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
            </button>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
