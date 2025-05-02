import {Modal,Button,Form,FloatingLabel} from "react-bootstrap";
import { useState, useEffect } from "react";
interface Book {
  bookId: string;
  bookName: string;
  author: string;
  edition: string;
  publisher: string;
  isbn: string;
  price: number;
  totalQty: number;
  avilableQty: number;
}
interface BookEditProps {
  show: boolean;
  selectedRow: Book | null;
  handleClose: () => void;
  handleUpdate: (updatedBook: Book) => void;
  updateBooks : (book : Book) => Promise<void>
}

function EditBook({
  show,
  selectedRow,
  handleClose,
  handleUpdate,
  updateBooks
}: BookEditProps) {
  //state management
  const [book,setBook] = useState<Book>({
    bookId: "",
    bookName: "",
    author: "",
    edition: "",
    publisher: "",
    isbn: "",
    price: 0,
    totalQty: 0,
    avilableQty: 0

  });  

  //need load the data when component mounted
   useEffect(()=>{
       if(selectedRow){
           setBook({...selectedRow})
       }
   },[selectedRow]);

   // add book data from the form
   const handleOnChange = (e :React.ChangeEvent<HTMLInputElement>)=>{
        setBook({ ... book,[e.target.name]: e.target.value})
   }
   //handle the update process
   const handleSave = async () =>{
       try{
        await updateBooks(book);
        handleUpdate(book)
        handleClose()
       }catch(err){
           console.error("Failed to update the book",err)
       }        
   }
  // handle the repeat of FloatingLabel
  const renderFloatingTable = (label:string, name:keyof Book, type="text",readOnly = false) =>
    (
    <FloatingLabel controlId="floatingInput" label={label}className="mb-3">
      <Form.Control 
      type={type}
      name={name}
      value={book[name]}
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
          {renderFloatingTable("Book Id","bookId","text",true)}
          {renderFloatingTable("Book Name","bookName")}
          {renderFloatingTable("Author","author")}
          {renderFloatingTable("Edition","edition")}
          {renderFloatingTable("Publisher","publisher")}
          {renderFloatingTable("ISBN","isbn")}
          {renderFloatingTable("Price","price")}
          {renderFloatingTable("Total Qty","totalQty","number")}
          {renderFloatingTable("Available Qty","avilableQty","number")}
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

export default EditBook;
