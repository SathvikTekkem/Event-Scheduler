export interface AddEventModalProps {
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

  export interface Event {
    id: string;
    date: string; // e.g., "2024-12-12"
    description: string;
  }


  export interface CalendarGridProps {
    date: Date;
    events: Event[];
    onDateClick: (formattedDate: string) => void; // Expecting a string
  }

  export interface CalendarHeaderProps {
    date: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onPrevYear: () => void;
    onNextYear: () => void;
  }


  export interface EventModalProps {
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
