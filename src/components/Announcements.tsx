import React from 'react';

export const Announcements = () => {
  return (
    <div className='bg-white rounded-md p-3'>
      {/* title */}
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-xl my-4'>Announcements</h1>
        <span className='text-sm text-gray-400'>View All</span>
      </div>

      {/* announcements */}
      <div className='flex flex-col gap-4'>
        <div className='bg-lightSky rounded-md p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='font-medium'>Lorem, ipsum dolor sit amet.</h2>
            <span className='bg-white px-2 py-1 rounded-md text-xs text-gray-400'>
              12-25-2024
            </span>
          </div>
          <span className='text-xs text-gray-600 mt-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
        <div className='bg-lightBlue rounded-md p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='font-medium'>Lorem, ipsum dolor sit amet.</h2>
            <span className='bg-white px-2 py-1 rounded-md text-xs text-gray-400'>
              12-26-2024
            </span>
          </div>
          <span className='text-xs text-gray-600 mt-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
        <div className='bg-paleYellow rounded-md p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='font-medium'>Lorem, ipsum dolor sit amet.</h2>
            <span className='bg-white px-2 py-1 rounded-md text-xs text-gray-400'>
              2-25-2025
            </span>
          </div>
          <span className='text-xs text-gray-600 mt-1'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </div>
      </div>
    </div>
  );
};
