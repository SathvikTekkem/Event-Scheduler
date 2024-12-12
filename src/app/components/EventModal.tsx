import React, { useState, useEffect } from "react";
import "./EventModal.css";

interface Event {
  id: string;
  date: string; // e.g., "2024-12-12"
  description: string;
}

interface EventModalProps {
  selectedDate: string;
  events: Event[];
  newEvent: string;
  setNewEvent: React.Dispatch<React.SetStateAction<string>>;
  onAddEvent: () => void;
  onSaveChanges: (id: string, updatedDescription: string) => void;
  onClose: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  editingEventId: string | null;
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
  const [editedDescription, setEditedDescription] = useState<string>("");

  useEffect(() => {
    // Pre-fill the description when editing
    if (editingEventId) {
      const eventToEdit = events.find((event) => event.id === editingEventId);
      setEditedDescription(eventToEdit?.description || "");
    } else {
      setEditedDescription("");
    }
  }, [editingEventId, events]);

  const handleSaveClick = () => {
    if (editingEventId && editedDescription.trim()) {
      onSaveChanges(editingEventId, editedDescription);
    }
  };

  const handleAddClick = () => {
    if (!editingEventId && newEvent.trim()) {
      onAddEvent();
    }
  };

  const formatSelectedDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    const formattedDate = new Date(date).toLocaleDateString('en-GB', options); // Change locale to 'en-GB' for '12 Jan 2024'
    return formattedDate;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Events for {formatSelectedDate(selectedDate)}</h3>

        {/* List of existing events */}
        <div className="event-list">
          {events.map((event) => (
            <div
              key={event.id}
              className={`event-list-item ${editingEventId === event.id ? "highlighted" : ""}`}
              onClick={() => onEditEvent(event)}
            >
              <span>{event.description}</span>
              <div>
                <button
                  className="edit-event-button"
                  onClick={() => onEditEvent(event)}
                >
                  Edit
                </button>
                <button
                  className="delete-event-button"
                  onClick={() => onDeleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input for adding/editing events */}
        <input
          type="text"
          value={editingEventId ? editedDescription : newEvent}
          onChange={(e) =>
            editingEventId
              ? setEditedDescription(e.target.value)
              : setNewEvent(e.target.value)
          }
          placeholder={
            editingEventId ? "Edit event description" : "Add event description"
          }
        />

        {/* Conditionally render Add/Save button */}
        <div className="button-group">
          {editingEventId ? (
            <button
              className="modal-btn save-event-button"
              onClick={handleSaveClick}
              disabled={!editedDescription.trim()}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="modal-btn add-event-btn"
              onClick={handleAddClick}
              disabled={!newEvent.trim()}
            >
              Add Event
            </button>
          )}
        </div>

        {/* Close button remains at the bottom */}
        <button className="close-modal-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
