import React, { useState } from "react";
import { IoPizzaOutline } from "react-icons/io5";
import { CiRollingSuitcase } from "react-icons/ci";
import { GoGift } from "react-icons/go";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const ExpenseItems = ({ expenses, deleteExpense, editExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const itemsPerPage = 3; // Number of expenses to show per page

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  // Calculate the current slice of expenses to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = expenses.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    setCount((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    setCount((prev) => prev - 1);
  };

  function coverter(date) {
    return date.toLocaleDateString("en-US", {
      month: "long", // full month name
      day: "numeric", // day of the month
      year: "numeric", // year in full
    });
  }

  return (
    <div className="expense-list">
      {currentExpenses.map((expense, index) => (
        <div key={index} className="expense-item">
          <div className="right_item">
            <div className="icon">
              {expense.category === "Food" && <IoPizzaOutline />}
              {expense.category === "Entertainment" && <GoGift />}
              {expense.category === "Travel" && <CiRollingSuitcase />}
            </div>
            <div className="content">
              <p>{expense.title} </p>
              <p style={{ color: " #9B9B9B" }}>
                {coverter(new Date(expense?.date))}
              </p>
            </div>
          </div>
          <div className="left_item">
            <p>₹{expense.amount}</p>
            <button
              style={{ backgroundColor: "#ff3838" }}
              className="btn"
              onClick={() => deleteExpense(startIndex + index)}
            >
              <IoCloseCircleOutline />
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "#f4bb4a" }}
              onClick={() => editExpense(expense)}
            >
              <GrEdit />
            </button>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FaArrowLeftLong />
          </button>

          <p className="count">{count}</p>

          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FaArrowRightLong />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseItems;
