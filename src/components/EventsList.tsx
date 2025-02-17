'use client';

import { Box, Modal, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';

const EventsList = ({
    data,
    modalData,
}: {
    data: Array<{ [key: string]: string }>;
    modalData: Array<{ [key: string]: string }>;
}) => {
    const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
    return (
        <>
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg my-4">Events</h1>

                <span
                    className="text-sm text-gray-400 cursor-pointer"
                    onClick={() => setIsEventModalOpen(true)}
                >
                    View All
                </span>
            </div>

            <div className="flex flex-col gap-4">
                {/* events */}

                {data?.map(event => (
                    <div
                        className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lightBlue even:border-t-lightSky"
                        key={event?._id}
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold text-gray-500">{event?.title}</h1>
                            <span className="text-gray-300 text-xs">
                                {moment(event?.startTime).format('HH:mm A')} -{' '}
                                {moment(event?.endTime).format('HH:mm A')}
                            </span>
                        </div>
                        <p className="mt-2 text-gray-400 text-sm">
                            {event?.description?.length > 60
                                ? `${event?.description?.slice(0, 60)}...`
                                : event?.description}
                        </p>
                    </div>
                ))}
            </div>
            <Modal
                open={isEventModalOpen}
                onClose={() => setIsEventModalOpen(false)}
                className="flex items-center justify-center !border-none"
            >
                <Box
                    sx={{
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'none',
                    }}
                    className="bg-white rounded-md w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] !border-none"
                >
                    <Box sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <Typography
                            variant="caption"
                            className="font-semibold bg-lightSky p-2 relative rounded-t-md flex flex-row items-center"
                        >
                            <h3 className="text-lg mx-1"> Events List</h3>
                            <span
                                className="absolute right-2 cursor-pointer"
                                onClick={() => setIsEventModalOpen(false)}
                            >
                                <MdCancel className="text-xl" />
                            </span>
                        </Typography>
                    </Box>
                    <Box className="flex-1 overflow-y-auto side-bar rounded-sm !border-none">
                        <div className="flex flex-col gap-2 !border-none">
                            <div className="flex flex-col gap-2 !border-none">
                                {modalData?.map((d: { [key: string]: string }, index: number) => {
                                    return (
                                        <div
                                            className={`rounded-md p-4 border-collapse border-b-2 border-b-gray-200`}
                                            key={d?._id}
                                        >
                                            <div className="flex justify-between items-center">
                                                <h2 className="font-medium">{d?.title}</h2>
                                                <span className="bg-gray-400 px-2 py-1 rounded-md text-xs text-white">
                                                    {moment(d?.startTime).format('HH:mm A')} -{' '}
                                                    {moment(d?.endTime).format('HH:mm A')}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-600 mt-1">
                                                {d?.description.length > 80
                                                    ? `${d?.description.slice(0, 70)}...`
                                                    : d?.description}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default EventsList;
