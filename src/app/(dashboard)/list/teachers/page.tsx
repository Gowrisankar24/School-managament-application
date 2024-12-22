import React from 'react';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { FaFilter, FaSortAmountDown, FaPlus, FaRegEye } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { Pagination } from '@/components/Pagination';
import { Table } from '@/components/Table';
import Image from 'next/image';
import Link from 'next/link';
import { role, teachersListData } from '@/lib/data';
import { FormModal } from '@/components/FormModal';

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
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

const TeachersListPage = () => {
  const renderRow = (item: Teacher) => {
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
            <p className='text-xs text-gray-400'>{item?.email}</p>
          </div>
        </td>
        <td className='hidden md:table-cell'>{item?.teacherId}</td>
        <td className='hidden md:table-cell'>{item?.subjects?.join(',')}</td>
        <td className='hidden md:table-cell'>{item?.classes?.join(',')}</td>
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
                table='teacher'
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
        <h1 className='hidden md:block text-lg font-semibold'>All Teachers</h1>
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
                table='teacher'
                type='create'
                icon={<FaPlus className='text-[15px]' />}
              />
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={headerColumns} renderRow={renderRow} data={teachersListData} />

      {/* Pagination */}
      <div className=''>
        <Pagination />
      </div>
    </div>
  );
};

export default TeachersListPage;
