'use client';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from 'recharts';
export const AttendanceChart = () => {
    const data = [
        {
            name: 'Mon',
            present: 60,
            absent: 24,
        },
        {
            name: 'Tue',
            present: 45,
            absent: 56,
        },
        {
            name: 'Wed',
            present: 20,
            absent: 60,
        },
        {
            name: 'Thu',
            present: 78,
            absent: 38,
        },
        {
            name: 'Fri',
            present: 18,
            absent: 40,
        },
    ];

    return (
        <div className="bg-white rounded-xl p-4 w-full h-full">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Attendance</h1>
                <BsThreeDots className="text-lg" />
            </div>

            {/* Charts Content */}

            <ResponsiveContainer width={'100%'} height="90%">
                <BarChart width={500} height={300} data={data} barSize={20}>
                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#d1d3d5' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                    <YAxis tick={{ fill: '#d1d3d5' }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '10px', borderColor: 'lightgray' }} />
                    <Legend
                        align="left"
                        verticalAlign="top"
                        wrapperStyle={{ paddingTop: '20px', paddingBottom: '40px' }}
                    />
                    <Bar
                        dataKey="present"
                        fill="#84baf5"
                        // activeBar={<Rectangle fill='pink' stroke='blue' />}
                        legendType="circle"
                        radius={[10, 10, 0, 0]}
                    />
                    <Bar
                        dataKey="absent"
                        fill="#edd51c"
                        // activeBar={<Rectangle fill='gold' stroke='purple' />}
                        legendType="circle"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
