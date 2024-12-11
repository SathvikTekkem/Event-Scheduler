"use client";
import './Calendar.css';


import React, { useState } from "react";

// function to get the current month and year
const getCurrentMonth = () => {
  const today = new Date();
  return {
    month: today.getMonth(),
    year: today.getFullYear(),
  };
};

//function to generate the days in a month
const generateCalendar = (month: number, year: number) => {
  const date = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = date.getDay();

  const calendar = [];
  let currentDay = 1;

  // empty array for the previous month's days
  let emptyCells = Array(firstDay).fill(null);

  // Fill the calendar grid with days
  for (let i = 0; i < emptyCells.length; i++) {
    calendar.push(emptyCells[i]);
  }

  // Add the days of the current month
  for (let i = currentDay; i <= daysInMonth; i++) {
    calendar.push(i);
  }

  return calendar;
};

export default function Calendar() {
  const { month, year } = getCurrentMonth();
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);

  const calendarDays = generateCalendar(currentMonth, currentYear);

  return (
    <div className="calendar-container">
      <h2>
        {currentYear} - {currentMonth + 1}
      </h2>
      <div className="calendar-grid">
        {calendarDays.map((day, index) => (
          <div key={index} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
