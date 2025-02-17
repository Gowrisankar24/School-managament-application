'use client';
import React, { useState } from 'react';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type ScheduleDataTypes = {
    start: string;
    end: string;
    _key: string;
    title: { [key: string]: string };
    class?: { [key: string]: string };
};
const localizer = momentLocalizer(moment);

export const ScheduleBigCalendar = ({ scheduleData }: { scheduleData: ScheduleDataTypes[] }) => {
    const [view, setView] = useState<View>(Views.WORK_WEEK);
    const EventData = scheduleData?.map((data: any) => ({
        start: moment(data?.start).toDate(),
        end: moment(data?.end).toDate(),
        title: (
            <span>
                {data?.title?.subjectName} ({data?.class?.name})
            </span>
        ),
    }));
    const handleChangeView = (selectedView: View) => {
        setView(selectedView);
    };
    return (
        <>
            {scheduleData?.length > 0 ? (
                <Calendar
                    localizer={localizer}
                    events={EventData}
                    startAccessor="start"
                    endAccessor="end"
                    view={view}
                    step={45}
                    timeslots={1}
                    className="!overflow-x-hidden"
                    views={['work_week', 'day']}
                    style={{ height: '98%' }}
                    onView={handleChangeView}
                    defaultDate={moment(scheduleData[0]?.start).toDate()}
                    min={moment(scheduleData[0]?.start || new Date())
                        .set({ hour: 9, minute: 0 })
                        .toDate()}
                    max={moment(scheduleData[0]?.start || new Date())
                        .set({ hour: 16, minute: 0 })
                        .toDate()}
                />
            ) : (
                <div className="flex justify-center items-center">
                    <h2 className="text-gray-800 items-center text-xl">
                        No Schedule has been allotted
                    </h2>
                </div>
            )}
        </>
    );
};
