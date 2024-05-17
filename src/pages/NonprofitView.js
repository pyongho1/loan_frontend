import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NonprofitView = () => {
  const { userId } = useParams();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/loans/${userId}`)
      .then((response) => {
        console.log("Fetched loans:", response.data);
        setLoans(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId]);

  const addLoan = (loan) => {
    loan.userId = userId;
    axios
      .post("http://localhost:5001/api/loans", loan)
      .then((response) => {
        console.log("Loan added:", response.data);
        setLoans([response.data, ...loans]);
      })
      .catch((error) => console.error("Error adding loan:", error));
  };

  const updateLoanAmount = (id, loanAmount) => {
    axios
      .put(`http://localhost:5001/api/loans/${id}/amount`, { loanAmount })
      .then((response) => {
        setLoans(
          loans.map((loan) =>
            loan.id === id
              ? { ...loan, loanAmount: response.data.loanAmount }
              : loan
          )
        );
      })
      .catch((error) => console.error("Error updating loan amount:", error));
  };

  const deleteLoan = (id) => {
    axios
      .delete(`http://localhost:5001/api/loans/${id}`)
      .then(() => {
        setLoans(loans.filter((loan) => loan.id !== id));
      })
      .catch((error) => console.error("Error deleting loan:", error));
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2>Nonprofit View</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Add a New Loan</Card.Title>
              <LoanForm onSubmit={addLoan} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Submitted Loans</h3>
          <LoanList
            loans={loans}
            onUpdateLoanAmount={updateLoanAmount}
            onDeleteLoan={deleteLoan}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default NonprofitView;
