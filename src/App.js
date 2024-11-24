import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";
import ExpenseItems from "./components/ExpenseItems";
import AddIncomeForm from "./components/AddIncomeForm";
import { useSnackbar } from "notistack";
import { FaPlus } from "react-icons/fa";
import "./App.css";

export const saveToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const loadFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) || [];

Modal.setAppElement("#root");

const App = () => {
  const [walletBalance, setWalletBalance] = useState(
    loadFromLocalStorage("walletBalance") || 5000
  );
  const [expenses, setExpenses] = useState(
    loadFromLocalStorage("expenses") || []
  );
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    saveToLocalStorage("walletBalance", walletBalance);
    saveToLocalStorage("expenses", expenses);
  }, [walletBalance, expenses]);

  const addIncome = (amount) => {
    setWalletBalance(walletBalance + amount);
    setIsAddIncomeModalOpen(false);
  };

  const addExpense = (expense) => {
    if (walletBalance < expense.amount) {
      enqueueSnackbar("Insufficient balance!");
      return;
    }
    setExpenses([...expenses, expense]);
    setWalletBalance(walletBalance - expense.amount);
    setIsExpenseModalOpen(false);
  };

  const updateExpense = (index, updatedExpense) => {
    const oldExpense = expenses[index];
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = updatedExpense;
    setExpenses(updatedExpenses);

    // Adjust wallet balance based on the difference
    const balanceAdjustment = oldExpense.amount - updatedExpense.amount;
    setWalletBalance(walletBalance + balanceAdjustment);
    setEditingExpense(null);
    setIsExpenseModalOpen(false);
  };

  const deleteExpense = (index) => {
    const expense = expenses[index];
    setExpenses(expenses.filter((_, i) => i !== index));
    setWalletBalance(walletBalance + expense.amount);
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const openExpenseModal = (expense = null) => {
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  };
  console.log(expenses.lenght, "this ");

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="expense_box card">
        <div className="expense_btn_card card">
          <h2>
            Wallet belance:<span className="bal_span"> ₹{walletBalance}</span>
          </h2>
          <button
            className="add green"
            onClick={() => setIsAddIncomeModalOpen(true)}
          >
            <FaPlus /> Add Income
          </button>
        </div>
        <div className="expense_btn_card card">
          <h2>
            Expenses:<span className="exp_span"> ₹{totalExpenses}</span>
          </h2>
          <button className="add red" onClick={() => openExpenseModal()}>
            <FaPlus /> Add Expense
          </button>
        </div>

        <ExpenseSummary expenses={expenses} />
      </div>
      <div className="transaction_box">
        <div className="recent_transaction">
          <h2 className="sub-heading">Recent Transactions</h2>
          <div className="recent_transaction_box card">
            {expenses.length == 0 && (
              <p className="message">No transactions!</p>
            )}
            <ExpenseItems
              expenses={expenses}
              deleteExpense={deleteExpense}
              editExpense={openExpenseModal}
            />
          </div>
        </div>
        <div className="top_transaction">
          <h2 className="sub-heading">Top Expenses</h2>
          <div className="top_transaction_box card">
            <ExpenseTrends expenses={expenses} />
          </div>
        </div>
      </div>

      {/* Expense Modal */}
      <Modal
        isOpen={isExpenseModalOpen}
        onRequestClose={() => setIsExpenseModalOpen(false)}
        contentLabel={editingExpense ? "Edit Expense" : "Add Expense"}
        className={"modal_box"}
      >
        <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
        <AddExpenseForm
          addExpense={addExpense}
          updateExpense={updateExpense}
          editingExpense={editingExpense}
          expenses={expenses}
          cancel={() => setIsExpenseModalOpen(false)}
        />
      </Modal>

      <Modal
        className={"modal_box"}
        isOpen={isAddIncomeModalOpen}
        onRequestClose={() => setIsAddIncomeModalOpen(false)}
        contentLabel="Add Income"
      >
        <h2>Add Income</h2>
        <div>
          <AddIncomeForm
            addIncome={addIncome}
            cancel={() => setIsAddIncomeModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default App;
