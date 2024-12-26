import React, { useState } from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { lessonsListData, role } from '@/lib/data';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import { sanityFetch } from '@/sanity/lib/live';
import { LESSONS_LIST_QUERY } from '@/sanity/lib/queries';

type Lessons = {
    lessonId: number | string;
    subject: string;
    class: { [key: string]: string | number };
    teacher: { [key: string]: string | number };
};

const headerColumns = [
    {
        header: 'Subject Name',
        accessor: 'subject',
    },
    {
        header: 'Class',
        accessor: 'class',
    },
    {
        header: 'Teacher',
        accessor: 'teacher',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

const LessonsListPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ teacherId: string }>;
}) => {
    const id = (await searchParams).teacherId;
    const { data: LessonsListTableData } = await sanityFetch({ query: LESSONS_LIST_QUERY });
    const renderRow = (item: Lessons) => {
        return (
            <tr
                key={item?.lessonId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">{item?.subject}</td>
                <td>{item?.class?.name}</td>
                <td className="hidden md:table-cell">{item?.teacher?.name}</td>
                <td>
                    <div className="flex items-center gap-2">
                        {role === 'admin' && (
                            <>
                                <FormModal
                                    table="lesson"
                                    type="update"
                                    data={item}
                                    icon={<FaEdit className="text-sm" />}
                                />
                                <FormModal
                                    table="lesson"
                                    type="delete"
                                    id={item?.lessonId}
                                    icon={<MdDeleteOutline className="text-lg" />}
                                />
                            </>
                        )}
                    </div>
                </td>
            </tr>
        );
    };
    const tableRender = () => {};
    return (
        <div className="bg-white p-4 flex-1 rounded-md m-4 mt-0">
            {/* Top */}
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
                                table="lesson"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* handling No data */}

            {LessonsListTableData?.length === 0 && !id ? (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Lessons List Found</span>
                </div>
            ) : (
                <>
                    {/* List */}
                    <Table
                        columns={headerColumns}
                        renderRow={renderRow}
                        data={
                            id
                                ? LessonsListTableData?.filter(
                                      (d: any) => d?.teacher?.teacherId === id
                                  )
                                : LessonsListTableData
                        }
                    />

                    {/* Pagination */}
                    <div className="">
                        <Pagination />
                    </div>
                </>
            )}
        </div>
    );
};

export default LessonsListPage;
