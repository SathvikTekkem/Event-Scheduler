import React from "react";
import "./Calendar.css";
import "./AddEventModal.css";

interface AddEventModalProps {
  addEventDate: {
    day: number;
    month: number;
    year: number;
  };
  setAddEventDate: React.Dispatch<React.SetStateAction<{
    day: number;
    month: number;
    year: number;
  }>>;
  addEventDescription: string;
  setAddEventDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  addEventDate,
  setAddEventDate,
  addEventDescription,
  setAddEventDescription,
  onSubmit,
  onClose,
}) => {
  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i); // 5 years before and after current year
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  // Getting valid days for the selected month and year
  const getValidDays = (month: number, year: number) => {
    return Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(e.target.value);
    const daysInSelectedMonth = daysInMonth(selectedMonth, addEventDate.year);

    // checking if day is within the valid range for the new month
    const newDay = addEventDate.day > daysInSelectedMonth ? daysInSelectedMonth : addEventDate.day;

    setAddEventDate((prev) => ({
      ...prev,
      month: selectedMonth,
      day: newDay,
    }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value);
    const daysInSelectedMonth = daysInMonth(addEventDate.month, selectedYear);

    // checking if day is within the valid range for the new year
    const newDay = addEventDate.day > daysInSelectedMonth ? daysInSelectedMonth : addEventDate.day;

    setAddEventDate((prev) => ({
      ...prev,
      year: selectedYear,
      day: newDay,
    }));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = parseInt(e.target.value);
    setAddEventDate((prev) => ({
      ...prev,
      day: selectedDay,
    }));
  };

  const handleAddEvent = () => {
    onSubmit(); // Calling the add event logic
    onClose(); // Closing the modal immediately after
  };

  return (
    <div className="modal-add-event">
      <div className="modal-add-event-content">
        <h3>Schedule an Event</h3>
        <div className="form-group-day">
          <label>Day:</label>
          <select
            value={addEventDate.day}
            onChange={handleDayChange}
          >
            {getValidDays(addEventDate.month, addEventDate.year).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group-month">
          <label>Month:</label>
          <select value={addEventDate.month} onChange={handleMonthChange}>
            {months.map((month) => (
              <option key={month} value={month}>
                {monthNames[month - 1]} {/* Converting number to month name */}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group-year">
          <label>Year:</label>
          <select value={addEventDate.year} onChange={handleYearChange}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Event Description:</label>
          <input
            type="text"
            value={addEventDescription}
            onChange={(e) => setAddEventDescription(e.target.value)}
            placeholder="Enter event description"
          />
        </div>
        <div>
          <button className="modal-btn-add-event" onClick={handleAddEvent}>
            Add Event
          </button>
          <button className="modal-btn-close-modal" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
