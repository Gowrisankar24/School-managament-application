import React, { Suspense } from 'react';
import { FaFilter, FaSortAmountDown, FaPlus, FaRegEye } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { ITEMS_PER_PAGE, role, teachersListData } from '@/lib/data';
import { FormModal } from '@/components/FormModal';
import {
    CLASS_LIST_QUERY,
    CLASS_LIST_QUERY_ALL_COUNT,
    SUBJECTS_LIST_ALL_COUNT,
    SUBJECTS_LIST_QUERY,
    TEACHERS_LIST_ALL_COUNT,
    TEACHERS_LIST_QUERY,
} from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import Table from '@/components/Table';
import dynamic from 'next/dynamic';
import TableSearchCompo from '@/components/TableSearchCompo';
import Pagination from '@/components/Pagination';

export type Teacher = {
    _id: string;
    teacherId: string;
    name: string;
    email?: string;
    photo: string;
    phone: string;
    subjects: string[] | number[];
    classes: { classId: string }[];
    address: string;
};

const headerColumns = [
    {
        header: 'Info',
        accessor: 'info',
    },
    {
        header: 'Teacher Id',
        accessor: 'teacherId',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Subjects',
        accessor: 'subjects',
        className: 'hidden md:table-cell',
    },
    {
        header: 'Classes',
        accessor: 'classes',
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

const TeachersListPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { classId: classIdQueryParams, page } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const [totalClsCount, totalSubsCount] = await Promise.all([
        client.fetch(CLASS_LIST_QUERY_ALL_COUNT),
        client.fetch(SUBJECTS_LIST_ALL_COUNT),
    ]);
    const [
        TeachersListTableData,
        TeacherTotalCount,
        getClassesListTableData,
        getSubjectsListTableData,
    ] = await Promise.all([
        client.fetch(TEACHERS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        }),
        client.fetch(TEACHERS_LIST_ALL_COUNT),
        client.fetch(CLASS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: totalClsCount,
        }),
        client.fetch(SUBJECTS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: totalSubsCount,
        }),
    ]);

    //filter table data
    const FilteredTableData = classIdQueryParams
        ? TeachersListTableData?.map((record: { [key: string]: any }) => {
              const filteredByCls = record?.classes?.filter(
                  (c: { [key: string]: string | number }) => c?.classId === classIdQueryParams,
              );
              if (filteredByCls?.length > 0) {
                  return {
                      ...record,
                      classes: filteredByCls,
                  };
              }
              return null;
          }).filter((d: any) => d !== null)
        : TeachersListTableData;

    const renderRow = (item: Teacher) => {
        return (
            <tr
                key={item?.teacherId}
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
                        <p className="font-mono text-xs text-gray-400">{item?.email}</p>
                    </div>
                </td>
                <td className="hidden md:table-cell">{item?.teacherId}</td>
                <td className="hidden md:table-cell">
                    {Object.values(item?.subjects)
                        ?.map(d => d.subjectName)
                        .join(',')}
                </td>
                <td className="hidden md:table-cell">
                    {Object.values(item?.classes)
                        ?.map((d: any) => d?.name)
                        .join(',')}
                </td>
                <td className="hidden lg:table-cell">{item?.phone}</td>
                <td className="hidden lg:table-cell">{item?.address}</td>
                <td>
                    <div className="flex items-center gap-2">
                        <Link href={`/list/teachers/${item?.teacherId}`}>
                            <button className="flex items-center justify-center rounded-full p-2 bg-lightSky">
                                <FaRegEye className="text-lg" />
                            </button>
                        </Link>
                        {role === 'admin' && (
                            <FormModal
                                table="teacher"
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
    const uniquesClasses = getClassesListTableData?.map((cls: { [key: string]: any }) => ({
        _id: cls?._id,
        name: cls?.name,
    }));
    const getUniqueSubjects = getSubjectsListTableData?.map((sub: { [key: string]: any }) => ({
        _id: sub?._id,
        subjectName: sub?.subjectName,
    }));
    return (
        <div className="bg-white p-4 flex-1 rounded-md m-4 mt-0">
            {/* Top */}
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    {/* <Suspense fallback={<h1>Loading TableSearchCompo...</h1>}> */}
                    <TableSearchCompo />
                    {/* </Suspense> */}
                    <div className="flex items-center gap-4 self-end">
                        <button className="flex items-center justify-center rounded-full bg-lightYellow p-3">
                            <FaFilter className="text-[15px]" />
                        </button>
                        <button className="flex items-center justify-center rounded-full bg-lightYellow p-3">
                            <FaSortAmountDown className="text-[15px]" />
                        </button>
                        {role === 'admin' && (
                            <FormModal
                                table="teacher"
                                type="create"
                                icon={<FaPlus className="text-[15px]" />}
                                dropdownClsData={uniquesClasses}
                                dropdownSubsData={getUniqueSubjects}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* handling no data */}
            {FilteredTableData?.length > 0 ? (
                <>
                    {/* <Suspense fallback={<div>Loading...</div>}> */}
                    {/* List */}
                    <Table columns={headerColumns} renderRow={renderRow} data={FilteredTableData} />

                    {/* Pagination */}

                    <div className="">
                        <Pagination page={p} totalCount={TeacherTotalCount} />
                    </div>

                    {/* </Suspense> */}
                </>
            ) : (
                <div className="flex items-center justify-center text-black font-medium text-3xl mt-8">
                    <span>No Teachers List Found</span>
                </div>
            )}
        </div>
    );
};

export default TeachersListPage;
