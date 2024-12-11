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

  // States for editing event
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState<string>("");

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

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event); // Set the event to be edited
    setUpdatedDescription(event.description); // Pre-fill the description for editing
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      // Update the event in the events array
      const updatedEvents = events.map((event) =>
        event.date === editingEvent.date
          ? { ...event, description: updatedDescription }
          : event
      );
      setEvents(updatedEvents);
      setEditingEvent(null); // Close the editing mode
      setUpdatedDescription(""); // Clear the description input
    }
  };

  const renderDays = () => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = [];
    
    const currentDate = new Date(); // Get today's date
    const currentDayFormatted = getDateWithoutTime(currentDate); // Format it as YYYY-MM-DD
  
    // Add empty cells for the days before the 1st of the month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }
  
    // Add the actual day cells to the calendar grid
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDayDate = new Date(date.getFullYear(), date.getMonth(), i);
      const currentDateFormatted = getDateWithoutTime(currentDayDate);
  
      // Check if there's an event on this day
      const eventOnDay = events.filter((event) => event.date === currentDateFormatted);
      const eventCount = eventOnDay.length;
  
      // Check if it's the current day
      const isToday = currentDateFormatted === currentDayFormatted;
  
      // Add the day cell to the array
      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-cell ${isToday ? "today" : ""}`} // Add the 'today' class if it's the current day
          onClick={() => handleDateClick(i)}
        >
          <span>{i}</span>
  
          {/* Add the event badge showing event count */}
          {eventCount > 0 && (
            <div className="badge-wrapper">
              <div className="event-badge">{eventCount}</div>
            </div>
          )}
        </div>
      );
    }
  
    return days;
  };

  const renderEventList = () => {
    return events.map((event, index) => (
      <li key={index} className="event-list-item">
        <strong>{event.date}:</strong> {event.description}
        <div className="event-actions">
          <button onClick={() => handleEditEvent(event)} className="edit-event-button">
            Edit
          </button>
          <button onClick={() => handleDeleteEvent(event.date)} className="delete-event-button">
            Delete
          </button>
        </div>
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

      {editingEvent && (
        <div className="modal">
          <h3>Edit Event</h3>
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Update event description"
          />
          <button className="modal-btn save-event-btn" onClick={handleSaveEvent}>
            Save Changes
          </button>
          <button
            className="modal-btn close-modal-btn"
            onClick={() => setEditingEvent(null)} // Close the edit modal
          >
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
