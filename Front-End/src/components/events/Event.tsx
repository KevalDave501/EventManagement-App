import React, { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Event:React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<ValuePiece>(null);

  const handleDateClick = (date: ValuePiece) => setSelectedDate(date);

  return (
    <div>
      <h2>Selected Date: {selectedDate ? selectedDate.toString() : 'None'}</h2>
      <Calendar onChange={onChange} value={value} onClickDay={handleDateClick} />
    </div>
  );
}

export default Event;