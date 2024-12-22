'use client';
import React, { useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { calendarEvents } from '@/lib/data';

const localizer = momentLocalizer(moment);

export const ScheduleBigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor='start'
      endAccessor='end'
      view={view}
      views={['work_week', 'day']}
      style={{ height: '98%' }}
      onView={handleChangeView}
      min={new Date(2024, 1, 0, 8, 0, 0)}
      max={new Date(2024, 1, 0, 18, 0, 0)}
    />
  );
};
