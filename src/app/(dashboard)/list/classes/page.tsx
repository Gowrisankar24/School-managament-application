import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { classesListData, role } from '@/lib/data';
import { MdDeleteOutline } from 'react-icons/md';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import { sanityFetch } from '@/sanity/lib/live';
import { CLASS_LIST_QUERY } from '@/sanity/lib/queries';

type Classes = {
    classId: string;
    name: string;
    capacity: number;
    grade: number;
    supervisor: { [key: string]: string | number };
};

const headerColumns = [
    {
        header: 'Class Name',
        accessor: 'name',
    },
    {
        header: 'Capacity',
        accessor: 'capacity',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Grade',
        accessor: 'grade',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Supervisor',
        accessor: 'supervisor',
        className: 'hidden lg:table-cell',
    },
    {
        header: 'Actions',
        accessor: 'actions',
    },
];

const SubjectsListPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ supervisorId: string }>;
}) => {
    const { data: ClassListTableData } = await sanityFetch({ query: CLASS_LIST_QUERY });
    const id = (await searchParams).supervisorId;
    const renderRow = (item: Classes) => {
        return (
            <tr
                key={item?.classId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">{item?.name}</td>

                <td className="hidden md:table-cell">{item?.capacity}</td>
                <td className="hidden md:table-cell">{item?.grade}</td>
                <td className="hidden lg:table-cell">{item?.supervisor?.name}</td>
                <td>
                    <div className="flex items-center gap-2">
                        {role === 'admin' && (
                            <>
                                <FormModal
                                    table="class"
                                    type="update"
                                    data={item}
                                    icon={<FaEdit className="text-sm" />}
                                />
                                <FormModal
                                    table="class"
                                    type="delete"
                                    id={item?.classId}
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
                <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
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
                                table="class"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* handling no data */}
            {ClassListTableData?.length > 0 ? (
                <>
                    <>
                        {/* List */}
                        <Table
                            columns={headerColumns}
                            renderRow={renderRow}
                            data={
                                id
                                    ? ClassListTableData.filter(
                                          (d: any) => d?.supervisor?.teacherId === id
                                      )
                                    : ClassListTableData
                            }
                        />

                        {!id && (
                            <>
                                {/* Pagination */}
                                <div className="">
                                    <Pagination />
                                </div>
                            </>
                        )}
                    </>
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Class List Found</span>
                </div>
            )}
        </div>
    );
};

export default SubjectsListPage;
