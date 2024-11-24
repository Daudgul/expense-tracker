// AddIncomeForm.js
import React, { useState } from "react";
import { useSnackbar } from "notistack";

const AddIncomeForm = ({ addIncome, cancel }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount) {
      addIncome(parseFloat(amount));
      setAmount("");
    } else {
      //   alert("Please enter a valid amount!");
      enqueueSnackbar("Please enter a valid amount!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-income-form">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button className="add_bal" type="submit">
        Add Balance
      </button>
      <button className="cnl" onClick={cancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddIncomeForm;
