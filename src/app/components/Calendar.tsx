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

  const handlePrevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const handleNextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const handlePrevYear = () => setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
  const handleNextYear = () => setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDate(clickedDate.toISOString().split("T")[0]);
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent) {
      setEvents([...events, { id: Date.now().toString(), date: selectedDate, description: newEvent }]);
      setNewEvent("");
    }
  };

  const handleDeleteEvent = (id: string) => setEvents(events.filter((event) => event.id !== id));

  const handleEditEvent = (event: Event) => {
    // Logic for editing events can go here
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
          onClose={() => setSelectedDate(null)}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
