import React from 'react';
import Link from 'next/link';
import { FaFilter, FaPlus, FaEdit, FaSortAmountDown } from 'react-icons/fa';
import { role, subjectsListData } from '@/lib/data';
import { MdDeleteOutline } from 'react-icons/md';
import { TableSearchCompo } from '@/components/TableSearchCompo';
import { Table } from '@/components/Table';
import { Pagination } from '@/components/Pagination';
import { FormModal } from '@/components/FormModal';

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

const headerColumns = [
  {
    header: 'Subjects Name',
    accessor: 'name',
  },

  {
    header: 'Teachers',
    accessor: 'teachers',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'actions',
  },
];

const SubjectsListPage = () => {
  const renderRow = (item: Subject) => {
    return (
      <tr
        key={item?.id}
        className='border-b border-gray-200 even:bg-slate-100 text-sm hover:bg-lightSky'>
        <td className='flex items-center gap-4 p-3'>{item?.name}</td>

        <td className='hidden md:table-cell'>{item?.teachers?.join(',')}</td>
        <td>
          <div className='flex items-center gap-2'>
            <Link href={`/list/teachers/${item?.id}`}>
              <button className='flex items-center justify-center rounded-full p-2 bg-lightSky'>
                <FaEdit className='text-sm' />
              </button>
            </Link>
            {role === 'admin' && (
              <>
                <FormModal
                  table='subject'
                  type='update'
                  data={item}
                  icon={<FaEdit className='text-sm' />}
                />

                <FormModal
                  table='subject'
                  type='delete'
                  id={item?.id}
                  icon={<MdDeleteOutline className='text-lg' />}
                />
              </>
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
        <h1 className='hidden md:block text-lg font-semibold'>All Subjects</h1>
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
                table='subject'
                type='create'
                icon={<FaPlus className='text-[15px]' />}
              />
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <Table columns={headerColumns} renderRow={renderRow} data={subjectsListData} />

      {/* Pagination */}
      <div className=''>
        <Pagination />
      </div>
    </div>
  );
};

export default SubjectsListPage;
