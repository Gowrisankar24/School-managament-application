import { Announcements } from '@/components/Announcements';
import { AttendanceChart } from '@/components/AttendanceChart';
import { CountRadialChart } from '@/components/CountRadialChart';
import { EventCalendar } from '@/components/EventCalendar';
import { FinanceChart } from '@/components/FinanceChart';
import { MiniUserCard } from '@/components/MiniUserCard';
import React from 'react';

const AdminPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* Left */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* minicards */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <MiniUserCard type="Student" />
                    <MiniUserCard type="Teacher" />
                    <MiniUserCard type="Parent" />
                    <MiniUserCard type="Staff" />
                </div>

                {/* middle charts */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* Radial count chart */}
                    <div className="w-full lg:w-1/3 h-[450px] ">
                        <CountRadialChart />
                    </div>

                    {/* Attendance chart */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart />
                    </div>
                </div>
                {/* bottom chart */}
                <div className="w-full h-[500px]">
                    <FinanceChart />
                </div>
            </div>

            {/* right */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    );
};

export default AdminPage;
