import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ExpenseTrends = ({ expenses }) => {
  const data = expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) existing.value += expense.amount;
    else acc.push({ name: expense.category, value: expense.amount });
    return acc;
  }, []);

  return (
    <div className="expense-trends">
      <BarChart
        width={400}
        height={300}
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
      >
        <YAxis type="category" dataKey="name" axisLine={false} />
        <XAxis type="number" width={100} axisLine={false} />
        <Bar dataKey="value" fill="#8784D2" />
      </BarChart>
    </div>
  );
};

export default ExpenseTrends;
