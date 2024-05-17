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
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/loans")
      .then((response) => setLoans(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUpdateLoanAmount = (id, updatedAmount) => {
    axios
      .put(`http://localhost:5001/api/loans/${id}/amount`, {
        loanAmount: updatedAmount,
      })
      .then((response) => {
        setLoans(
          loans.map((loan) =>
            loan.id === id ? { ...loan, loanAmount: updatedAmount } : loan
          )
        );
      })
      .catch((error) => console.error("Error updating loan amount:", error));
  };

  const filteredLoans = loans.filter((loan) => {
    if (filter === "all" && !searchQuery) return true;
    const matchesFilter = filter === "all" || loan.status === filter;
    const matchesSearch = loan.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Container>
      <h2 className="mt-4">Overview</h2>
      <Form className="my-4">
        <FormControl
          type="text"
          placeholder="Search loan by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
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
      <LoanList
        loans={filteredLoans}
        onUpdateLoanAmount={handleUpdateLoanAmount}
      />
    </Container>
  );
};

export default AdminView;
