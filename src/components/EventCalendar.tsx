'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BsThreeDots } from 'react-icons/bs';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const events = [
    {
        id: 1,
        title: 'Festivals',
        time: '12:00 PM - 1:00 PM',
        description:
            "Celebrate a community's unique aspects, such as the Chokkanathaswamy Festival, Muthalamman Festival, and Mariamman Festival",
    },
    {
        id: 2,
        title: 'Ceremonies',
        time: '2:00 PM - 4:00 PM',
        description: 'Rituals performed on special occasions',
    },
    {
        id: 3,
        title: 'Parties',
        time: '4:00 PM - 6:00 PM',
        description: 'Social, recreational, or corporate events',
    },
];
export const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div className="bg-white rounded-md p-3">
            <Calendar onChange={onChange} value={value} />

            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg my-4">Events</h1>
                <BsThreeDots className="text-lg" />
            </div>

            <div className="flex flex-col gap-4">
                {/* events */}

                {events?.map(event => (
                    <div
                        className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lightBlue even:border-t-lightSky"
                        key={event?.id}
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold text-gray-500">{event?.title}</h1>
                            <span className="text-gray-300 text-xs">{event?.time}</span>
                        </div>
                        <p className="mt-2 text-gray-400 text-sm">{event?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
