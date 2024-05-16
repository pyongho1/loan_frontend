import React from "react";

const LoanList = ({ loans }) => (
  <table>
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Requested Loan Amount</th>
        <th>Approval Status</th>
      </tr>
    </thead>
    <tbody>
      {loans.map((loan) => (
        <tr key={loan.id}>
          <td>{loan.fullName}</td>
          <td>{loan.loanAmount}</td>
          <td>{loan.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default LoanList;
