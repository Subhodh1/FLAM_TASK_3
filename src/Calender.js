import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import EventPopup from './EventPopup';
import './Calender.css';
import './App.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

const initialEvents = [
  {
    id: 1,
    title: "Meeting with Hari",
    start: new Date(moment().add(1, 'days').set({ hour: 10, minute: 0 })),
    end: new Date(moment().add(1, 'days').set({ hour: 11, minute: 0 })),
    recurrence: "none",
    color: "#ADD8E6"
  },
  {
    id: 2,
    title: "Meeting with Aditi",
    start: new Date(moment().subtract(9, 'days').set({ hour: 12, minute: 0 })),
    end: new Date(moment().subtract(9, 'days').set({ hour: 13, minute: 0 })),
    recurrence: "daily",
    color: "#DDA0DD"
  },
  {
    id: 3,
    title: "Meeting with Raksh",
    start: new Date(moment().subtract(20, 'days').set({ hour: 14, minute: 0 })),
    end: new Date(moment().subtract(20, 'days').set({ hour: 15, minute: 0 })),
    recurrence: "weekly",
    color: "#FFCCCB"
  },
  {
    id: 4,
    title: "Meeting with Subham",
    start: new Date(moment().subtract(15, 'days').set({ hour: 8, minute: 0 })),
    end: new Date(moment().subtract(15, 'days').set({ hour: 9, minute: 0 })),
    recurrence: "monthly",
    color: "#FFB6C1"
  }
];

export default function Calender() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents && JSON.parse(storedEvents).length > 0) {
      const parsed = JSON.parse(storedEvents);
      const loadedEvents = parsed.map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end),
        color: ev.color || getRandomColor()
      }));
      setEvents(loadedEvents);
    } else {
      setEvents(initialEvents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const getRandomColor = () => {
    const colors = [
      "#ADD8E6", "#90EE90", "#FFCCCB", "#FFD580", "#DDA0DD",
      "#B0E0E6", "#F5DEB3", "#E6E6FA", "#F0E68C", "#FFB6C1"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setIsOpenEvent(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    setIsOpenEvent(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents(prev =>
        prev.map(ev => (ev.id === eventData.id ? { ...eventData, color: ev.color } : ev))
      );
    } else {
      const newEvent = {
        ...eventData,
        id: Date.now(),
        color: getRandomColor()
      };
      setEvents(prev => [...prev, newEvent]);
    }

    setIsOpenEvent(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (id) => {
    setEvents(prev => prev.filter(ev => ev.id !== id));
    setIsOpenEvent(false);
    setSelectedEvent(null);
  };

  const handleAddEventClick = () => {
    setSelectedDate(new Date());
    setSelectedEvent(null);
    setIsOpenEvent(true);
  };

  const handleEventDrop = ({ event, start, end }) => {
    const updated = events.map(ev =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    setEvents(updated);
  };

  const handleEventResize = ({ event, start, end }) => {
    const updated = events.map(ev =>
      ev.id === event.id ? { ...ev, start, end } : ev
    );
    setEvents(updated);
  };

  const recurrenceEmoji = {
    daily: " 🔁",
    weekly: " 🔂",
    monthly: " 🔄",
    none: ""
  };

  const CustomEvent = ({ event }) => (
    <div style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
      {event.title}{recurrenceEmoji[event.recurrence || "none"]}
    </div>
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events
    .filter(ev => ev.start >= today)
    .sort((a, b) => a.start - b.start);

  const formatDateShort = (date) => moment(date).format("MMM D");

  return (
    <div className="bg-[#fef9e7] min-h-screen p-4 border-t-2 border-b-2 border-black animate-fade-in">
      <h1 className="text-center text-4xl font-bold text-gray-800 py-6 border-b-2 border-black animate-fade-in">
        📅 My Event Calendar
      </h1>

      <div className="flex justify-between px-4 gap-4 mt-10" style={{ minHeight: '80vh' }}>
        <div className="w-1/5 p-4 bg-gray-100 rounded-lg border-2 border-black overflow-y-auto animate-slide-in-left" style={{ maxHeight: '80vh' }}>
          <h3 className="text-lg font-semibold mb-2">📌 Upcoming</h3>
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-700">No upcoming events.</p>
          ) : (
            <ul className="text-sm text-gray-700 list-disc ml-4">
              {upcomingEvents.map(ev => (
                <li key={ev.id}>
                  🗓️ {formatDateShort(ev.start)} – {ev.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-3/5 relative animate-slide-in-up">
          <div className="bg-[#f6ecff] p-6 rounded-2xl border-2 border-black shadow-md">
            <DnDCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              popup
              onEventDrop={handleEventDrop}
              onEventResize={handleEventResize}
              resizable
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              style={{ height: "90vh" }}
              className="rbc-calendar !text-gray-800"
              views={["month", "week", "day"]}
              timeslots={1}
              step={60}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color || "#e0e0e0",
                  color: "black",
                  borderRadius: "5px",
                  border: "none",
                  padding: "4px",
                  whiteSpace: "normal",
                  fontWeight: "500",
                },
              })}
              components={{
                event: CustomEvent
              }}
            />
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition-all duration-300 block mx-auto animate-fade-in"
          >
            ⬅️ Go to Home
          </button>
        </div>

        <div className="w-1/5 p-4 bg-orange-100 rounded-lg border-2 border-black overflow-y-auto animate-slide-in-right" style={{ maxHeight: '80vh' }}>
          <h3 className="text-lg font-semibold mb-2">📝 Notes</h3>
          <ul className="text-sm text-gray-800 list-disc ml-4">
            <li>Check tasks before 5 PM</li>
            <li>Call Subham</li>
            <li>Prepare for meeting</li>
          </ul>
        </div>
      </div>

      {isOpenEvent && (
        <EventPopup
          isOpen={isOpenEvent}
          onClose={() => setIsOpenEvent(false)}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          date={selectedDate}
          event={selectedEvent}
        />
      )}

      <button
        onClick={handleAddEventClick}
        className="fixed bottom-10 right-10 bg-purple-700 text-white w-14 h-14 text-3xl rounded-full shadow-lg hover:bg-purple-800 transition animate-bounce"
        title="Add New Event"
      >
        +
      </button>
    </div>
  );
}
