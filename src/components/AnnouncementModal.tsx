'use client';
import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { MdCancel } from 'react-icons/md';
import { AnnouncementProps } from './Announcements';
import moment from 'moment';

const AnnouncementModal = ({
    announceMentTotalData,
}: {
    announceMentTotalData: AnnouncementProps[];
}) => {
    const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState<boolean>(false);
    return (
        <div>
            <span
                className="text-sm text-gray-400 cursor-pointer"
                onClick={() => setIsAnnouncementModalOpen(true)}
            >
                View All
            </span>
            <Modal
                open={isAnnouncementModalOpen}
                onClose={() => setIsAnnouncementModalOpen(false)}
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
                            <h3 className="text-lg mx-1"> Announcements List</h3>
                            <span
                                className="absolute right-2 cursor-pointer"
                                onClick={() => setIsAnnouncementModalOpen(false)}
                            >
                                <MdCancel className="text-xl" />
                            </span>
                        </Typography>
                    </Box>
                    <Box className="flex-1 overflow-y-auto side-bar rounded-sm !border-none">
                        <div className="flex flex-col gap-2 !border-none">
                            {announceMentTotalData?.map((d: AnnouncementProps) => {
                                return (
                                    <div
                                        className={`rounded-md p-4 border-collapse border-b-2 border-b-gray-200`}
                                        key={d?._id}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h2 className="font-medium">{d?.title}</h2>
                                            <span className="bg-gray-400 px-2 py-1 rounded-md text-xs text-white">
                                                {moment(d?.date).format('YYYY-MM-DD')}
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
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default AnnouncementModal;
