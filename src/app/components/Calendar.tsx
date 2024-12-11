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

  // Function to strip time and ensure the date comparison works correctly
  const getDateWithoutTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`; // returns YYYY-MM-DD
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDate(getDateWithoutTime(clickedDate));
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent) {
      setEvents([...events, { date: selectedDate, description: newEvent }]);
      setNewEvent("");
      setSelectedDate(null); // Close modal
    }
  };

  const handleDeleteEvent = (date: string) => {
    setEvents(events.filter((event) => event.date !== date));
  };

  const renderDays = () => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      // Format current day
      const currentDayDate = new Date(date.getFullYear(), date.getMonth(), i);
      const currentDateFormatted = getDateWithoutTime(currentDayDate);

      // Check if there's an event on this day
      const eventOnDay = events.some((event) => event.date === currentDateFormatted);

      days.push(
        <div key={`day-${i}`} className="calendar-cell" onClick={() => handleDateClick(i)}>
          <span>{i}</span>
          {eventOnDay && <div className="event-badge"></div>} {/* Badge for events */}
        </div>
      );
    }

    return days;
  };

  const renderEventList = () => {
    return events.map((event, index) => (
      <li key={index} className="event-list-item">
        <strong>{event.date}:</strong> {event.description}
        <button onClick={() => handleDeleteEvent(event.date)} className="delete-event-button">
          Delete
        </button>
      </li>
    ));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevYear}>{"<<"}</button>
        <button onClick={handlePrevMonth}>{"<"}</button>
        <span className="calendar-month-title">
          {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>{">"}</button>
        <button onClick={handleNextYear}>{">>"}</button>
      </div>
      <div className="calendar-grid">{renderDays()}</div>

      {selectedDate && (
        <div className="modal">
          <h3>Add Event</h3>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Event description"
          />
          <button className="modal-btn add-event-btn" onClick={handleAddEvent}>
            Add Event
          </button>
          <button className="modal-btn close-modal-btn" onClick={() => setSelectedDate(null)}>
            ×
          </button>
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
