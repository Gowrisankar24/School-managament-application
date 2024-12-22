'use client';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export const FinanceChart = () => {
    const data = [
        {
            name: 'Jan',
            income: 4000,
            expense: 2400,
        },
        {
            name: 'Feb',
            income: 3000,
            expense: 1398,
        },
        {
            name: 'Mar',
            income: 2000,
            expense: 9800,
        },
        {
            name: 'Apr',
            income: 2780,
            expense: 3908,
        },
        {
            name: 'May',
            income: 1890,
            expense: 4800,
        },
        {
            name: 'Jun',
            income: 2390,
            expense: 3800,
        },
        {
            name: 'Jul',
            income: 3490,
            expense: 4300,
        },
        {
            name: 'Aug',
            income: 4490,
            expense: 3000,
        },
        {
            name: 'Sep',
            income: 3900,
            expense: 4100,
        },
        {
            name: 'Oct',
            income: 3590,
            expense: 4900,
        },
        {
            name: 'Nov',
            income: 5690,
            expense: 5000,
        },
        {
            name: 'Dec',
            income: 2490,
            expense: 3300,
        },
    ];
    return (
        <div className="bg-white rounded-xl p-4 w-full h-full">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Finance</h1>
                <BsThreeDots className="text-lg" />
            </div>

            {/* Charts Content */}
            <ResponsiveContainer width="100%" height="90%">
                <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#d1d3d5' }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                    />
                    <YAxis
                        tick={{ fill: '#d1d3d5' }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                    />
                    <Tooltip />
                    <Legend
                        align="center"
                        verticalAlign="top"
                        wrapperStyle={{ paddingTop: '10px', paddingBottom: '20px' }}
                    />
                    <Line type="monotone" dataKey="income" stroke="#84baf5" strokeWidth={3} />
                    <Line type="monotone" dataKey="expense" stroke="#edd51c" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
