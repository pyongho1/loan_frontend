import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container">
      <h2 className="my-4">Admin View</h2>
      <div className="row">
        {loans
          .filter((loan) => loan.status === "waiting decision")
          .map((loan) => (
            <div key={loan.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{loan.fullName}</h5>
                  <p className="card-text">
                    Requested Loan Amount: ${loan.loanAmount}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success"
                      onClick={() => updateStatus(loan.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => updateStatus(loan.id, "denied")}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminApprove;
