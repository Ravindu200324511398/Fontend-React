import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import EditStaff from './EditStaff';
import AddStaff from './AddStaff';
import { AddStaffData, DeleteStaff, GetStaff, UpdateStaff } from '../../service/StaffData';
import { useLocation } from 'react-router';
import styles from "./staffstyle.module.css"

export function StaffConsole(){

  interface Staff {
  staffId: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  phone: string;
  role: string;
  }
  //Change Role as enum

  const [staffData,setStaffData] = useState<Staff[]>([])
  const [selectedRow,setSelectedRow] = useState<Staff |null>(null)
  const [showEditStaffForm,setShowEditStaffForm] = useState(false) // handle show the edit member form
  const [showAddStaffForm,setShowAddStaffForm] = useState(false) // handle show the add memnber form

   //add useEffect to load table data
   useEffect(()=>{
     const laodData = async () =>{
        const staffDetails = await GetStaff()
        console.log(staffDetails)
        setStaffData(staffDetails)
     };
     laodData();
   },[]) 

   const tHeads: string [] = [
      "Staff Id",
      "First Name",
      "Last Name",
      "Email",
      "Join Date",
      "Last Update Date",
      "Last Update Time",
      "Phone",
      "Role",
      "Action"
   ];
   //handle edit function
   const handleEdit = (row : Staff) =>{
     console.log("handle Edit",row)
     setSelectedRow(row)
     setShowEditStaffForm(true)
   }

   const handleClose = () =>  setShowEditStaffForm(false);
   const handleUpdate = (updatedStaff : Staff) => {
     const updateFinalziedStaff = staffData.map((staff) =>
     staff.staffId === updatedStaff.staffId ? updatedStaff : staff
     );
     setStaffData(updateFinalziedStaff)
   }
   //handle delete
   const handleDelete = async (staffId:string) =>{
    try{
      await DeleteStaff(staffId)
      setStaffData(staffData.filter((staff)=> staff.staffId !== staffId)) 
    }catch(err){
      console.error("Delete staff member failed with ",err)
    } 
  
   }
   const handleAdd = (newStaff :Staff) =>{
    setStaffData((prevData) => [...prevData,newStaff])
   }

   //get location of current route
  //  const location = useLocation();
  //  const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home";
  //  const formattedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1, -1) + " Console";


return (
<>
<div className="d-flex justify-content-end p-3">
  <Button variant="outline-primary" onClick={() => setShowAddStaffForm(true)}>Add Staff</Button>  
</div>
      <p className={styles.staffTitle}>Staff Console</p>
    <Table striped bordered hover>
      <thead>
        <tr>
            {tHeads.map((headings) =>(
                <th>{headings}</th>
            ))}
        </tr>
      </thead>
      <tbody>
              {staffData.map((row)=> (
                   <tr key={row.staffId}>
                   {Object.values(row).map((cell,index) =>(
                     <td key={index}>{cell}</td>
                   ))}
                   <td>
                     <div className="d-flex gap-2">
                          <Button variant="outline-success" onClick={() =>  handleEdit(row)}>Edit</Button>  
                          <Button variant="outline-danger" onClick={() => handleDelete(row.staffId)}>Delete</Button>  
                    </div>
                   </td>
                    
                  </tr>  
              ))}
      </tbody>
    </Table>
    <EditStaff
    show = {showEditStaffForm}
    selectedRow = {selectedRow}
    handleClose = {handleClose}
    handleUpdate = {handleUpdate}
    updateStaff = {UpdateStaff}
    />
    <AddStaff
      show={showAddStaffForm}
      handleOnClose={() => setShowAddStaffForm(false)} //pass the function as prop
      handleAdd = {handleAdd}
      addStaff={AddStaffData}
    />
</>
    )
}