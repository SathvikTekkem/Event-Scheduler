import React from "react";
import { CalendarHeaderProps } from "@/pages/interfaces";
import styles from "../styles/CalendarHeader.module.css"

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  date,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
}) => {
  return (
    <div className={styles["calendar-header"]}>
      <button onClick={onPrevYear}>{"<<"}</button>
      <button onClick={onPrevMonth}>{"<"}</button>
      <span className={styles["calendar-month-title"]}>
        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
      </span>
      <button onClick={onNextMonth}>{">"}</button>
      <button onClick={onNextYear}>{">>"}</button>
    </div>
  );
};

export default React.memo(CalendarHeader);
