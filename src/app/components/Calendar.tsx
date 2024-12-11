"use client";

import React, { useState } from "react";
import "./Calendar.css";

interface Event {
  id: string;
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

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
  };

  const handleNextYear = () => {
    setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));
  };

  const getDateWithoutTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDate(getDateWithoutTime(clickedDate));
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent) {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          date: selectedDate,
          description: newEvent,
        },
      ]);
      setNewEvent("");
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setUpdatedDescription(event.description);
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      const updatedEvents = events.map((event) =>
        event.id === editingEvent.id
          ? { ...event, description: updatedDescription }
          : event
      );
      setEvents(updatedEvents);
      setEditingEvent(null);
      setUpdatedDescription("");
    }
  };

  const renderDays = () => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = [];

    const currentDate = new Date();
    const currentDayFormatted = getDateWithoutTime(currentDate);

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDayDate = new Date(date.getFullYear(), date.getMonth(), i);
      const currentDateFormatted = getDateWithoutTime(currentDayDate);

      const eventCount = events.filter((event) => event.date === currentDateFormatted).length;

      const isToday = currentDateFormatted === currentDayFormatted;

      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-cell ${isToday ? "today" : ""}`}
          onClick={() => handleDateClick(i)}
        >
          <span>{i}</span>
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

  const renderEventListForDay = () => {
    if (!selectedDate) return null;

    const eventsForDay = events.filter((event) => event.date === selectedDate);

    return (
      <div>
        <h4>For {selectedDate}</h4>
        {eventsForDay.length > 0 ? (
          <ul>
            {eventsForDay.map((event) => (
              <li key={event.id} className="event-list-item">
                <strong>{event.description}</strong>
                <div className="event-actions">
                  <button onClick={() => handleEditEvent(event)} className="edit-event-button">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteEvent(event.id)} className="delete-event-button">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this day.</p>
        )}
      </div>
    );
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
          <h3>Events for the selected Day</h3>
          {renderEventListForDay()}
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
            Close
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
            onClick={() => setEditingEvent(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
