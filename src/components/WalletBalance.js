import React from "react";

const WalletBalance = ({ balance, totalExpenses }) => (
  <div className="wallet-balance">
    <h2>Wallet Balance: ₹{balance}</h2>
    <h3>Total Expenses: ₹{totalExpenses}</h3>
  </div>
);

export default WalletBalance;
