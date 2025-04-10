import React, { useState } from "react";
import "./BMICalculator.css"; // Import the CSS file

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    let weightInKg = unit === "kg" ? weight : weight * 0.453592;
    let heightInMeters = height / 100;
    let bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    determineBMICategory(bmiValue);
  };

  const determineBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obesity");
    }
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div className="input-group">
        <label>
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input-field"
          />
        </label>
        <label>
          Unit:
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="input-field"
          >
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </label>
      </div>
      <div className="input-group">
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="input-field"
          />
        </label>
      </div>
      <button onClick={calculateBMI} className="calculate-button">
        Calculate
      </button>
      {bmi && (
        <div className="result">
          <p>Your BMI is: {bmi}</p>
          <p>BMI Category: {category}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
