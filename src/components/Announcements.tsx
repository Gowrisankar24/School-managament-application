import dynamic from 'next/dynamic';
import React from 'react';
export interface AnnouncementProps {
    _id: string;
    title: string;
    description: string;
    date: Date | null;
}
export const Announcements = async ({
    announcementData,
}: {
    announcementData: AnnouncementProps[];
}) => {
    const AnnouncementModal = dynamic(() => import(`./AnnouncementModal`), {
        loading: () => <h1>Loading...</h1>,
    });
    const ANNOUNCEMENT_COLORS = ['bg-lightSky', 'bg-lightYellow', 'bg-paleYellow', 'bg-tableHover'];
    const getTop3Data = announcementData?.slice(0, 3);
    return (
        <div className="relative bg-white rounded-md p-3 w-full h-full">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl my-4">Announcements</h1>
                {/* announcment Modal popup */}
                {announcementData?.length > 3 && (
                    <AnnouncementModal announceMentTotalData={announcementData} />
                )}
            </div>

            {/* announcements */}
            {announcementData?.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {getTop3Data?.map((d: any, index: number) => {
                        return (
                            <div
                                className={`${ANNOUNCEMENT_COLORS[index]} rounded-md p-4`}
                                key={d?._id}
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="font-medium">{d?.title}</h2>
                                    <span className="bg-white px-2 py-1 rounded-md text-xs text-gray-400">
                                        {d?.date}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-600 mt-1">
                                    {d?.description.length > 50
                                        ? `${d?.description.slice(0, 50)}...`
                                        : d?.description}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <span className="flex justify-center text-center">No Announcements Listed</span>
            )}
        </div>
    );
};
