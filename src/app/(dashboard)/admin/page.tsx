import { Announcements } from '@/components/Announcements';
import { AttendanceChart } from '@/components/AttendanceChart';
import { CountRadialChart } from '@/components/CountRadialChart';
import { EventCalendar } from '@/components/EventCalendar';
import { FinanceChart } from '@/components/FinanceChart';
import { MiniUserCard } from '@/components/MiniUserCard';
import { client } from '@/sanity/lib/client';
import {
    ANNOUNCEMENTS_LIST_COUNT_ALL,
    ANNOUNCEMENTS_LIST_QUERY,
    EVENTS_LIST_QUERY,
    EVENTS_LIST_QUERY_ALL_COUNT,
    FINANCE_CHART_QUERY,
    PARENT_LIST_BY_ALL_COUNT,
    STUDENTS_ATTENDANCE_COUNT,
    STUDENTS_COUNT_CHART,
    STUDENTS_LIST_ALL_COUNT,
    TEACHERS_LIST_ALL_COUNT,
} from '@/sanity/lib/queries';
import React from 'react';

const AdminPage = async ({ searchParams }: { searchParams: Promise<{ date: Date }> }) => {
    const { date } = await searchParams;
    const [eventsTotalCount, totalAnnounceMentData] = await Promise.all([
        client.fetch(EVENTS_LIST_QUERY_ALL_COUNT),
        client.fetch(ANNOUNCEMENTS_LIST_COUNT_ALL),
    ]);
    const [
        totalTeachersCount,
        totalStudentsCount,
        totalParentsCount,
        radialCountChart,
        eventsData,
        modalEventsData,
        attendanceCount,
        financeChartData,
        announceMentTotalData,
    ] = await Promise.all([
        client.fetch(TEACHERS_LIST_ALL_COUNT),
        client.fetch(STUDENTS_LIST_ALL_COUNT),
        client.fetch(PARENT_LIST_BY_ALL_COUNT),
        client.fetch(STUDENTS_COUNT_CHART),
        client.fetch(EVENTS_LIST_QUERY, {
            start: 0,
            limit: 2,
        }),
        client.fetch(EVENTS_LIST_QUERY, {
            start: 0,
            limit: eventsTotalCount,
        }),
        client.fetch(STUDENTS_ATTENDANCE_COUNT),
        client.fetch(FINANCE_CHART_QUERY),
        client.fetch(ANNOUNCEMENTS_LIST_QUERY, {
            start: 1,
            limit: totalAnnounceMentData,
        }),
    ]);
    const AttendanceCountData = attendanceCount[0]?.Weekdays?.map((d: any) => ({
        name: d?.days,
        Present: d?.present,
        Absent: d?.absent,
    }));

    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* Left */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* minicards */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <MiniUserCard type="Student" count={totalStudentsCount} date={date} />
                    <MiniUserCard type="Teacher" count={totalTeachersCount} date={date} />
                    <MiniUserCard type="Parent" count={totalParentsCount} date={date} />
                    <MiniUserCard type="admin" count={1} date={date} />
                </div>

                {/* middle charts */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* Radial count chart */}
                    <div className="w-full lg:w-1/3 h-[450px] ">
                        <CountRadialChart chartData={radialCountChart} />
                    </div>

                    {/* Attendance chart */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart attendanceData={AttendanceCountData} />
                    </div>
                </div>
                {/* bottom chart */}
                <div className="w-full h-[500px]">
                    <FinanceChart financeplotData={financeChartData[0]?.monthData} />
                </div>
            </div>

            {/* right */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalendar data={eventsData} modalData={modalEventsData} />
                <Announcements announcementData={announceMentTotalData} />
            </div>
        </div>
    );
};

export default AdminPage;
