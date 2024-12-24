import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { eventsListData, role } from '@/lib/data';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import { sanityFetch } from '@/sanity/lib/live';
import { EVENTS_LIST_QUERY } from '@/sanity/lib/queries';
import moment from 'moment';

type Events = {
    eventId: number | string;
    title: string;
    class: { [key: string]: string | number };
    date: string;
    startTime: string;
    endTime: string;
};

const headerColumns = [
    {
        header: 'Title',
        accessor: 'title',
    },

    {
        header: 'Class',
        accessor: 'class',
    },
    {
        header: 'Date',
        accessor: 'date',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Start Time',
        accessor: 'startTime',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'End Time',
        accessor: 'endTime',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

const EventsListPage = async () => {
    const { data: EventListTableData } = await sanityFetch({ query: EVENTS_LIST_QUERY });
    const renderRow = (item: Events) => {
        let d = new Date();
        return (
            <tr
                key={item?.eventId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">{item?.title}</td>
                <td className="">{item?.class?.name}</td>
                <td className="hidden md:table-cell">{item?.date}</td>
                <td className="hidden lg:table-cell">
                    {moment(item?.startTime).format('h:mm:ss A')}
                </td>
                <td className="hidden lg:table-cell">
                    {moment(item?.endTime).format('h:mm:ss A')}
                </td>
                <td>
                    <div className="flex items-center gap-2">
                        {role === 'admin' && (
                            <>
                                <FormModal
                                    table="event"
                                    type="update"
                                    data={item}
                                    icon={<FaEdit className="text-sm" />}
                                />
                                <FormModal
                                    table="event"
                                    type="delete"
                                    id={item?.eventId}
                                    icon={<MdDeleteOutline className="text-lg" />}
                                />
                            </>
                        )}
                    </div>
                </td>
            </tr>
        );
    };
    return (
        <div className="bg-white p-4 flex-1 rounded-md m-4 mt-0">
            {/* Top */}
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearchCompo />
                    <div className="flex items-center gap-4 self-end">
                        <button className="flex items-center justify-center rounded-full bg-lightYellow p-3">
                            <FaFilter className="text-[15px]" />
                        </button>
                        <button className="flex items-center justify-center rounded-full bg-lightYellow p-3">
                            <FaSortAmountDown className="text-[15px]" />
                        </button>

                        {role === 'admin' && (
                            <FormModal
                                table="event"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* handling No data */}
            {EventListTableData?.length > 0 ? (
                <>
                    {/* List */}
                    <Table
                        columns={headerColumns}
                        renderRow={renderRow}
                        data={EventListTableData}
                    />

                    {/* Pagination */}
                    <div className="">
                        <Pagination />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Events List Found</span>
                </div>
            )}
        </div>
    );
};

export default EventsListPage;
