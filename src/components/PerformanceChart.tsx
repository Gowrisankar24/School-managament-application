'use client';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

export const PerformanceChart = ({ chartData }: { chartData: string[] | number[] }) => {
    const COLORS = ['#84baf5', '#edd51c'];
    const combinedVal = chartData?.map((d: any) => d.value).reduce((total, num) => total + num);
    const getpercent = (percent: number, total: number) => {
        return ((percent / total) * 10).toFixed(1);
    };
    return (
        <div className="bg-white p-4 rounded-md h-80 relative">
            <div className="flex items-center justify-between ">
                <h1 className="font-xl font-semibold">Performance</h1>
                <BsThreeDots className="text-lg" />
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        isAnimationActive={true}
                        animationBegin={200}
                        animationDuration={800}
                        animationEasing="ease-in-out"
                    >
                        {chartData?.map((d: any, index) => (
                            <Cell key={d.name} fill={COLORS[index % COLORS?.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h1 className="text-3xl font-semibold">{getpercent(combinedVal, 200)}</h1>
                <p className="text-xs text-gray-300">of max 10 score</p>
            </div>
            <h2 className="font-medium absolute bottom-20 left-0 right-0 text-center m-auto">
                {chartData?.map((d: any) => d.name)?.join(' - ')}
            </h2>
        </div>
    );
};
