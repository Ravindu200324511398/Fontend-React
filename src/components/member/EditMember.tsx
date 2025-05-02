import {Modal,Button,Form,FloatingLabel} from "react-bootstrap";
import { useState, useEffect } from "react";
interface Member {
  memberId:string;
  name:string;
  email:string;
  membershipDate:string;
}
interface MemberEditProps {
  show: boolean;
  selectedRow: Member | null;
  handleClose: () => void;
  handleUpdate: (updateMembers: Member) => void;
  updateMembers : (member : Member) => Promise<void>
}

function EditMember({
  show,
  selectedRow,
  handleClose,
  handleUpdate,
  updateMembers
}: MemberEditProps) {
  //state management
  const [member,setMember] = useState<Member>({
    memberId: "",
    name: "",
    email: "",
    membershipDate: ""

  });  

  //need load the data when component mounted
   useEffect(()=>{
       if(selectedRow){
        setMember({...selectedRow})
       }
   },[selectedRow]);

   // add book data from the form
   const handleOnChange = (e :React.ChangeEvent<HTMLInputElement>)=>{
    setMember({ ... member,[e.target.name]: e.target.value})
   }
   //handle the update process
   const handleSave = async () =>{
       try{
        await updateMembers(member);
        handleUpdate(member)
        handleClose()
       }catch(err){
           console.error("Failed to update the book",err)
       }        
   }
  // handle the repeat of FloatingLabel
  const renderFloatingTable = (label:string, name:keyof Member, type="text",readOnly = false) =>
    (
    <FloatingLabel controlId="floatingInput" label={label}className="mb-3">
      <Form.Control 
      type={type}
      name={name}
      value={member[name]}
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
          {renderFloatingTable("Member Id","memberId","text",true)}
          {renderFloatingTable("Name","name")}
          {renderFloatingTable("Email","email")}
          {renderFloatingTable("Membership Date","membershipDate")}
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

export default EditMember;
