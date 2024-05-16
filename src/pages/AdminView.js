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

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/loans")
      .then((response) => setLoans(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container>
      <h2 className="mt-4">Overview</h2>
      <Form className="my-4">
        <FormControl type="text" placeholder="Search loan" />
      </Form>
      <Row className="mb-4">
        <Col>
          <Button variant="outline-secondary">All loans</Button>
          <Button variant="outline-secondary" className="ml-2">
            Approved
          </Button>
          <Button variant="outline-secondary" className="ml-2">
            Declined
          </Button>
        </Col>
      </Row>
      <h3>Loans Status</h3>
      <LoanList loans={loans} />
    </Container>
  );
};

export default AdminView;
