import React, { useState, useEffect } from "react";
import axios from "axios";
import LoanList from "../components/LoanList";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "./AdminView.css";

const AdminView = () => {
  const [loans, setLoans] = useState([]);
  const [filter, setFilter] = useState("all"); // State to track current filter

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/loans")
      .then((response) => setLoans(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filter loans based on the current filter state
  const filteredLoans = loans.filter((loan) => {
    if (filter === "all") return true;
    return loan.status === filter;
  });

  return (
    <Container>
      <h2 className="mt-4">Overview</h2>
      <Form className="my-4">
        <FormControl type="text" placeholder="Search loan" />
      </Form>
      <Row className="mb-4">
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => handleFilterChange("all")}
          >
            All loans
          </Button>
          <Button
            variant="outline-secondary"
            className="ml-2"
            onClick={() => handleFilterChange("approved")}
          >
            Approved
          </Button>
          <Button
            variant="outline-secondary"
            className="ml-2"
            onClick={() => handleFilterChange("denied")}
          >
            Declined
          </Button>
        </Col>
      </Row>
      <h3>Loans Status</h3>
      <LoanList loans={filteredLoans} />
    </Container>
  );
};

export default AdminView;
