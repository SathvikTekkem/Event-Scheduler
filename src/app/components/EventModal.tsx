import React from "react";

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
  onClose: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
}

const EventModal: React.FC<EventModalProps> = ({
  selectedDate,
  events,
  newEvent,
  setNewEvent,
  onAddEvent,
  onClose,
  onEditEvent,
  onDeleteEvent,
}) => {
  const eventsForDay = events.filter((event) => event.date === selectedDate);

  return (
    <div className="modal">
      <h3>Events for {selectedDate}</h3>
      {eventsForDay.length > 0 ? (
        <ul>
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
      <button className="modal-btn add-event-btn" onClick={onAddEvent}>
        Add Event
      </button>
      <button className="modal-btn close-modal-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default EventModal;
