import React, { useState } from "react";

const LoanForm = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fullName, loanAmount, status: "waiting decision" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Requested Loan Amount</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanForm;
