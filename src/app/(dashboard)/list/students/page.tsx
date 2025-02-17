import { FormModal } from '@/components/FormModal';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearchCompo from '@/components/TableSearchCompo';
import { ITEMS_PER_PAGE, role, studentsListData } from '@/lib/data';
import { client } from '@/sanity/lib/client';
import {
    CLASS_LIST_QUERY,
    CLASS_LIST_QUERY_ALL_COUNT,
    STUDENTS_LIST_ALL_COUNT,
    STUDENTS_LIST_QUERY,
    SUBJECTS_LIST_ALL_COUNT,
    SUBJECTS_LIST_QUERY,
} from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFilter, FaPlus, FaRegEye, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
type Student = {
    _id: string;
    studentId: string;
    name: string;
    email?: string;
    photo: string;
    phone?: string;
    grade: number;
    class: { [key: string]: string | number };
    address: string;
    subjects: string[] | number[];
};

const headerColumns = [
    {
        header: 'Info',
        accessor: 'info',
    },
    {
        header: 'Student Id',
        accessor: 'studentId',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Grade',
        accessor: 'grade',
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

const StudentListPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { teacherId: id, page } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const [getTotalClsCount, getTotalSubCount] = await Promise.all([
        client.fetch(CLASS_LIST_QUERY_ALL_COUNT),
        client.fetch(SUBJECTS_LIST_ALL_COUNT),
    ]);
    const [
        StudentsTableData,
        StudentTotalCount,
        getClassesListTableData,
        getSubjectsListTableData,
    ] = await Promise.all([
        client.fetch(STUDENTS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        }),
        client.fetch(STUDENTS_LIST_ALL_COUNT),
        client.fetch(CLASS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: getTotalClsCount,
        }),
        client.fetch(SUBJECTS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: getTotalSubCount,
        }),
    ]);
    //filter students data
    const filteredStudentTableData = id
        ? StudentsTableData?.filter(
              (d: { [key: string]: any }) => d?.class?.supervisor?.teacherId === id
          )
        : StudentsTableData;

    const getUniqueSubjects = getSubjectsListTableData?.map(
        (d: { [key: string]: string | number }) => ({
            _id: d?._id,
            subjectName: d?.subjectName,
        })
    );

    const uniquesClasses = getClassesListTableData?.map(
        (d: { [key: string]: string | number }) => ({
            _id: d?._id,
            name: d?.name,
        })
    );
    const renderRow = (item: Student) => {
        return (
            <tr
                key={item?.studentId}
                className="border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-tableHover"
            >
                <td className="flex items-center gap-4 p-3">
                    <Image
                        src={item?.photo || `/profile.png`}
                        alt=""
                        width={40}
                        height={40}
                        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <h3 className="font-semibold">{item?.name}</h3>
                        <p className="text-xs text-gray-400">{item?.class?.name}</p>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item?.studentId}</td>
                <td className="hidden md:table-cell">{item?.grade}</td>
                <td className="hidden lg:table-cell">{item?.phone}</td>
                <td className="hidden lg:table-cell">{item?.address}</td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/list/students/${item?.studentId}`}>
                            <button className="flex items-center justify-center rounded-full p-2 bg-lightSky">
                                <FaRegEye className="text-lg" />
                            </button>
                        </Link>
                        {role === 'admin' && (
                            <FormModal
                                table="student"
                                type="delete"
                                id={item?._id}
                                icon={<MdDeleteOutline className="text-lg" />}
                            />
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
                <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
                                table="student"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                                dropdownSubsData={getUniqueSubjects}
                                dropdownClsData={uniquesClasses}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* handling no data */}
            {filteredStudentTableData?.length > 0 ? (
                <>
                    {/* List */}
                    <Table
                        columns={headerColumns}
                        renderRow={renderRow}
                        data={filteredStudentTableData}
                    />

                    {/* Pagination */}
                    <div className="">
                        <Pagination page={p} totalCount={StudentTotalCount} />
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Students List Found</span>
                </div>
            )}
        </div>
    );
};

export default StudentListPage;
