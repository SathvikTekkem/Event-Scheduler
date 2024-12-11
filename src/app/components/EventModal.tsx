import React, { useEffect } from "react";
import "./EventModal.css"

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
  onSaveChanges: () => void; // Add this function for saving changes
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
  const eventsForDay = events.filter((event) => event.date === selectedDate);

  useEffect(() => {
    if (!editingEventId) {
      setNewEvent(""); // Clear input when no event is being edited
    }
  }, [editingEventId, setNewEvent]);

  // Close modal only if clicked outside modal content
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from closing the modal when interacting with content
  };

  const handleClose = () => {
    onClose(); // Close the modal when clicked on the close button
  };

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={handleModalClick}> {/* Prevent closing if clicking inside modal content */}
        <h3>Events for {selectedDate}</h3>
        {eventsForDay.length > 0 ? (
          <ul className="event-list">
            {eventsForDay.map((event) => (
              <li key={event.id} className="event-list-item">
                <strong>{event.description}</strong>
                <div className="event-actions">
                  <button onClick={() => onEditEvent(event)} className="edit-event-button">
                    Edit
                  </button>
                  <button onClick={() => onDeleteEvent(event.id)} className="delete-event-button">
                    Delete
                  </button>
                </div>
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
        <button className="modal-btn add-event-btn" onClick={editingEventId ? onSaveChanges : onAddEvent}>
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
