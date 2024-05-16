import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminView from "./pages/AdminView";
import NonprofitView from "./pages/NonprofitView";

const App = () => (
  <Router>
    <Routes>
      <Route path="/admin" component={AdminView} />
      <Route
        path="/user/:userId"
        render={({ match }) => <NonprofitView userId={match.params.userId} />}
      />
    </Routes>
  </Router>
);

export default App;
