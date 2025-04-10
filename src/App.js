import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LoanCalculator from "./components/LoanCalculator";
import BMICalculator from "./components/BMICalculator";
import CompoundInterestCalculator from "./components/CompoundInterestCalculator";
import "./App.css"; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Loan Calculator</Link>
            </li>
            <li>
              <Link to="/bmi">BMI Calculator</Link>
            </li>
            <li>
              <Link to="/compound-interest">Compound Interest Calculator</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index path="/" element={<LoanCalculator />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route
            path="/compound-interest"
            element={<CompoundInterestCalculator />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
