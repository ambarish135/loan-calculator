import React, { useState, useEffect } from "react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(3);
  const [paymentFrequency, setPaymentFrequency] = useState("monthly"); // Default value for calculation
  const [paymentsPerYear, setPaymentsPerYear] = useState(12); // New state for payments per year
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  // Update payments per year based on user input
  useEffect(() => {
    let numPayments = parseFloat(paymentFrequency);
    if (!isNaN(numPayments) && numPayments > 0) {
      setPaymentsPerYear(numPayments);
    } else {
      setPaymentsPerYear(12); // Default to monthly if invalid input.
    }
  }, [paymentFrequency]);

  // Calculate loan details when inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, paymentsPerYear]);

  const calculateLoan = () => {
    const totalPayments = loanTerm * paymentsPerYear;
    const periodicInterestRate = interestRate / 100 / paymentsPerYear;

    // Calculate payment amount
    const paymentAmount =
      (loanAmount *
        (periodicInterestRate *
          Math.pow(1 + periodicInterestRate, totalPayments))) /
      (Math.pow(1 + periodicInterestRate, totalPayments) - 1);

    // Calculate amortization schedule
    let balance = loanAmount;
    const schedule = [];
    let totalInterestPaid = 0;

    for (let i = 1; i <= totalPayments; i++) {
      const interestPayment = balance * periodicInterestRate;
      const principalPayment = paymentAmount - interestPayment;
      balance -= principalPayment;

      totalInterestPaid += interestPayment;

      schedule.push({
        payment: i,
        paymentAmount: paymentAmount,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        totalInterest: totalInterestPaid,
        remainingBalance: balance > 0 ? balance : 0,
      });
    }

    setMonthlyPayment(paymentAmount);
    setTotalInterest(totalInterestPaid);
    setTotalPayment(paymentAmount * totalPayments);
    setAmortizationSchedule(schedule);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Display only the first few and last few payments when there are many
  const displaySchedule = () => {
    if (amortizationSchedule.length <= 10 || showFullSchedule) {
      return amortizationSchedule;
    } else {
      return [
        ...amortizationSchedule.slice(0, 3),
        {
          payment: "...",
          paymentAmount: "...",
          principalPayment: "...",
          interestPayment: "...",
          totalInterest: "...",
          remainingBalance: "...",
        },
        ...amortizationSchedule.slice(-3),
      ];
    }
  };

  return (
    <div className="calculator-container">
      <h1>Loan Interest Calculator</h1>

      <div className="input-grid">
        <div>
          <div className="input-group">
            <label>Loan Amount ($)</label>
            <input
              type="number"
              min="1"
              value={loanAmount}
              onChange={(e) =>
                setLoanAmount(Math.max(0, Number(e.target.value)))
              }
            />
          </div>

          <div className="input-group">
            <label>Annual Interest Rate (%)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={interestRate}
              onChange={(e) =>
                setInterestRate(Math.max(0.0, Number(e.target.value)))
              }
            />
          </div>
        </div>

        <div>
          <div className="input-group">
            <label>Loan Term (years)</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={loanTerm}
              onChange={(e) =>
                setLoanTerm(Math.max(0.0, Number(e.target.value)))
              }
            />
          </div>

          <div className="input-group">
            <label>Payments per Year</label>
            <input
              type="number"
              min="1"
              step="1"
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="summary-container">
        <h2>Loan Summary</h2>
        <div className="summary-grid">
          <div>
            <p className="label">Payment Amount</p>
            <p className="value">{formatCurrency(monthlyPayment)}</p>
          </div>
          <div>
            <p className="label">Total Interest</p>
            <p className="value">{formatCurrency(totalInterest)}</p>
          </div>
          <div>
            <p className="label">Total Payment</p>
            <p className="value">{formatCurrency(totalPayment)}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="schedule-header">
          <h2>Amortization Schedule</h2>
          {amortizationSchedule.length > 10 && (
            <button
              onClick={() => setShowFullSchedule(!showFullSchedule)}
              className="toggle-button"
            >
              {showFullSchedule ? "Show Less" : "Show Full Schedule"}
            </button>
          )}
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Payment #</th>
                <th>Payment</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Total Interest</th>
                <th>Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {displaySchedule().map((payment, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                  <td>{payment.payment}</td>
                  <td>
                    {payment.paymentAmount === "..."
                      ? "..."
                      : formatCurrency(payment.paymentAmount)}
                  </td>
                  <td>
                    {payment.principalPayment === "..."
                      ? "..."
                      : formatCurrency(payment.principalPayment)}
                  </td>
                  <td>
                    {payment.interestPayment === "..."
                      ? "..."
                      : formatCurrency(payment.interestPayment)}
                  </td>
                  <td>
                    {payment.totalInterest === "..."
                      ? "..."
                      : formatCurrency(payment.totalInterest)}
                  </td>
                  <td>
                    {payment.remainingBalance === "..."
                      ? "..."
                      : formatCurrency(payment.remainingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
