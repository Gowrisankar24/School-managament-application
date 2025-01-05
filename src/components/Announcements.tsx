import React from 'react';
interface AnnouncementsProps {
    _id: string;
    title: string;
    date: Date;
}
export const Announcements = ({
    announcementData,
    top3Data,
}: {
    announcementData: AnnouncementsProps;
    top3Data: AnnouncementsProps[];
}) => {
    const ANNOUNCEMENT_COLORS = ['bg-lightSky', 'bg-lightYellow', 'bg-paleYellow', 'bg-tableHover'];

    return (
        <div className="bg-white rounded-md p-3">
            {/* title */}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold text-xl my-4">Announcements</h1>
                {top3Data?.length > 4 && <span className="text-sm text-gray-400">View All</span>}
            </div>

            {/* announcements */}
            <div className="flex flex-col gap-4">
                {top3Data?.map((d: any, index: number) => {
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
                                {d?.description.length > 80
                                    ? `${d?.description.slice(0, 70)}...`
                                    : d?.description}
                            </span>
                        </div>
                    );
                })}
                {/* <div className="bg-lightSky rounded-md p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium">Lorem, ipsum dolor sit amet.</h2>
                        <span className="bg-white px-2 py-1 rounded-md text-xs text-gray-400">
                            12-25-2024
                        </span>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </span>
                </div>
                <div className="bg-lightBlue rounded-md p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium">Lorem, ipsum dolor sit amet.</h2>
                        <span className="bg-white px-2 py-1 rounded-md text-xs text-gray-400">
                            12-26-2024
                        </span>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </span>
                </div>
                <div className="bg-paleYellow rounded-md p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium">Lorem, ipsum dolor sit amet.</h2>
                        <span className="bg-white px-2 py-1 rounded-md text-xs text-gray-400">
                            2-25-2025
                        </span>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </span>
                </div> */}
            </div>
        </div>
    );
};
