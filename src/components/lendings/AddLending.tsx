import { useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";

interface Lending {
  lendingId: string;
  book: string;
  member: string;
  lendingDate: string;
  returnDate: string;
  isActiveLending: string;
  overdueDays: string;
  fineAmount: string;
}

export const AddLending = ({ show, handleClose, handleAdd, addLending }: any) => {
  const [newLending, setNewLending] = useState<Lending>({
    lendingId: "",
    book: "",
    member: "",
    lendingDate: "",
    returnDate: "",
    isActiveLending: "",
    overdueDays: "",
    fineAmount: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLending((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const lendingDetails = await addLending(newLending);
      handleAdd(lendingDetails);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Lending</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel label="Book Id" className="mb-3">
            <Form.Control type="text" name="book" value={newLending.book} onChange={handleOnChange} />
          </FloatingLabel>
          <FloatingLabel label="Member Id" className="mb-3">
            <Form.Control type="text" name="member" value={newLending.member} onChange={handleOnChange} />
          </FloatingLabel>
          {/* You can add more fields later like lendingDate, returnDate, etc. */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};
