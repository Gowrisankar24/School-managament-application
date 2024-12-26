import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { assignmentsListData, role } from '@/lib/data';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import { sanityFetch } from '@/sanity/lib/live';
import { ASSIGNMENTS_LIST_QUERY } from '@/sanity/lib/queries';

type Assignment = {
    assignmentId: number | string;
    subject: { [key: string]: string | number };
    class: { [key: string]: string | number };
    teacher: { [key: string]: string | number };
    dueDate: string;
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
        header: 'Due Date',
        accessor: 'dueDate',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

const AssignmentsListPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ teacherId: string }>;
}) => {
    const id = (await searchParams).teacherId;
    const { data: AssignmentListTableData } = await sanityFetch({ query: ASSIGNMENTS_LIST_QUERY });
    const renderRow = (item: Assignment) => {
        return (
            <tr
                key={item?.assignmentId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">{item?.subject?.subjectName}</td>
                <td>{item?.class?.name}</td>
                <td className="hidden md:table-cell">{item?.teacher?.name}</td>
                <td className="hidden md:table-cell">{item?.dueDate}</td>
                <td>
                    <div className="flex items-center gap-2">
                        {role === 'admin' && (
                            <>
                                <FormModal
                                    table="assignment"
                                    type="update"
                                    data={item}
                                    icon={<FaEdit className="text-sm" />}
                                />
                                <FormModal
                                    table="assignment"
                                    type="delete"
                                    id={item?.assignmentId}
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
                <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>
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
                                table="assignment"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* handling no Data */}
            {AssignmentListTableData?.length > 0 ? (
                <>
                    {/* List */}
                    <Table
                        columns={headerColumns}
                        renderRow={renderRow}
                        data={
                            id
                                ? AssignmentListTableData?.filter(
                                      (d: any) => d?.teacher?.teacherId === id
                                  )
                                : AssignmentListTableData
                        }
                    />

                    {/* Pagination */}
                    <div className="">
                        <Pagination />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Assignments List Found</span>
                </div>
            )}
        </div>
    );
};

export default AssignmentsListPage;
