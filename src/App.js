// Complete Code for Frontend and Backend

// FRONTEND: React App
// File: frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const App = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState({});

  const saveTransaction = async () => {
    await axios.post('https://https://stsbackend.onrender.com/api/save', {
      date: date.toISOString().split('T')[0],
      amount,
    });
    fetchTransactions();
  };

  const fetchTransactions = async () => {
    const response = await axios.get('https://https://stsbackend.onrender.com/api/transactions');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <button onClick={saveTransaction}>Save</button>
      </div>
      <Calendar
        value={date}
        tileContent={({ date }) =>
          transactions[date.toISOString().split('T')[0]] ? (
            <p>${transactions[date.toISOString().split('T')[0]].amount}</p>
          ) : null
        }
      />
    </div>
  );
};

export default App;