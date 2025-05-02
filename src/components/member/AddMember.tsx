import {Modal,Button,Form,FloatingLabel} from "react-bootstrap";
import { useState } from "react";
interface Member {
  memberId:string;
  name:string;
  email:string;
  membershipDate:string;
}

function AddMember({
  show,
  handleOnClose,
  handleAdd,
  addMember
}: any) {
  //state management
  const [newMember,setNewMember] = useState<Member>({
    memberId: "",
    name: "",
    email: "",
    membershipDate: "", 
  });  

   // add book data from the form
   const handleOnChange = (e :React.ChangeEvent<HTMLInputElement>)=>{
        const { name ,value} = e.target;
        setNewMember((prev) => ({...prev,[name]: value}))  
      
      }
   //handle the add book process with the back-end
   const handleOnSubmit = async () =>{
       try{
        const newMemberDetails = await addMember(newMember);
        handleAdd(newMemberDetails)
        handleOnClose()
       }catch(err){
           console.error("Failed to update the member",err)
       }        
   }
   const createFormElement = (label:string, name:keyof Member, type="text") =>(
    <FloatingLabel controlId="floatingInput" label={label}className="mb-3">
      <Form.Control 
        type={type}
        name={name}
        value={newMember[name]}
        onChange={handleOnChange}
      />
    </FloatingLabel>
   );

  return (
    <Modal show={show} onHide={handleOnClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form */}
        <Form>
          {createFormElement("Name","name","text")}
          {createFormElement("Email","email","text")}
          {createFormElement("Membership Date","membershipDate","date")}
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleOnClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMember;
