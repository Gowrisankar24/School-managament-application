'use client';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendarContainer = () => {
    const router = useRouter();
    const [value, onChange] = useState<Value>(new Date());
    useEffect(() => {
        if (value) {
            router.push(`?date=${moment(value).format('YYYY-MM-DD')}`);
        }
    }, [router, value]);
    return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendarContainer;
