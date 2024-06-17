import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios'; // Import Axios

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Event: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [eventName, setEventName] = useState<string>('');
  const [eventVenue, setEventVenue] = useState<string>('');
  const [eventCapacity, setEventCapacity] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchEvents(); // Fetch events when component mounts
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/events');
      if (response.status === 200) {
        const data = response.data;
        const formattedEvents = data.map((event: any) => ({
          id: event.e_id,
          title: event.e_name,
          start: new Date(event.e_startdate),
          end: new Date(event.e_enddate),
        }));
        setEvents(formattedEvents);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setStartDate(start);
    setEndDate(end);
    setSelectedDate(start);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/admin/createEvent', {
        e_name: eventName,
        e_vanue: eventVenue,
        e_startdate: startDate,
        e_enddate: endDate,
        e_capacity: eventCapacity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const eventData = response.data;
        console.log('Event created:', eventData);
        setEvents([...events, eventData]);
        setEventName('');
        setEventVenue('');
        setEventCapacity(undefined);
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleSelectEvent = (event: any) => {
    console.log('Selected Event:', event);
  };

  const eventsOnSelectedDate = events.filter((event) => {
    const eventDate = moment(event.start).format('YYYY-MM-DD');
    const selectedDateFormatted = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : null;
    return eventDate === selectedDateFormatted;
  });

  return (
    <div className="container mt-4">
      <h2>Select Date Range:</h2>
      <Calendar
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />

      {startDate && endDate && (
        <div className="mt-4">
          <h3>Selected Start Date: {moment(startDate).format('YYYY-MM-DD HH:mm')}</h3>
          <h3>Selected End Date: {moment(endDate).format('YYYY-MM-DD HH:mm')}</h3>

          <div className="form-group">
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              className="form-control"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventVenue">Event Venue:</label>
            <input
              type="text"
              id="eventVenue"
              className="form-control"
              value={eventVenue}
              onChange={(e) => setEventVenue(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventCapacity">Event Capacity:</label>
            <input
              type="number"
              id="eventCapacity"
              className="form-control"
              value={eventCapacity ?? ''}
              onChange={(e) => setEventCapacity(parseInt(e.target.value))}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Create Event
          </button>
        </div>
      )}

      {selectedDate && (
        <div className="mt-4">
          <h2>Events on Selected Date ({moment(selectedDate).format('YYYY-MM-DD')}):</h2>
          {eventsOnSelectedDate.length === 0 ? (
            <p>No events on this date.</p>
          ) : (
            <ul className="list-group">
              {eventsOnSelectedDate.map((event, index) => (
                <li key={index} className="list-group-item">
                  <strong>{event.title}</strong> - {moment(event.start).format('HH:mm')} to{' '}
                  {moment(event.end).format('HH:mm')}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Event;
