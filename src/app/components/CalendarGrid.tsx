import React from "react";

interface Event {
  id: string;
  date: string;
  description: string;
}

interface CalendarGridProps {
  date: Date;
  events: Event[];
  onDateClick: (day: number) => void;
}

const getDateWithoutTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ date, events, onDateClick }) => {
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
        onClick={() => onDateClick(i)}
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

  return <div className="calendar-grid">{days}</div>;
};

export default CalendarGrid;
