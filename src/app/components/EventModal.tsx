import React, { useState, useEffect } from "react";
import "./EventModal.css";

interface Event {
  id: string;
  date: string;
  description: string;
}

interface EventModalProps {
  selectedDate: string;
  events: Event[];
  newEvent: string;
  setNewEvent: (value: string) => void;
  onAddEvent: () => void;
  onSaveChanges: (id: string, updatedDescription: string) => void;
  onClose: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  editingEventId: string | null; // Track if we are editing
}

const EventModal: React.FC<EventModalProps> = ({
  selectedDate,
  events,
  newEvent,
  setNewEvent,
  onAddEvent,
  onSaveChanges,
  onClose,
  onEditEvent,
  onDeleteEvent,
  editingEventId,
}) => {
  const [editedDescription, setEditedDescription] = useState("");

  const eventsForDay = events.filter((event) => event.date === selectedDate);

  useEffect(() => {
    if (editingEventId) {
      const eventToEdit = events.find((event) => event.id === editingEventId);
      setEditedDescription(eventToEdit ? eventToEdit.description : "");
    } else {
      setEditedDescription("");
    }
  }, [editingEventId, events]);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    onClose();
  };

  const handleSaveClick = (id: string) => {
    onSaveChanges(id, editedDescription);
  };

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={handleModalClick}>
        <h3>Events for {selectedDate}</h3>
        {eventsForDay.length > 0 ? (
          <ul className="event-list">
            {eventsForDay.map((event) => (
              <li key={event.id} className="event-list-item">
                {editingEventId === event.id ? (
                  <>
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="edit-input"
                    />
                    <button
                      onClick={() => handleSaveClick(event.id)}
                      className="save-event-button"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <strong>{event.description}</strong>
                    <div className="event-actions">
                      <button
                        onClick={() => onEditEvent(event)}
                        className="edit-event-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteEvent(event.id)}
                        className="delete-event-button"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events for this day.</p>
        )}
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Event description"
        />
        <button
          className="modal-btn add-event-btn"
          onClick={editingEventId ? undefined : onAddEvent}
        >
          {editingEventId ? "Save Changes" : "Add Event"}
        </button>
        <button className="modal-btn close-modal-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
