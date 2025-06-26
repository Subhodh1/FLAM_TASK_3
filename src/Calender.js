import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState } from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css"

const localizer = momentLocalizer(moment);

const initialEvents =[
    {
        id: 1,
        title: "Meeting with Hari",
        start: new Date(moment().add(1,'days').set({hour: 10, minute: 0})),
        end: new Date(moment().add(1,'days').set({hour:11,minute:0}))

    },
    {
        id: 2,
        title: "Meeting with Aditi",
        start: new Date(moment().subtract(9,'days').set({hour: 12, minute: 0})),
        end: new Date(moment().subtract(9,'days').set({hour:13,minute:0}))

    },
    {
        id: 3,
        title: "Meeting with Raksh",
        start: new Date(moment().subtract(20,'days').set({hour: 14, minute: 0})),
        end: new Date(moment().subtract(20,'days').set({hour:15,minute:0}))

    },
    {
        id: 4,
        title: "Meeting with Subham",
        start: new Date(moment().subtract(15,'days').set({hour: 8, minute: 0})),
        end: new Date(moment().subtract(15,'days').set({hour:9,minute:0}))

    },
]
export default function Calender() {
    const [events,setEvents]=useState(initialEvents)

  return (
    <div style={{marginLeft:'100px', marginRight:'100px', marginTop:'100px'}}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '77vh' }}
        />
      </div>
  )
}
