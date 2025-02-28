import React from 'react';
import { Announcements } from '@/components/Announcements';
import { EventCalendar } from '@/components/EventCalendar';
import { ScheduleBigCalendar } from '@/components/ScheduleBigCalendar';
import { client } from '@/sanity/lib/client';
import {
    ANNOUNCEMENTS_LIST_COUNT_ALL,
    ANNOUNCEMENTS_LIST_QUERY,
    EVENTS_LIST_QUERY,
    EVENTS_LIST_QUERY_ALL_COUNT,
    STUDENTS_SCHEDULE_TIMINGS,
} from '@/sanity/lib/queries';

const StudentPage = async ({ searchParams }: { searchParams: Promise<{ date: Date }> }) => {
    const { date } = await searchParams;
    const [totalAnnounceMentlist, eventsTotalCount] = await Promise.all([
        client.fetch(ANNOUNCEMENTS_LIST_COUNT_ALL),
        client.fetch(EVENTS_LIST_QUERY_ALL_COUNT),
    ]);
    const [studentScheduleTimingData, announceMentData, eventsData, modalEventsData] =
        await Promise.all([
            client.fetch(STUDENTS_SCHEDULE_TIMINGS, {
                id: 'all',
            }),
            client.fetch(ANNOUNCEMENTS_LIST_QUERY, {
                start: 0,
                limit: totalAnnounceMentlist,
            }),
            client.fetch(EVENTS_LIST_QUERY, {
                start: 0,
                limit: 2,
            }),
            client.fetch(EVENTS_LIST_QUERY, {
                start: 0,
                limit: eventsTotalCount,
            }),
        ]);

    const ScheduleData = studentScheduleTimingData?.flatMap(
        (d: { [key: string]: string }) => d?.ScheduleTime,
    );
    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* Left */}
            <div className="w-full  xl:w-2/3">
                <div className=" h-[1200px] bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Student`s Schedule</h1>
                    <ScheduleBigCalendar scheduleData={ScheduleData} />
                </div>
            </div>

            {/* right */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <EventCalendar data={eventsData} modalData={modalEventsData} />
                <Announcements announcementData={announceMentData} />
            </div>
        </div>
    );
};

export default StudentPage;
