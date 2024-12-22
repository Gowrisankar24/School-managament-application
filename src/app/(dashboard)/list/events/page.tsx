import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { eventsListData, role } from '@/lib/data';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';

type Events = {
    id: number;
    title: string;
    class: string;
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

const EventsListPage = () => {
    const renderRow = (item: Events) => {
        return (
            <tr
                key={item?.id}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-lightSky"
            >
                <td className="flex items-center gap-4 p-3">{item?.title}</td>
                <td className="">{item?.class}</td>
                <td className="hidden md:table-cell">{item?.date}</td>
                <td className="hidden lg:table-cell">{item?.startTime}</td>
                <td className="hidden lg:table-cell">{item?.endTime}</td>
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
                                    id={item?.id}
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

            {/* List */}
            <Table columns={headerColumns} renderRow={renderRow} data={eventsListData} />

            {/* Pagination */}
            <div className="">
                <Pagination />
            </div>
        </div>
    );
};

export default EventsListPage;
