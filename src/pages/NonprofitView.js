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
      .get("http://localhost:5001/api/loans")
      .then((response) =>
        setLoans(response.data.filter((loan) => loan.userId === userId))
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId]);

  const addLoan = (loan) => {
    axios
      .post("http://localhost:5001/api/loans", loan)
      .then((response) => setLoans([...loans, response.data]))
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
