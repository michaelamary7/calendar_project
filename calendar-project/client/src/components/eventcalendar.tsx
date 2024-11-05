// src/components/EventCalendar.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the default styles

// Setup the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

// Define the types for the event data
interface EventData {
  id?: number; // id might not be required initially
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  start?: Date;
  end?: Date;
}

// Define props for AddEventForm
interface AddEventFormProps {
  onEventAdded: (newEvent: EventData) => void;
}

// AddEventForm Component
const AddEventForm: React.FC<AddEventFormProps> = ({ onEventAdded }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData: EventData = { title, description, start_time: startTime, end_time: endTime, location };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('yourToken')}`, // Get token from local storage
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const newEvent = await response.json();
      onEventAdded(newEvent); // Call the parent function to update the event list

      // Optionally reset the form
      setTitle('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      setLocation('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button type="submit">Add Event</button>
    </form>
  );
};

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);

  // Fetch events from your API and external holiday API
  const fetchEvents = async () => {
    try {
      // Fetch user events
      const response = await fetch('http://localhost:3000/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('yourToken')}`, // Get token from local storage
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const userEvents: EventData[] = await response.json();

      // Fetch holidays from the external API
      const holidayResponse = await fetch(`https://calendarific.com/api/v2/holidays?api_key=aQZGn0v589N9AT68YoL7RaduBoyiUAG9&country=US&year=2024`);
      if (!holidayResponse.ok) {
        throw new Error('Failed to fetch holidays');
      }
      const holidays = await holidayResponse.json();

      // Combine user events and holidays
      const combinedEvents = userEvents.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start_time: event.start_time,
        end_time: event.end_time,
        location: event.location,
        start: new Date(event.start_time),
        end: new Date(event.end_time),
      }));

      setEvents(combinedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventAdded = (newEvent: EventData) => {
    // Update the state with the newly added event
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, start: new Date(newEvent.start_time), end: new Date(newEvent.end_time) },
    ]);
  };

  return (
    <div style={{ height: 600 }}>
      <AddEventForm onEventAdded={handleEventAdded} />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
      />
    </div>
  );
};

export default EventCalendar;