import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import EditMember from './EditMember';
import Addmember from './AddMember';
import { AddMemberData, DeleteMember, GetMembers, UpdateMember } from '../../service/MemberData';
import { useLocation } from 'react-router';
import styles from "./memberstyle.module.css"

export function MemberConsole(){

  interface Member {
    memberId:string;
    name:string;
    email:string;
    membershipDate:string;
  }

  const [memberData,setMemberData] = useState<Member[]>([])
  const [selectedRow,setSelectedRow] = useState<Member |null>(null)
  const [showEditMemberForm,setShowEditMemberForm] = useState(false) // handle show the edit member form
  const [showAddMemberForm,setShowAddMemberForm] = useState(false) // handle show the add memnber form

   //add useEffect to load table data
   useEffect(()=>{
     const laodData = async () =>{
        const memberDetails = await GetMembers()
        console.log(memberDetails)
        setMemberData(memberDetails)
     };
     laodData();
   },[]) 

   const tHeads: string [] = [
      "Member Id",
      "Name",
      "Email",
      "Member Ship Date",
      "Action"
   ];
   //handle edit function
   const handleEdit = (row : Member) =>{
     console.log("handle Edit",row)
     setSelectedRow(row)
     setShowEditMemberForm(true)
   }

   const handleClose = () =>  setShowEditMemberForm(false);
   const handleUpdate = (updatedMember : Member) => {
     const updateFinalziedMember = memberData.map((member) =>
        member.memberId === updatedMember.memberId ? updatedMember : member
     );
     setMemberData(updateFinalziedMember)
   }
   //handle delete
   const handleDelete = async (memberId:string) =>{
    try{
      await DeleteMember(memberId)
      setMemberData(memberData.filter((member)=> member.memberId !== memberId)) 
    }catch(err){
      console.error("Delete book failed with ",err)
    } 
  
   }
   const handleAdd = (newMember :Member) =>{
    setMemberData((prevData) => [...prevData,newMember])
   }
  //  const location = useLocation();
  //  const routeName = location.pathname.split("/").filter(Boolean).pop() || "Home";
  //  const formattedTitle = routeName.charAt(0).toUpperCase() + routeName.slice(1, -1) + " Console";

    return (
<>
<div className="d-flex justify-content-end p-3">
  <Button variant="outline-primary" onClick={() => setShowAddMemberForm(true)}>Add Member</Button>  
</div>
      <p className={styles.memberTitle}>Member Console</p>
    <Table striped bordered hover>
      <thead>
        <tr>
            {tHeads.map((headings) =>(
                <th>{headings}</th>
            ))}
        </tr>
      </thead>
      <tbody>
              {memberData.map((row)=> (
                   <tr key={row.memberId}>
                   {Object.values(row).map((cell,index) =>(
                     <td key={index}>{cell}</td>
                   ))}
                   <td>
                     <div className="d-flex gap-2">
                          <Button variant="outline-success" onClick={() =>  handleEdit(row)}>Edit</Button>  
                          <Button variant="outline-danger" onClick={() => handleDelete(row.memberId)}>Delete</Button>  
                    </div>
                   </td>
                    
                  </tr>  
              ))}
      </tbody>
    </Table>
    <EditMember
    show = {showEditMemberForm}
    selectedRow = {selectedRow}
    handleClose = {handleClose}
    handleUpdate = {handleUpdate}
    updateMembers = {UpdateMember}
    />
    <Addmember
      show={showAddMemberForm}
      handleOnClose={() => setShowAddMemberForm(false)} //pass the function as prop
      handleAdd = {handleAdd}
      addMember={AddMemberData}
    />
</>
    )
}