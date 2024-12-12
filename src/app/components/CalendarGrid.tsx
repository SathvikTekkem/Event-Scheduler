import React from "react";
import "./CalendarGrid.css";

interface Event {
  id: string;
  date: string;
  description: string;
}

interface CalendarGridProps {
  date: Date;
  events: Event[];
  onDateClick: (formattedDate: string) => void; // Ensure this expects a string
}

const getDateWithoutTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ date, events, onDateClick }) => {
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const days = [];

  const currentDate = new Date();
  const currentDayFormatted = getDateWithoutTime(currentDate);

  // Add empty cells for the first week (before the first day of the month)
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
  }

  // Add cells for each day in the month
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDayDate = new Date(date.getFullYear(), date.getMonth(), i);
    const currentDateFormatted = getDateWithoutTime(currentDayDate); // Full formatted date

    const eventCount = events.filter((event) => event.date === currentDateFormatted).length;
    const isToday = currentDateFormatted === currentDayFormatted;

    days.push(
      <div
        key={`day-${i}`}
        className={`calendar-cell ${isToday ? "today" : ""}`}
        onClick={() => onDateClick(currentDateFormatted)}  // Pass the formatted date
      >
        <span>{i}</span>
        {eventCount > 0 && (
          <div className="badge-wrapper">
            <div className="event-badge" title={`Events on this date: ${eventCount}`}>{eventCount}</div>
          </div>
        )}
      </div>
    );
  }

  return <div className="calendar-grid">{days}</div>;
};

export default CalendarGrid;
