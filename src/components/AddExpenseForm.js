import React, { useState, useEffect } from "react";

const AddExpenseForm = ({
  addExpense,
  updateExpense,
  editingExpense,
  expenses,
  cancel,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    if (editingExpense) {
      const index = expenses.findIndex((exp) => exp === editingExpense);
      updateExpense(index, expense); // Call update function
    } else {
      addExpense(expense); // Call add function
    }
  };

  return (
    <form className="add-expence-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense Title"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Expense Amount"
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit" className="add_exp">
        Add Expense
      </button>
      <button className="cnl" onClick={cancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddExpenseForm;
