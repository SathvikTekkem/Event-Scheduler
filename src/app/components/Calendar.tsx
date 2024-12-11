"use client";
import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventModal from "./EventModal";
import "./Calendar.css";

interface Event {
  id: string;
  date: string;
  description: string;
}

const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<string>("");
  const [editingEventId, setEditingEventId] = useState<string | null>(null); // Track which event is being edited

  const handlePrevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const handleNextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const handlePrevYear = () => setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
  const handleNextYear = () => setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDate(clickedDate.toISOString().split("T")[0]);
    setNewEvent(""); // Reset the event input field
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: Date.now().toString(), date: selectedDate, description: newEvent },
      ]);
      setNewEvent(""); // Clear the input field
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id); // Set the event being edited
    setNewEvent(event.description); // Set the input field with the current description
  };

  const handleSaveChanges = () => {
    if (editingEventId && newEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editingEventId ? { ...event, description: newEvent } : event
        )
      );
      setEditingEventId(null); // Reset editing state
      setNewEvent(""); // Clear input
    }
  };

  const handleDeleteEvent = (id: string) => setEvents(events.filter((event) => event.id !== id));

  const handleCloseModal = () => {
    setSelectedDate(null); // Reset selectedDate
    setNewEvent(""); // Clear the event input
  };

  const handleResetToToday = () => {
    setDate(new Date()); // Set the date to today's date
    setSelectedDate(null); // Optionally reset the selected date as well
  };

  return (
    <div className="calendar-container">
      <CalendarHeader
        date={date}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onPrevYear={handlePrevYear}
        onNextYear={handleNextYear}
      />
      <CalendarGrid date={date} events={events} onDateClick={handleDateClick} />
      {selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          events={events}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          onAddEvent={handleAddEvent}
          onSaveChanges={handleSaveChanges} // Pass the save function to EventModal
          onClose={handleCloseModal}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          editingEventId={editingEventId} // Pass the editingEventId to EventModal
        />
      )}
      {/* Reset Button to today's date */}
      <button className="reset-btn" onClick={handleResetToToday}>
        Reset to Today's Date
      </button>
    </div>
  );
};

export default Calendar;
