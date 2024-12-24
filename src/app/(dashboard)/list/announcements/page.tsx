import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { announcementsData, role } from '@/lib/data';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import { sanityFetch } from '@/sanity/lib/live';
import { ANNOUNCEMENTS_LIST_QUERY } from '@/sanity/lib/queries';

type Announcement = {
    announcementId: number;
    title: string;
    class: { [key: string]: string | number };
    date: string;
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
        header: 'Actions',
        accessor: 'actions',
    },
];

const AnnouncementsListPage = async () => {
    const { data: AnnouncementListTableData } = await sanityFetch({
        query: ANNOUNCEMENTS_LIST_QUERY,
    });
    const renderRow = (item: Announcement) => {
        return (
            <tr
                key={item?.announcementId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">{item?.title}</td>
                <td className="">{item?.class?.name}</td>
                <td className="hidden md:table-cell">{item?.date}</td>
                <td>
                    <div className="flex items-center gap-2">
                        {role === 'admin' && (
                            <>
                                <FormModal
                                    table="announcement"
                                    type="update"
                                    data={item}
                                    icon={<FaEdit className="text-sm" />}
                                />
                                <FormModal
                                    table="announcement"
                                    type="delete"
                                    id={item?.announcementId}
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
                <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
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
                                table="announcement"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* handling no data */}
            {AnnouncementListTableData?.length > 0 ? (
                <>
                    {/* List */}
                    <Table
                        columns={headerColumns}
                        renderRow={renderRow}
                        data={AnnouncementListTableData}
                    />

                    {/* Pagination */}
                    <div className="">
                        <Pagination />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Announcements List Found</span>
                </div>
            )}
        </div>
    );
};

export default AnnouncementsListPage;
