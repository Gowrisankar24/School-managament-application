import React from 'react';
import { MdOutlineMessage } from 'react-icons/md';
import { GrAnnounce } from 'react-icons/gr';
import { FaCircleUser } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';

export const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <CiSearch className="text-lg" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-60 p-2 bg-transparent outline-none"
                />
            </div>

            {/* user and icons */}
            <div className="flex items-center gap-6 justify-end w-full">
                <div className=" bg-white rounded-full flex justify-center items-center cursor-pointer p-2">
                    <MdOutlineMessage className="text-lg" />
                </div>
                <div className=" bg-white rounded-full flex justify-center items-center cursor-pointer p-2 relative">
                    <GrAnnounce className="text-lg" />
                    <span className=" absolute -top-3 -right-3 flex items-center justify-center bg-orange-500 text-white rounded-full w-5 h-5">
                        1
                    </span>
                </div>
                <div className="flex  flex-col">
                    <span className="text-xs leading-3 font-medium">John Doe</span>
                    <span className="text-[10px] text-gray-500 text-right">Admin</span>
                </div>
                <FaCircleUser className="text-3xl text-blue-400" />
            </div>
        </div>
    );
};
