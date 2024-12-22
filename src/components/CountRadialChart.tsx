'use client';

import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { BsThreeDots } from 'react-icons/bs';
import Image from 'next/image';
export const CountRadialChart = () => {
    const data = [
        {
            name: 'Total',
            count: 106,
            fill: 'white',
        },
        {
            name: 'Boys',
            count: 53,
            fill: '#84baf5',
        },
        {
            name: 'Girls',
            count: 53,
            fill: '#edd51c',
        },
    ];

    return (
        <div className="bg-white rounded-xl p-4 w-full h-full">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Students</h1>
                <BsThreeDots className="text-lg" />
            </div>

            {/* Charts Content */}
            <div className="w-full h-[75%] relative">
                <ResponsiveContainer>
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="100%"
                        barSize={35}
                        data={data}
                    >
                        <RadialBar background dataKey="count" />
                    </RadialBarChart>
                </ResponsiveContainer>
                <Image
                    src={'/images.png'}
                    alt="Label"
                    width={40}
                    height={40}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            {/* bottom chart */}
            <div className="flex justify-center gap-16">
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 rounded-full bg-lightSky" />
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-sm text-gray-400">Boys (55%)</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 rounded-full bg-lightYellow" />
                    <h1 className="font-bold">1,234</h1>
                    <h2 className="text-sm text-gray-400">Girls (45%)</h2>
                </div>
            </div>
        </div>
    );
};
