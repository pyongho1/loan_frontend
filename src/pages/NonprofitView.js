import React, { useState, useEffect } from "react";
import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";

const NonprofitView = ({ userId }) => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("/api/loans")
      .then((response) => response.json())
      .then((data) => setLoans(data.filter((loan) => loan.userId === userId)));
  }, [userId]);

  const addLoan = (loan) => {
    fetch("/api/loans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loan),
    })
      .then((response) => response.json())
      .then((newLoan) => setLoans([...loans, newLoan]));
  };

  return (
    <div>
      <h2>Nonprofit View</h2>
      <LoanForm onSubmit={addLoan} />
      <LoanList loans={loans} />
    </div>
  );
};

export default NonprofitView;
