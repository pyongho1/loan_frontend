import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const LoanForm = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fullName, loanAmount, status: "waiting decision" });
    setFullName("");
    setLoanAmount("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formLoanAmount" className="mt-3">
        <Form.Label>Requested Loan Amount</Form.Label>
        <Form.Control
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default LoanForm;
