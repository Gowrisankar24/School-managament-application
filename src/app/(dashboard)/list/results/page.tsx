import React from 'react';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { ITEMS_PER_PAGE, resultsListData, role } from '@/lib/data';
import TableSearchCompo from '@/components/TableSearchCompo';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';
import {
    CLASS_LIST_QUERY,
    CLASS_LIST_QUERY_ALL_COUNT,
    RESULTS_LIST_QUERY,
    RESULTS_LIST_QUERY_ALL_COUNT,
    STUDENTS_LIST_ALL_COUNT,
    STUDENTS_LIST_QUERY,
    SUBJECTS_LIST_ALL_COUNT,
    SUBJECTS_LIST_QUERY,
    TEACHERS_LIST_ALL_COUNT,
    TEACHERS_LIST_QUERY,
} from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

type Reults = {
    _id: string;
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

const ResultsListPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    const { studentId: searchParamStudentId, page } = await searchParams;
    const p = page ? parseInt(page) : 1;
    const [getTotalClsCount, TeachersListTotalCount, getTotalSubCount, getTotalStudentCount] =
        await Promise.all([
            client.fetch(CLASS_LIST_QUERY_ALL_COUNT),
            client.fetch(TEACHERS_LIST_ALL_COUNT),
            client.fetch(SUBJECTS_LIST_ALL_COUNT),
            client.fetch(STUDENTS_LIST_ALL_COUNT),
        ]);
    const [
        ResultListTableData,
        totalResultCount,
        getClassesListTableData,
        TeachersTableList,
        getSubjectsListTableData,
        getStudentListTableData,
    ] = await Promise.all([
        client.fetch(RESULTS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
        }),
        client.fetch(RESULTS_LIST_QUERY_ALL_COUNT),
        client.fetch(CLASS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: getTotalClsCount,
        }),
        client.fetch(TEACHERS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: TeachersListTotalCount,
        }),
        client.fetch(SUBJECTS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: getTotalSubCount,
        }),
        client.fetch(STUDENTS_LIST_QUERY, {
            start: (p - 1) * ITEMS_PER_PAGE,
            limit: getTotalStudentCount,
        }),
    ]);
    //filter table data
    const FilterTableData = searchParamStudentId
        ? ResultListTableData?.filter((d: Reults) => d.student?.studentId === searchParamStudentId)
        : ResultListTableData;
    const uniqueClasses = getClassesListTableData?.map((d: { [key: string]: string | number }) => ({
        _id: d?._id,
        name: d?.name,
    }));
    const getTeachersNameList = TeachersTableList?.map((d: { [key: string]: string }) => ({
        _id: d?._id,
        name: d?.name,
    }));
    const getUniqueSubjects = getSubjectsListTableData?.map(
        (d: { [key: string]: string | number }) => ({
            _id: d?._id,
            subjectName: d?.subjectName,
        })
    );
    const getFilterStudentName = getStudentListTableData?.map((d: { [key: string]: string }) => ({
        _id: d?._id,
        name: d?.name,
    }));
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
                                    dropdownClsData={uniqueClasses}
                                    dropDownTeacherList={getTeachersNameList}
                                    dropdownSubsData={getUniqueSubjects}
                                    dropdownStudentData={getFilterStudentName}
                                />
                                <FormModal
                                    table="result"
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
                                dropdownClsData={uniqueClasses}
                                dropDownTeacherList={getTeachersNameList}
                                dropdownSubsData={getUniqueSubjects}
                                dropdownStudentData={getFilterStudentName}
                            />
                        )}
                    </div>
                </div>
            </div>
            {/* handling no Data */}
            {FilterTableData?.length > 0 ? (
                <>
                    {/* List */}
                    <Table columns={headerColumns} renderRow={renderRow} data={FilterTableData} />

                    {/* Pagination */}
                    <div className="">
                        <Pagination page={p} totalCount={totalResultCount} />
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
