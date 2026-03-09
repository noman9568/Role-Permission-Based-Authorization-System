import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { departmentColumn } from './admins/department-table';
import { AdminTable } from './admins/AdminTable';
import { useNavigate } from 'react-router-dom';
import { asyncDeleteDepartment, asyncDepartments, asyncDepartmentStatus } from '@/store/actions/departmentAction';
import { useToast } from '@/hooks/use-toast';
import { asyncUsers } from '@/store/actions/userAction';


const Departments = () => {
  const { departments } = useSelector(state => state.departmentReducer);
  const { users } = useSelector(state => state.userReducer);
  // console.log("dept :", departments);
  // console.log("user : ", users);
  
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast()

  useEffect(() => {
    if (users.length === 0) {
      dispatch(asyncUsers());
    }
    if (departments.length === 0) {
      dispatch(asyncDepartments());
    }
  }, [users.length, departments.length, dispatch]);


  const departmentEmployeeCount = React.useMemo(() =>{
    return users.reduce((acc, user) => {
      const deptId = user.department?._id;
      if (deptId) {
        acc[deptId] = (acc[deptId] || 0) + 1;
      }
      return acc;
    }, {});
  }, [users]);


  const modifiedDepartment = React.useMemo(() =>{
    return departments.map(dept => {
    const mgr =  users.find((u => u._id===dept.manager));
    
    return {
      ...dept,
      manager : mgr ? mgr.name : "Not Assigned",
      count: departmentEmployeeCount[dept._id] || 0
    };
  });
}, [departments, users, departmentEmployeeCount])
  // console.log(modifiedDepartment);
  // console.log(users.map(u => ({ name: u.name, id: u._id })))


  const handleDepartmentStatus = async (id) =>{
    try{
      await dispatch(asyncDepartmentStatus(id));
      toast({
        title: "Success",
        description: "Department Blocked successfully!",
        duration: 1000
      });
      
    } catch(err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handleEditDepartment = (code) => navigate(`/departments/${code}/edit`);
  const handleDeleteDepartment = async (id) => {
    try{
      await dispatch(asyncDeleteDepartment(id));
      toast({
        title: "Success",
        description: "Department deleted successfully!",
        duration: 1000
      });
    }
    catch(err){
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
    
  }
  
  
  return (
    <div className='px-5 py-2'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl border-b">Manage Departments</h1>

        <button
          onClick={() => navigate("/departments/register")}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Add Department
        </button>
      </div>
      <AdminTable
        data={modifiedDepartment}
        columns={departmentColumn(
          (id) => handleDepartmentStatus(id),
          (code) => handleEditDepartment(code),
          (id) => handleDeleteDepartment(id)
        )}
      />
      {/* <button onClick={() => handleEditDepartment("IT")}>Click to edit</button> */}
    </div>
  )
}

export default Departments
