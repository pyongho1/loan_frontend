import React, { useState, useEffect } from "react";
import axios from "axios";
// import LoanList from "../components/LoanList";

const AdminApprove = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/loans")
      .then((response) => setLoans(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const updateStatus = (id, status) => {
    axios
      .put(`http://localhost:5001/api/loans/${id}/status`, { status })
      .then(() =>
        setLoans(
          loans.map((loan) => (loan.id === id ? { ...loan, status } : loan))
        )
      )
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div>
      <h2>Admin View</h2>
      {/* <LoanList loans={loans} /> */}
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

export default AdminApprove;
