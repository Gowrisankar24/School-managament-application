import React from 'react';
import Link from 'next/link';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { role, subjectsListData } from '@/lib/data';
import { MdDeleteOutline } from 'react-icons/md';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import { sanityFetch } from '@/sanity/lib/live';
import { SUBJECTS_LIST_QUERY } from '@/sanity/lib/queries';

type Subject = {
    subjectId: number | string;
    subjectName: string;
    teacher: string[] | number[];
};

const headerColumns = [
    {
        header: 'Subjects Name',
        accessor: 'subjectName',
    },

    {
        header: 'Teachers',
        accessor: 'teacher',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

const SubjectsListPage = async () => {
    const { data: SubjectsListTableData } = await sanityFetch({ query: SUBJECTS_LIST_QUERY });
    const renderRow = (item: Subject) => {
        return (
            <tr
                key={item?.subjectId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">{item?.subjectName}</td>

                <td className="hidden md:table-cell">
                    {Object.values(item?.teacher)
                        ?.map(d => d.name)
                        ?.join(',')}
                </td>
                <td>
                    <div className="flex items-center gap-2">
                        {role === 'admin' && (
                            <>
                                <FormModal
                                    table="subject"
                                    type="update"
                                    data={item}
                                    icon={<FaEdit className="text-sm" />}
                                />

                                <FormModal
                                    table="subject"
                                    type="delete"
                                    id={item?.subjectId}
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
                <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
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
                                table="subject"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* handling no data */}
            {SubjectsListTableData?.length > 0 ? (
                <>
                    {/* List */}
                    <Table
                        columns={headerColumns}
                        renderRow={renderRow}
                        data={SubjectsListTableData}
                    />

                    {/* Pagination */}
                    <div className="">
                        <Pagination />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Subjects List Found</span>
                </div>
            )}
        </div>
    );
};

export default SubjectsListPage;
