'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendarContainer = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState<boolean>(false);
    const [value, onChange] = useState<Value>(new Date());
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (value instanceof Date && isClient) {
            router.push(`?date=${moment(value).format('YYYY-MM-DD')}`);
        }
    }, [value]);
    return (
        <div>
            {isClient ? (
                <Calendar onChange={onChange} value={value} />
            ) : (
                <span className="flex items-center justify-center">Loading..</span>
            )}
        </div>
    );
};

export default EventCalendarContainer;
