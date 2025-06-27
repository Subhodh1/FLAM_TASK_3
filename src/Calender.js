import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventPopup from './EventPopup';
import './Calender.css';
import './App.css';

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: "Meeting with Hari",
    start: new Date(moment().add(1, 'days').set({ hour: 10, minute: 0 })),
    end: new Date(moment().add(1, 'days').set({ hour: 11, minute: 0 })),
    color: "#ADD8E6"
  },
  {
    id: 2,
    title: "Meeting with Aditi",
    start: new Date(moment().subtract(9, 'days').set({ hour: 12, minute: 0 })),
    end: new Date(moment().subtract(9, 'days').set({ hour: 13, minute: 0 })),
    color: "#DDA0DD"
  },
  {
    id: 3,
    title: "Meeting with Rakshita",
    start: new Date(moment().subtract(20, 'days').set({ hour: 14, minute: 0 })),
    end: new Date(moment().subtract(20, 'days').set({ hour: 15, minute: 0 })),
    color: "#FFCCCB"
  },
  {
    id: 4,
    title: "Meeting with Subham",
    start: new Date(moment().subtract(15, 'days').set({ hour: 8, minute: 0 })),
    end: new Date(moment().subtract(15, 'days').set({ hour: 9, minute: 0 })),
    color: "#FFB6C1"
  },
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
      setEvents(prev => prev.map(ev => (ev.id === eventData.id ? eventData : ev)));
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

  // 🔁 Filter for today's and future events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events
    .filter(event => new Date(event.start) >= today)
    .sort((a, b) => new Date(a.start) - new Date(b.start))
    .slice(0, 5); // limit to 5 if you want

  return (
    <div className="bg-[#fef9e7] min-h-screen p-4 border-t-2 border-b-2 border-black">
      <h1 className="text-center text-4xl font-bold text-gray-800 py-6 border-b-2 border-black animate-fade-in">
        📅 My Event Calendar
      </h1>

      <p className="text-center italic text-gray-600 mt-2 mb-8 animate-fade-in">
        “Success is the sum of small efforts, repeated day in and day out.” – Robert Collier
      </p>

      <div className="flex justify-between px-4 gap-4 mt-10">
        {/* ✅ Upcoming Events - Dynamic */}
        <div className="w-1/5 p-4 bg-gray-100 rounded-lg border-2 border-black animate-slide-left">
          <h3 className="text-lg font-semibold mb-2">📌 Upcoming</h3>
          {upcomingEvents.length === 0 ? (
            <p className="text-sm italic text-gray-500">No upcoming events</p>
          ) : (
            <ul className="text-sm text-gray-700 list-disc ml-4">
              {upcomingEvents.map(ev => (
                <li key={ev.id}>
                  🗓️ {moment(ev.start).format("MMM D, h:mm A")} – {ev.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Calendar */}
        <div className="w-3/5 relative animate-fade-in">
          <div className="bg-[#f6ecff] p-6 rounded-2xl border-2 border-black shadow-md transition-all hover:shadow-xl">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              style={{ height: "80vh" }}
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
                  padding: "6px 8px",
                  fontWeight: "500",
                  whiteSpace: "normal",
                  overflow: "visible",
                  textOverflow: "unset"
                }
              })}
            />
            <style>
              {`
                .rbc-event-content {
                  white-space: normal !important;
                  overflow: visible !important;
                  text-overflow: unset !important;
                }

                .rbc-day-bg:hover {
                  background-color: #ffe8b3 !important;
                  transform: scale(1.02);
                  cursor: pointer;
                  box-shadow: 0 0 10px rgba(0,0,0,0.15);
                }
              `}
            </style>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 transition-all duration-300 block mx-auto"
          >
            ⬅️ Go to Home
          </button>
        </div>

        {/* Notes */}
        <div className="w-1/5 p-4 bg-orange-100 rounded-lg border-2 border-black animate-slide-right">
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
        className="fixed bottom-10 right-10 bg-purple-700 text-white w-14 h-14 text-3xl rounded-full shadow-lg hover:bg-purple-800 transition"
        title="Add New Event"
      >
        +
      </button>
    </div>
  );
}
