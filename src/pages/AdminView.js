import React, { useState, useEffect } from "react";
import LoanList from "../components/LoanList";

const AdminView = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("/api/loans")
      .then((response) => response.json())
      .then((data) => setLoans(data));
  }, []);

  const updateStatus = (id, status) => {
    fetch(`/api/loans/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(() =>
      setLoans(
        loans.map((loan) => (loan.id === id ? { ...loan, status } : loan))
      )
    );
  };

  return (
    <div>
      <h2>Admin View</h2>
      <LoanList loans={loans} />
      <div>
        {loans
          .filter((loan) => loan.status === "waiting decision")
          .map((loan) => (
            <div key={loan.id}>
              <span>
                {loan.fullName} - {loan.loanAmount}
              </span>
              <button onClick={() => updateStatus(loan.id, "approved")}>
                Approve
              </button>
              <button onClick={() => updateStatus(loan.id, "denied")}>
                Deny
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminView;
