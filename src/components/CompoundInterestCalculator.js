import React, { useState } from "react";
import "./CompoundInterestCalculator.css";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [timesCompounded, setTimesCompounded] = useState("12");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateCompoundInterest = () => {
    const principalAmount = parseFloat(principal);
    const interestRate = parseFloat(rate) / 100;
    const times = parseInt(timesCompounded);
    const timePeriod = parseInt(years);

    if (!principalAmount || !interestRate || !times || !timePeriod) {
      alert("Please fill in all fields with valid numbers");
      return;
    }

    const amount =
      principalAmount * Math.pow(1 + interestRate / times, times * timePeriod);
    const interestEarned = amount - principalAmount;
    setResult({
      futureValue: amount.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      principal: principalAmount.toFixed(2),
    });
  };

  return (
    <div className="compound-interest-calculator">
      <h2>Compound Interest Calculator</h2>
      <div className="input-group">
        <label>
          Principal Amount ($)
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="input-field"
            placeholder="Enter principal amount"
            min="0"
          />
        </label>
        <label>
          Annual Interest Rate (%)
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="input-field"
            placeholder="Enter annual interest rate"
            min="0"
            step="0.1"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Compounding Frequency
          <select
            value={timesCompounded}
            onChange={(e) => setTimesCompounded(e.target.value)}
            className="input-field"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="24">Semi-monthly</option>
            <option value="26">Bi-weekly</option>
            <option value="52">Weekly</option>
            <option value="365">Daily</option>
          </select>
        </label>
        <label>
          Time Period (Years)
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="input-field"
            placeholder="Enter number of years"
            min="0"
          />
        </label>
      </div>
      <button onClick={calculateCompoundInterest} className="calculate-button">
        Calculate
      </button>
      {result && (
        <div className="result">
          <div className="summary-container">
            <div className="summary-grid">
              <div>
                <p className="label">Principal Amount</p>
                <p className="value">${result.principal}</p>
              </div>
              <div>
                <p className="label">Interest Earned</p>
                <p className="value">${result.interestEarned}</p>
              </div>
              <div>
                <p className="label">Future Value</p>
                <p className="value">${result.futureValue}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
