import React, { useState } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import { format, toZonedTime } from "date-fns-tz";
import "./LoanList.css";

const LoanList = ({ loans, onUpdateLoanAmount, onDeleteLoan }) => {
  const timeZone = "America/Los_Angeles";
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  const handleEditClick = (loan) => {
    setEditId(loan.id);
    setEditAmount(loan.loanAmount);
  };

  const handleSaveClick = (id) => {
    onUpdateLoanAmount(id, editAmount);
    setEditId(null);
    setEditAmount("");
  };

  const handleDeleteClick = (id) => {
    onDeleteLoan(id);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="text-center">Full Name</th>
          <th className="text-center">Requested Loan Amount</th>
          <th className="text-center">Approval Status</th>
          <th className="text-center">Created At</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => {
          const zonedDate = toZonedTime(new Date(loan.createdAt), timeZone);
          const formattedDate = format(zonedDate, "yyyy-MM-dd HH:mm:ss", {
            timeZone,
          });

          return (
            <tr key={loan.id}>
              <td className="text-center">{loan.fullName}</td>
              <td className="text-center">
                {editId === loan.id ? (
                  <FormControl
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    disabled={loan.status !== "waiting decision"}
                  />
                ) : (
                  `$${loan.loanAmount}`
                )}
              </td>
              <td className="text-center">
                <span
                  className={`status-label ${loan.status
                    .replace(/\s/g, "-")
                    .toLowerCase()}`}
                >
                  {loan.status}
                </span>
              </td>
              <td className="text-center">
                {loan.createdAt ? formattedDate : "Invalid Date"}
              </td>
              <td className="text-center">
                {loan.status === "waiting decision" && (
                  <>
                    {editId === loan.id ? (
                      <Button
                        variant="success"
                        onClick={() => handleSaveClick(loan.id)}
                        className="mr-2"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="warning"
                        onClick={() => handleEditClick(loan)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(loan.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default LoanList;
