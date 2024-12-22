import { FormModal } from '@/components/FormModal';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { role, studentsListData } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFilter, FaPlus, FaRegEye, FaSortAmountDown } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
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

const StudentListPage = () => {
  const renderRow = (item: Student) => {
    return (
      <tr
        key={item?.id}
        className='border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-lightSky'>
        <td className='flex items-center gap-4 p-3'>
          <Image
            src={item?.photo}
            alt=''
            width={40}
            height={40}
            className='md:hidden xl:block w-10 h-10 rounded-full object-cover'
          />
          <div className='flex flex-col'>
            <h3 className='font-semibold'>{item?.name}</h3>
            <p className='text-xs text-gray-400'>{item?.class}</p>
          </div>
        </td>
        <td className='hidden md:table-cell'>{item?.studentId}</td>
        <td className='hidden md:table-cell'>{item?.grade}</td>
        <td className='hidden lg:table-cell'>{item?.phone}</td>
        <td className='hidden lg:table-cell'>{item?.address}</td>
        <td>
          <div className='flex items-center gap-2'>
            <Link href={`/list/teachers/${item?.id}`}>
              <button className='flex items-center justify-center rounded-full p-2 bg-lightSky'>
                <FaRegEye className='text-lg' />
              </button>
            </Link>
            {role === 'admin' && (
              <FormModal
                table='student'
                type='delete'
                id={item?.id}
                icon={<MdDeleteOutline className='text-lg' />}
              />
            )}
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className='bg-white p-4 flex-1 rounded-md m-4 mt-0'>
      {/* Top */}
      <div className='flex justify-between items-center'>
        <h1 className='hidden md:block text-lg font-semibold'>All Students</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearchCompo />
          <div className='flex items-center gap-4 self-end'>
            <button className='flex items-center justify-center rounded-full bg-lightYellow p-3'>
              <FaFilter className='text-[15px]' />
            </button>
            <button className='flex items-center justify-center rounded-full bg-lightYellow p-3'>
              <FaSortAmountDown className='text-[15px]' />
            </button>

            {role === 'admin' && (
              <FormModal
                table='student'
                type='create'
                icon={<FaPlus className='text-[15px]' />}
              />
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={headerColumns} renderRow={renderRow} data={studentsListData} />

      {/* Pagination */}
      <div className=''>
        <Pagination />
      </div>
    </div>
  );
};

export default StudentListPage;
