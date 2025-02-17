'use client';
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts';
import Image from 'next/image';
import { RADIAL_BAR_COLORS } from '@/lib/data';
import { studentCountFunc } from '@/lib/utils';

export const CountRadialChart = ({
    chartData,
}: {
    chartData: Array<{ [key: string]: string }>;
}) => {
    return (
        <div className="bg-white rounded-xl p-4 w-full h-full">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Students</h1>
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
                        data={chartData}
                    >
                        <RadialBar background dataKey={'count'}>
                            {chartData?.map((entry, index) => (
                                <Cell fill={RADIAL_BAR_COLORS[index]} key={entry?.name} />
                            ))}
                        </RadialBar>
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
                    <h1 className="font-bold">{studentCountFunc(chartData, 'Boys')}</h1>
                    <h2 className="text-sm text-gray-400">
                        Boys (
                        {(() => {
                            const boysCount = Number(studentCountFunc(chartData, 'Boys'));
                            const totalCount = Number(studentCountFunc(chartData, 'Total'));
                            return ((boysCount / totalCount) * 100).toFixed(2);
                        })()}
                        % )
                    </h2>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-5 h-5 rounded-full bg-lightYellow" />
                    <h1 className="font-bold">{studentCountFunc(chartData, 'Girls')}</h1>
                    <h2 className="text-sm text-gray-400">
                        Girls (
                        {(() => {
                            const girlsCount = Number(studentCountFunc(chartData, 'Girls'));
                            const totalCount = Number(studentCountFunc(chartData, 'Total'));
                            return ((girlsCount / totalCount) * 100).toFixed(2);
                        })()}
                        % )
                    </h2>
                </div>
            </div>
        </div>
    );
};
