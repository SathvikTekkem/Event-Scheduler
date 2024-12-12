import React from "react";
import "./CalendarHeader.css"

interface CalendarHeaderProps {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
}) => {
  return (
    <div className="calendar-header">
      <button onClick={onPrevYear}>{"<<"}</button>
      <button onClick={onPrevMonth}>{"<"}</button>
      <span className="calendar-month-title">
        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
      </span>
      <button onClick={onNextMonth}>{">"}</button>
      <button onClick={onNextYear}>{">>"}</button>
    </div>
  );
};

export default React.memo(CalendarHeader);
