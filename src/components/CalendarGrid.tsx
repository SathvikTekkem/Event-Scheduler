import React from "react";
import { Event, CalendarGridProps } from "@/components/interfaces";
import styles from "../styles/CalendarGrid.module.css";


// Helper function to get the current date in UTC
const getTodayUTC = (): string => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = now.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDateWithoutTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`; // Returning in YYYY-MM-DD format
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ date, events, onDateClick }) => {
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const days = [];

  const currentDayFormatted = getTodayUTC(); 

  // Adding empty cells for the first week (before the first day of the month)
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={`empty-${i}`} className={`${styles["calendar-cell"]} ${styles["empty"]}`}></div>);
  }

  // Adding cells for each day in the month
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDayDate = new Date(date.getFullYear(), date.getMonth(), i);
    const currentDateFormatted = getDateWithoutTime(currentDayDate); // Full formatted date

    const eventCount = events.filter((event) => event.date === currentDateFormatted).length;
    const isToday = currentDateFormatted === currentDayFormatted;

    days.push(
      <div
        key={`day-${i}`}
        className={`${styles["calendar-cell"]} ${styles[isToday ? "today" : ""]}`}
        onClick={() => onDateClick(currentDateFormatted)}  // Passing the formatted date
      >
        <span>{i}</span>
        {eventCount > 0 && (
          <div className={styles["badge-wrapper"]}>
            <div className={styles["event-badge"]} title={`Events on this date: ${eventCount}`}>{eventCount}</div>
          </div>
        )}
      </div>
    );
  }

  return <div className={styles["calendar-grid"]}>{days}</div>;
};

export default React.memo(CalendarGrid);
