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

export const FinanceChart = ({
    financeplotData,
}: {
    financeplotData: Array<{ [key: string]: string | number }>;
}) => {
    return (
        <div className="bg-white rounded-xl p-4 w-full h-full">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Finance</h1>
            </div>

            {/* Charts Content */}
            <ResponsiveContainer width="100%" height="85%">
                <LineChart width={500} height={300} data={financeplotData}>
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
                    <Line type="monotone" dataKey="Income" stroke="#84baf5" strokeWidth={3} />
                    <Line type="monotone" dataKey="Expense" stroke="#edd51c" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
