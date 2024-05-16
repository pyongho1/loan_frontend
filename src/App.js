import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminView from "./pages/AdminView";
import NonprofitView from "./pages/NonprofitView";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AdminApprove from "./pages/AdminApprove";

const App = () => (
  <>
    <NavBar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/approve" element={<AdminApprove />} />
        <Route path="/user/:userId" element={<NonprofitView />} />
      </Routes>
    </Router>
  </>
);

export default App;
