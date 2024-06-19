import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const localizer = momentLocalizer(moment);

const Event: React.FC = () => {   
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState<string>('');
  const [eventVenue, setEventVenue] = useState<string>('');
  const [eventCapacity, setEventCapacity] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isactive, setIsactive] = useState<String>('');

  useEffect(() => {
    fetchEvents();
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
          location: event.e_vanue,
          capacity: event.e_capacity,
          is_active: event.is_active
        }));
        setEvents(formattedEvents);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setEventName(event.title);
    setEventVenue(event.location);
    setEventCapacity(event.capacity);
    setStartDate(moment(event.start).format('YYYY-MM-DDTHH:mm'));
    setEndDate(moment(event.end).format('YYYY-MM-DDTHH:mm'));
    setIsactive(event.is_active);
    setShowModal(true);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setStartDate(moment(start).format('YYYY-MM-DDTHH:mm'));
    setEndDate(moment(end).format('YYYY-MM-DDTHH:mm'));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setEventName('');
    setEventVenue('');
    setEventCapacity(undefined);
    setStartDate('');
    setEndDate('');
    setIsactive('');
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      let response;
      if (selectedEvent) {
        response = await axios.put(`http://localhost:8000/api/admin/updateEvent/${selectedEvent.id}`, {
          e_name: eventName,
          e_vanue: eventVenue,
          e_startdate: moment(startDate).toISOString(),
          e_enddate: moment(endDate).toISOString(),
          e_capacity: eventCapacity,
          isactive: isactive
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post('http://localhost:8000/api/admin/createEvent', {
          e_name: eventName,
          e_vanue: eventVenue,
          e_startdate: moment(startDate).toISOString(),
          e_enddate: moment(endDate).toISOString(),
          e_capacity: eventCapacity,
          isactive: isactive
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.status === 200) {
        const eventData = response.data;
        console.log('Event action successful:', eventData);
        if (selectedEvent) {
          const updatedEvents = events.map(event => event.id === selectedEvent.id ? eventData : event);
          setEvents(updatedEvents);
        } else {
          setEvents([...events, eventData]);
        }
        setShowModal(false);
        setSelectedEvent(null);
        setEventName('');
        setEventVenue('');
        setEventCapacity(undefined);
        setStartDate('');
        setEndDate('');
        fetchEvents();
      } else {
        console.error('Failed to perform event action');
      }
    } catch (error) {
      console.error('Error performing event action:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Events Calendar</h2>
      <Calendar
        localizer={localizer}
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? 'Update Event' : 'Create New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="datetime-local"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="datetime-local"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {selectedEvent ? 'Save Changes' : 'Create Event'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Event;