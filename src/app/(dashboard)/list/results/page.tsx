import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { resultsListData, role } from '@/lib/data';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import { sanityFetch } from '@/sanity/lib/live';
import { RESULTS_LIST_QUERY } from '@/sanity/lib/queries';

type Reults = {
    resultId: string | number;
    subject: { [key: string]: string | number };
    class: { [key: string]: string | number };
    teacher: { [key: string]: string | number };
    student: { [key: string]: string | number };
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

const ResultsListPage = async () => {
    const { data: ResultListTableData } = await sanityFetch({ query: RESULTS_LIST_QUERY });
    const renderRow = (item: Reults) => {
        return (
            <tr
                key={item?.resultId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">{item?.subject?.subjectName}</td>
                <td className="hidden md:table-cell">{item?.student?.name}</td>
                <td className="hidden md:table-cell">{item?.score}</td>
                <td className="hidden lg:table-cell">{item?.teacher?.name}</td>
                <td className="hidden lg:table-cell">{item?.class?.name}</td>
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
                                    id={item?.resultId}
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
            {/* handling no Data */}
            {ResultListTableData?.length > 0 ? (
                <>
                    {/* List */}
                    <Table
                        columns={headerColumns}
                        renderRow={renderRow}
                        data={ResultListTableData}
                    />

                    {/* Pagination */}
                    <div className="">
                        <Pagination />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Results List Found</span>
                </div>
            )}
        </div>
    );
};

export default ResultsListPage;
