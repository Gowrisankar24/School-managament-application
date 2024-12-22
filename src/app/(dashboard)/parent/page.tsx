import React from 'react';
import { Announcements } from '@/components/Announcements';
import { ScheduleBigCalendar } from '@/components/ScheduleBigCalendar';

const PaentPage = () => {
    return (
        <div className="p-4 flex flex-1 gap-4 flex-col xl:flex-row">
            {/* Left */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule (John Doe)</h1>
                    <ScheduleBigCalendar />
                </div>
            </div>

            {/* right */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    );
};

export default PaentPage;
