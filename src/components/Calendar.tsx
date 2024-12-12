"use client";
import React, { useState } from "react";
import { Event } from "@/pages/interfaces";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventModal from "./EventModal";
import AddEventModal from "./AddEventModal";
import styles from "../styles/Calendar.module.css"



const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<string>("");
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  // State for Add Event Modal
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState<boolean>(false);
  const [addEventDate, setAddEventDate] = useState<{
    day: number;
    month: number;
    year: number;
  }>({ day: 1, month: 1, year: date.getFullYear() });
  const [addEventDescription, setAddEventDescription] = useState<string>("");

  const handlePrevMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  const handleNextMonth = () => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  const handlePrevYear = () => setDate(new Date(date.getFullYear() - 1, date.getMonth(), 1));
  const handleNextYear = () => setDate(new Date(date.getFullYear() + 1, date.getMonth(), 1));

  const handleDateClick = (formattedDate: string) => {
    setSelectedDate(formattedDate); // Using the passed full formatted date
    setNewEvent(""); // Resetting the event input field
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent.trim()) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: Date.now().toString(), date: selectedDate, description: newEvent.trim() },
      ]);
      setNewEvent(""); // Resetting input for adding events
    }
  };
  
  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id);
  };
  
  const handleSaveChanges = (id: string, updatedDescription: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, description: updatedDescription.trim() } : event
      )
    );
    setEditingEventId(null); // Resetting editing state
  };  

  const handleDeleteEvent = (id: string) => setEvents(events.filter((event) => event.id !== id));

  const handleCloseModal = () => {
    setSelectedDate(null); // Resetting selectedDate
    setNewEvent(""); // Clearing the event input
    setEditingEventId(null); // Resetting editing state
  };

  const handleResetToToday = () => {
    setDate(new Date()); // Setting the date to today's date
    setSelectedDate(null); // Optionally resetting the selected date as well
  };

  // Handlers for Add Event Modal
  const handleOpenAddEventModal = () => setIsAddEventModalOpen(true);
  const handleCloseAddEventModal = () => {
    setIsAddEventModalOpen(false);
    setAddEventDate({ day: 1, month: 1, year: date.getFullYear() });
    setAddEventDescription("");
  };
  const handleSubmitAddEvent = () => {
    const { day, month, year } = addEventDate;
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (formattedDate && addEventDescription) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: Date.now().toString(), date: formattedDate, description: addEventDescription },
      ]);
      handleCloseAddEventModal();
    }
  };

  return (
    <div className={styles["project-container"]}>
      <div className={styles["title"]}>
        <h2>Schedule your event</h2>
      </div>
      <div className={styles["button-group"]}>
        <button className={styles["reset-btn"]} onClick={handleResetToToday}>
          Go to Today's Date
        </button>
        <button className={styles["add-eventP-btn"]} onClick={handleOpenAddEventModal}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2997/2997933.png"
            alt="Add Icon"
            className={styles["add-event-icon"]}
          />
          Create Event
        </button>
      </div>
      <div className={styles["calendar-container"]}>
        <CalendarHeader
          date={date}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onPrevYear={handlePrevYear}
          onNextYear={handleNextYear}
        />
        <CalendarGrid date={date} events={events} onDateClick={handleDateClick} /> {/* Pass updated handler */}
      </div>

      {/* Modal for Adding/Editing Event by Clicking on Date */}
      {selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          events={events.filter(event => event.date === selectedDate)}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          onAddEvent={handleAddEvent}
          onSaveChanges={handleSaveChanges}
          onClose={handleCloseModal}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          editingEventId={editingEventId}
        />
      )}

      {/* Modal for Adding Event via "Add Event" Button */}
      {isAddEventModalOpen && (
        <AddEventModal
          addEventDate={addEventDate}
          setAddEventDate={setAddEventDate}
          addEventDescription={addEventDescription}
          setAddEventDescription={setAddEventDescription}
          onSubmit={handleSubmitAddEvent}
          onClose={handleCloseAddEventModal}
        />
      )}
    </div>
  );
};

export default React.memo(Calendar);
