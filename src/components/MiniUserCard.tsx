import moment from 'moment';
import React from 'react';

export const MiniUserCard = ({
    type,
    count,
    date,
}: {
    type: string;
    count: number;
    date: Date;
}) => {
    return (
        <div className="rounded-2xl odd:bg-lightSky even:bg-lightYellow p-4 flex-1 min-w-[130px]">
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                    {moment(date).format('YYYY-MM-DD')}
                </span>
            </div>
            <h1 className="text-2xl font-semibold my-4">{count}</h1>
            <h2 className="text-sm font-medium text-gray-500">{type}</h2>
        </div>
    );
};
