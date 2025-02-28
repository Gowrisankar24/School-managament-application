import React from 'react';
import { Announcements } from '@/components/Announcements';
import { ScheduleBigCalendar } from '@/components/ScheduleBigCalendar';
import { client } from '@/sanity/lib/client';
import {
    ANNOUNCEMENTS_LIST_COUNT_ALL,
    ANNOUNCEMENTS_LIST_QUERY,
    STUDENTS_SCHEDULE_TIMINGS,
} from '@/sanity/lib/queries';

const TeacherPage = async () => {
    const [totalAnnounceMentlist] = await Promise.all([client.fetch(ANNOUNCEMENTS_LIST_COUNT_ALL)]);
    const [TeachersScheduleTiming, announceMentData] = await Promise.all([
        client.fetch(STUDENTS_SCHEDULE_TIMINGS, {
            id: 'all',
        }),
        client.fetch(ANNOUNCEMENTS_LIST_QUERY, {
            start: 0,
            limit: totalAnnounceMentlist,
        }),
    ]);
    const ScheduleData = TeachersScheduleTiming?.flatMap(
        (d: { [key: string]: string }) => d?.ScheduleTime,
    );
    return (
        <div className="h-[90%] p-4 flex flex-1 gap-4 flex-col xl:flex-row">
            {/* Left */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule</h1>
                    <ScheduleBigCalendar scheduleData={ScheduleData} />
                </div>
            </div>

            {/* right */}
            <div className="w-full h-full xl:w-1/3 flex flex-col gap-8">
                <Announcements announcementData={announceMentData} />
            </div>
        </div>
    );
};

export default TeacherPage;
