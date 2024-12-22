import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
export const MiniUserCard = ({ type }: { type: string }) => {
  return (
    <div className='rounded-2xl odd:bg-lightSky even:bg-lightYellow p-4 flex-1 min-w-[130px]'>
      <div className='flex justify-between items-center'>
        <span className='text-[10px] bg-white px-2 py-1 rounded-full text-green-600'>
          12/25/2024
        </span>
        <BsThreeDots className='text-lg' />
      </div>
      <h1 className='text-2xl font-semibold my-4'>1,674</h1>
      <h2 className='text-sm font-medium text-gray-500'>{type}</h2>
    </div>
  );
};
