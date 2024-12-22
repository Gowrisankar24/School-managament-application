import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { resultsListData, role } from '@/lib/data';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';

type Reults = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    student: string;
    date: string;
    type: 'exam' | 'assignment';
    score: number;
};

const headerColumns = [
    {
        header: 'Subject Name',
        accessor: 'subject',
    },

    {
        header: 'Student',
        accessor: 'student',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Score',
        accessor: 'score',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Teacher',
        accessor: 'teacher',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'Class',
        accessor: 'class',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'Date',
        accessor: 'date',
        className: 'hidden lg:table-cell',
    },

    {
        header: 'Actions',
        accessor: 'actions',
    },
];

const ResultsListPage = () => {
    const renderRow = (item: Reults) => {
        return (
            <tr
                key={item?.id}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-lightSky"
            >
                <td className="flex items-center gap-4 p-3">{item?.subject}</td>
                <td className="hidden md:table-cell">{item?.student}</td>
                <td className="hidden md:table-cell">{item?.score}</td>
                <td className="hidden lg:table-cell">{item?.teacher}</td>
                <td className="hidden lg:table-cell">{item?.class}</td>
                <td className="hidden lg:table-cell">{item?.date}</td>
                <td>
                    <div className="flex items-center gap-2">
                        {role === 'admin' && (
                            <>
                                <FormModal
                                    table="result"
                                    type="update"
                                    data={item}
                                    icon={<FaEdit className="text-sm" />}
                                />
                                <FormModal
                                    table="result"
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
                <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
                                table="result"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* List */}
            <Table columns={headerColumns} renderRow={renderRow} data={resultsListData} />

            {/* Pagination */}
            <div className="">
                <Pagination />
            </div>
        </div>
    );
};

export default ResultsListPage;
