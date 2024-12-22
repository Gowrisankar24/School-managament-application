import React from 'react';
import { CiSearch } from 'react-icons/ci';

export const TableSearchCompo = () => {
    return (
        <div className="w-full flex md:w-auto items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <CiSearch className="text-lg" />
            <input
                type="text"
                placeholder="Search..."
                className="w-60 p-2 bg-transparent outline-none"
            />
        </div>
    );
};
