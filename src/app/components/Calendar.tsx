"use client";

import React, { useState } from "react";
import "./Calendar.css";

interface Event {
  date: string; // e.g., "2024-12-12"
  description: string;
}

const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<string>("");

  // Navigate to previous month
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // Navigate to previous year
  const handlePrevYear = () => {
    setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
  };

  // Navigate to next year
  const handleNextYear = () => {
    setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDate(clickedDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent) {
      setEvents([...events, { date: selectedDate, description: newEvent }]);
      setNewEvent("");
      setSelectedDate(null); // Close modal
    }
  };

  const handleDeleteEvent = (date: string) => {
    setEvents(events.filter(event => event.date !== date));
  };

  const renderDays = () => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div key={`day-${i}`} className="calendar-cell" onClick={() => handleDateClick(i)}>
          <span>{i}</span>
        </div>
      );
    }

    return days;
  };

  const renderEventList = () => {
    return events.map((event, index) => (
      <li key={index} className="event-list-item">
        <strong>{event.date}:</strong> {event.description}
        <button onClick={() => handleDeleteEvent(event.date)} className="delete-event-button">Delete</button>
      </li>
    ));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevYear}>{"<<"}</button>
        <button onClick={handlePrevMonth}>{"<"}</button>
        <span>
          {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>{">"}</button>
        <button onClick={handleNextYear}>{">>"}</button>
      </div>
      <div className="calendar-grid">{renderDays()}</div>

      {selectedDate && (
        <div className="modal">
          <button className="modal-close" onClick={() => setSelectedDate(null)}>
            x
          </button>
          <h3>Add Event</h3>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Event description"
          />
          <button onClick={handleAddEvent} className="modal-add-button">Add Event</button>
        </div>
      )}

      <div className="event-list-container">
        <h3>Events</h3>
        <ul className="event-list">{renderEventList()}</ul>
      </div>
    </div>
  );
};

export default Calendar;
