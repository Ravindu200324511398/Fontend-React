import {Modal,Button,Form,FloatingLabel} from "react-bootstrap";
import { useState, useEffect } from "react";

interface Staff {
  staffId: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  phone: string;
  role: string;
  }

interface StaffEditProps {
  show: boolean;
  selectedRow: Staff | null;
  handleClose: () => void;
  handleUpdate: (updateStaff: Staff) => void;
  updateStaff : (staff : Staff) => Promise<void>
}

function EditStaff({
  show,
  selectedRow,
  handleClose,
  handleUpdate,
  updateStaff
}: StaffEditProps) {
  //state management
  const [staff,setStaff] = useState<Staff>({
    staffId: "",
    firstName: "",
    lastName: "",
    email: "",
    joinDate: "",
    phone: "",
    role: ""

  });  

  //need load the data when component mounted
   useEffect(()=>{
       if(selectedRow){
        setStaff({...selectedRow})
       }
   },[selectedRow]);

   // add book data from the form
   const handleOnChange = (e :React.ChangeEvent<HTMLInputElement>)=>{
    setStaff({ ... staff,[e.target.name]: e.target.value})
   }
   //handle the update process
   const handleSave = async () =>{
       try{
        await updateStaff(staff);
        handleUpdate(staff)
        handleClose()
       }catch(err){
           console.error("Failed to update the book",err)
       }        
   }
  // handle the repeat of FloatingLabel
  const renderFloatingTable = (label:string, name:keyof Staff, type="text",readOnly = false) =>
    (
    <FloatingLabel controlId="floatingInput" label={label}className="mb-3">
      <Form.Control 
      type={type}
      name={name}
      value={staff[name]}
      onChange={handleOnChange}
      readOnly={readOnly}
      />
    </FloatingLabel>
    );
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form */}
        <Form>
          {renderFloatingTable("Member Id","staffId","text",true)}
          {renderFloatingTable("First Name","firstName")}
          {renderFloatingTable("Last Name","lastName")}
          {renderFloatingTable("Email","email")}
          {renderFloatingTable("Join Date","joinDate")}
          {renderFloatingTable("Phone","phone")}
          {renderFloatingTable("Role","role")}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditStaff;
