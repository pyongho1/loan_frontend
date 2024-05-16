import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";

const NonprofitView = () => {
  const { userId } = useParams();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/loans/${userId}`)
      .then((response) => {
        console.log("Fetched loans:", response.data); // Debugging line
        setLoans(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId]);

  const addLoan = (loan) => {
    loan.userId = userId; // Add userId to the loan
    axios
      .post("http://localhost:5001/api/loans", loan)
      .then((response) => {
        console.log("Loan added:", response.data); // Debugging line
        setLoans([...loans, response.data]);
      })
      .catch((error) => console.error("Error adding loan:", error));
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
