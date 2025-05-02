import { useEffect, useState } from "react";
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

interface LendingProps {
  show: boolean;
  selectedrow: Lending | null;
  handleonclose: () => void;
  updateLendings: (lending: Lending) => Promise<void>;
  handleupdatestate: (lending: Lending) => void;
}

export const LendingEdit = ({ show, selectedrow, handleonclose, updateLendings, handleupdatestate }: LendingProps) => {
  const [lending, setLending] = useState<Lending>({
    lendingId: "",
    book: "",
    member: "",
    lendingDate: "",
    returnDate: "",
    isActiveLending: "",
    overdueDays: "",
    fineAmount: "",
  });

  useEffect(() => {
    if (selectedrow) {
      setLending({ ...selectedrow });
    }
  }, [selectedrow]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLending((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateLendings(lending);
      handleupdatestate(lending);
      handleonclose();
    } catch (err) {
      console.error("Error updating lending:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleonclose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Lending</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FloatingLabel controlId="floatingInput" label="Lending Id" className="mb-3">
            <Form.Control type="text" name="lendingId" value={lending.lendingId} readOnly />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Book Id" className="mb-3">
            <Form.Control type="text" name="book" value={lending.book} onChange={handleOnChange} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Member Id" className="mb-3">
            <Form.Control type="text" name="member" value={lending.member} onChange={handleOnChange} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Lending Date" className="mb-3">
            <Form.Control type="text" name="lendingDate" value={lending.lendingDate} onChange={handleOnChange} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Return Date" className="mb-3">
            <Form.Control type="text" name="returnDate" value={lending.returnDate} onChange={handleOnChange} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Is Active Lending" className="mb-3">
            <Form.Control type="text" name="isActiveLending" value={lending.isActiveLending} onChange={handleOnChange} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Overdue Days" className="mb-3">
            <Form.Control type="text" name="overdueDays" value={lending.overdueDays} onChange={handleOnChange} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Fine Amount" className="mb-3">
            <Form.Control type="text" name="fineAmount" value={lending.fineAmount} onChange={handleOnChange} />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleonclose}>Close</Button>
        <Button variant="success" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};
