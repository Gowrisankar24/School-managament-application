import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { ITEMS_PER_PAGE, parentsListData, role } from '@/lib/data';
import TableSearchCompo from '@/components/TableSearchCompo';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import {
    PARENT_LIST_BY_ALL_COUNT,
    PARENTS_LIST_QUERY,
    STUDENTS_LIST_ALL_COUNT,
    STUDENTS_LIST_QUERY,
} from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

type Parent = {
    _id: string;
    parentId: string;
    name: string;
    email?: string;
    students: string[] | number[];
    phone?: string;
    address: string;
};

const headerColumns = [
    {
        header: 'Info',
        accessor: 'info',
    },

    {
        header: 'Student Name',
        accessor: 'students',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Phone',
        accessor: 'phone',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'Address',
        accessor: 'address',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

const ParentListPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { page } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const totalCount = await client.fetch(STUDENTS_LIST_ALL_COUNT);
    const [ParentsTableListData, ParentTotalCount, GetStudentTableData] = await Promise.all([
        client.fetch(PARENTS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        }),
        client.fetch(PARENT_LIST_BY_ALL_COUNT),
        client.fetch(STUDENTS_LIST_QUERY, {
            start: 0,
            limit: totalCount,
        }),
    ]);
    const getFilterStudentName = GetStudentTableData?.map((d: { [key: string]: string }) => ({
        _id: d?._id,
        name: d?.name,
    }));
    const renderRow = (item: Parent) => {
        return (
            <tr
                key={item?.parentId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item?.name}</h3>
                        <p className="font-mono text-xs text-gray-400">{item?.email}</p>
                    </div>
                </td>
                <td className="hidden md:table-cell">
                    {Object.values(item?.students)
                        .map(d => d?.name)
                        .join(',')}
                </td>
                <td className="hidden md:table-cell">{item?.phone}</td>
                <td className="hidden lg:table-cell">{item?.address}</td>
                <td>
                    <div className="flex items-center gap-2">
                        {role === 'admin' && (
                            <>
                                <FormModal
                                    table="parent"
                                    type="update"
                                    data={item}
                                    icon={<FaEdit className="text-sm" />}
                                    dropdownStudentData={getFilterStudentName}
                                />
                                <FormModal
                                    table="parent"
                                    type="delete"
                                    id={item?._id}
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
                <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
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
                                table="parent"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                                dropdownStudentData={getFilterStudentName}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* handling No data */}
            {ParentsTableListData?.length > 0 ? (
                <>
                    {/* List */}
                    <Table
                        columns={headerColumns}
                        renderRow={renderRow}
                        data={ParentsTableListData}
                    />

                    {/* Pagination */}
                    <div className="">
                        <Pagination page={p} totalCount={ParentTotalCount} />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Parents List Found</span>
                </div>
            )}
        </div>
    );
};

export default ParentListPage;
