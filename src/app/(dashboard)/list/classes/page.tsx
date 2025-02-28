import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { classesListData, ITEMS_PER_PAGE, role } from '@/lib/data';
import { MdDeleteOutline } from 'react-icons/md';
import TableSearchCompo from '@/components/TableSearchCompo';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import {
    CLASS_LIST_QUERY,
    CLASS_LIST_QUERY_ALL_COUNT,
    TEACHERS_LIST_ALL_COUNT,
    TEACHERS_LIST_QUERY,
} from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

type Classes = {
    _id: string;
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
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { supervisorId: id, classId: searchClassId, page } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const TeachersListTotalCount = await client.fetch(TEACHERS_LIST_ALL_COUNT);
    const [ClassListTableData, classTotalCount, TeachersTableList] = await Promise.all([
        client.fetch(CLASS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        }),
        client.fetch(CLASS_LIST_QUERY_ALL_COUNT),
        client.fetch(TEACHERS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: TeachersListTotalCount,
        }),
    ]);
    const getTeachersNameList = TeachersTableList?.map((d: { [key: string]: string }) => ({
        _id: d?._id,
        name: d?.name,
    }));
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
                                    dropDownTeacherList={getTeachersNameList}
                                />
                                <FormModal
                                    table="class"
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
    const filteredClassListTableData = id
        ? ClassListTableData.filter((d: any) => d?.supervisor?.teacherId === id)
        : searchClassId
          ? ClassListTableData?.filter(
                (d: { [key: string]: string | number }) => d?.classId === searchClassId,
            )
          : ClassListTableData;
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
                                dropDownTeacherList={getTeachersNameList}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* handling no data */}
            {filteredClassListTableData?.length > 0 ? (
                <>
                    <>
                        {/* List */}
                        <Table
                            columns={headerColumns}
                            renderRow={renderRow}
                            data={filteredClassListTableData}
                        />

                        {!id && (
                            <>
                                {/* Pagination */}
                                <div className="">
                                    <Pagination page={p} totalCount={classTotalCount} />
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
