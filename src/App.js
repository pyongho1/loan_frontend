import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminView from "./pages/AdminView";
import NonprofitView from "./pages/NonprofitView";

const App = () => (
  <Router>
    <Routes>
      {/* <Route path="/admin" component={AdminView} /> */}
      <Route path="/admin" element={<AdminView />} />
      {/* <Route
        path="/user/:userId"
        render={({ match }) => <NonprofitView userId={match.params.userId} />}
      /> */}
      <Route path="/user/:userId" element={<NonprofitView />} />
    </Routes>
  </Router>
);

export default App;
