import React from "react";
import { Table } from "react-bootstrap";
import "./LoanList.css"; // Import the CSS file for custom styles

const LoanList = ({ loans }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Requested Loan Amount</th>
        <th>Approval Status</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      {loans.map((loan) => (
        <tr key={loan.id}>
          <td>{loan.fullName}</td>
          <td>${loan.loanAmount}</td>
          <td>
            <span
              className={`status-label ${loan.status
                .replace(/\s/g, "-")
                .toLowerCase()}`}
            >
              {loan.status}
            </span>
          </td>
          {/* <td>{new Date(loan.createdAt).toLocaleString()}</td>{" "} */}
          <td>
            {loan.createdAt
              ? new Date(loan.createdAt).toLocaleString()
              : "Invalid Date"}
          </td>{" "}
          {/* Display the createdAt field */}
          {/* Display the createdAt field */}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default LoanList;
