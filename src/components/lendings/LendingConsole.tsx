import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { DeleteLendings, GetLendings, UpdateLendings, AddLendingData } from '../../service/GetLendings';
import { Button } from 'react-bootstrap';
import {LendingEdit} from './LendingEdit';
import { Form, Modal, FloatingLabel } from "react-bootstrap";
import {AddLending} from './AddLending';
import styles from "./lendingstyle.module.css"

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

const LendingsConsole = () => {
  const [lendings, setLendings] = useState<Lending[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Lending | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

 const handleOnEdit = (row: Lending) => {
    setShowEditForm(true);
    setSelectedRow(row);
  };

  const handleOnDelete = async (lendingId: string) => {
    try {
      await DeleteLendings(lendingId);
      setLendings(lendings.filter((lending) => lending.lendingId !== lendingId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateState = (updatedLending: Lending) => {
    const updatedLendings = lendings.map((lending) =>
      lending.lendingId === updatedLending.lendingId ? updatedLending : lending
    );
    setLendings(updatedLendings);
  };

  const handleCloseModal = () => {
    setShowEditForm(false);
    setSelectedRow(null);
  };

  const handleAdd = (newLending: Lending) => {
    setLendings((prev) => [...prev, newLending]);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const lendingsDetails = await GetLendings();
        if (Array.isArray(lendingsDetails)) {
          setLendings(lendingsDetails);
        } else {
          console.error("Unexpected data format:", lendingsDetails);
        }
      } catch (err) {
        console.error("Error loading members:", err);
      }
    };

    loadData();
  }, []);

  return (

    <>
      <div className="d-flex justify-content-end p-3">
        <Button variant="outline-primary" onClick={() => setShowAddForm(true)}>Add Lending</Button>
      </div>
      <div>
        <p className={styles.lendingTitle}>Lending Console</p>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {["LendingId", "BookId", "MemberId", "Lending Date","Return Date","Is Active Lending","Overdue Days","Fine Amount", "Options"].map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lendings.map((row) => (
            <tr key={row.lendingId}>
              <td>{row.lendingId}</td>
              <td>{row.book}</td>
              <td>{row.member}</td>
              <td>{row.lendingDate}</td>
              <td>{row.returnDate}</td>
              <td>{row.isActiveLending}</td>
              <td>{row.overdueDays}</td>
              <td>{row.fineAmount}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="outline-success" onClick={() => handleOnEdit(row)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleOnDelete(row.lendingId)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <LendingEdit
        show={showEditForm}
        selectedrow={selectedRow}
        handleonclose={handleCloseModal}
        updateLendings={UpdateLendings}
        handleupdatestate={handleUpdateState}
      />

      <AddLending
        show={showAddForm}
        handleClose={() => setShowAddForm(false)}
        handleAdd={handleAdd}
        addLending={AddLendingData}
      />
    </>
  );
};
export default LendingsConsole;

