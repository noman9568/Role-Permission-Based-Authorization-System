import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ArrowLeft, Check } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"; 
import { asyncUpdateDepartment } from '@/store/actions/departmentAction'; // Use update action
import { useNavigate, useParams } from 'react-router-dom';

const RequiredLabel = ({ children }) => (
  <span>
    {children}
    <span className="text-red-500 ml-1">*</span>
  </span>
);

const EditDepartment = () => {
  const { departments } = useSelector(state => state.departmentReducer);
  const { users } = useSelector(state => state.userReducer);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { code } = useParams();

  const dept = departments.find(d => d.code === code);

  const [form, setForm] = useState(null); // null until loaded

  // Initialize form when department is loaded
  useEffect(() => {
    if (!dept) return;

    setForm({
      name: dept.name || "",
      code: dept.code || "",
      manager: dept.manager?._id || dept.manager || "",
      isActive: dept.isActive ?? true,
      description: dept.description || "",
    });
  }, [dept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      return toast({ title: "Department name required", variant: "destructive" });
    }
    if (!form.code.trim()) {
      return toast({ title: "Department code required", variant: "destructive" });
    }

    // Dispatch update action
    dispatch(asyncUpdateDepartment(dept._id, form));
    toast({ title: "Department updated", description: "Changes saved successfully" });
    navigate("/departments");
  };

  if (!form) return <div>Loading department data...</div>; // fallback while loading

  return (
    <div className="flex flex-col items-start py-2 px-4">
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
          <CardTitle className="text-2xl">Edit Department</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-x-16">

              {/* Department Name */}
              <div className="flex flex-col gap-2">
                <Label><RequiredLabel>Department Name</RequiredLabel></Label>
                <Input
                  placeholder="Enter department name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Department Code */}
              <div className="flex flex-col gap-2">
                <Label><RequiredLabel>Department Code</RequiredLabel></Label>
                <Input
                  placeholder="Enter department code"
                  value={form.code}
                  onChange={e => setForm({ ...form, code: e.target.value })}
                  disabled // Usually you don't allow editing the code
                />
              </div>

              {/* Manager Select */}
              <div className="flex flex-col gap-2">
                <Label>Manager</Label>
                <Select
                  value={form.manager}
                  onValueChange={value => setForm({ ...form, manager: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl" portal>
                    {users.length > 0 ? (
                      users.map(u => (
                        <SelectItem key={u._id} value={u._id}>
                          {u.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-500">No users available</div>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Active Checkbox */}
              <div className="flex items-center gap-2 mt-4">
                <Checkbox.Root
                  checked={form.isActive}
                  onCheckedChange={value => setForm({ ...form, isActive: value === true })}
                  className="w-5 h-5 border rounded border-gray-300 flex items-center justify-center bg-white data-[state=checked]:bg-blue-600"
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-white" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <Label>Active</Label>
              </div>

              {/* Optional Description */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Optional department description"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                />
              </div>

            </div>

            <Button type="submit" className="w-full bg-zinc-50 rounded-xl mt-4">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDepartment;