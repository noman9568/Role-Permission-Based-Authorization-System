import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { AdminTable } from './admins/AdminTable';
import { selectedDepartmentColumn } from './admins/selectedDepartment-column';
import { asyncUsers } from '@/store/actions/userAction';
import { asyncDepartments } from '@/store/actions/departmentAction';
import { ArrowLeft } from 'lucide-react';



const SelectedDepartment = () => {
  const { id } = useParams();
  const { departments } = useSelector(state => state.departmentReducer);
  const { users } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
  if (!users || users.length === 0) {
    dispatch(asyncUsers());
  }

  if (!departments || departments.length === 0) {
    dispatch(asyncDepartments());
  }
}, []);



  const dept = departments.find(u => u._id == id);
  if(!dept){
    return <div className="px-5 py-2">Loading department...</div>;
  }
  // console.log(dept);

  // const filteredUsers = users ? users.filter(u => u.department?._id === dept._id) : [] ;
  // manager appears first
  const filteredUsers = users
  ? users
      .filter(u => u.department?._id === dept._id)
      .sort((a, b) => {
        if (a.role === "manager") return -1;
        if (b.role === "manager") return 1;
        return 0;
      })
  : [];
  // console.log(filteredUsers);
  

  return (
    <div className='px-5 py-2'>
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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl border-b">{`${dept.code} Department`}</h1>

        <button
          onClick={() => navigate(`/departments/${id}/employee_register`)}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Register Employees
        </button>
      </div>
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500">No users found in this department.</p>
      ) : (
        <AdminTable
          data={filteredUsers}
          columns={selectedDepartmentColumn}
          getRowClassName={(row) =>
            row.role === "manager"
              ? "bg-red-50 border-l-4 border-red-400 hover:bg-blue-100"
              : ""
          }
        />
      )}

    </div>
  )
}

export default SelectedDepartment
