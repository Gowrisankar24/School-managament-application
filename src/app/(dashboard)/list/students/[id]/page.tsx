import Image from 'next/image';
import React from 'react';
import { MdBloodtype, MdOutlineMail, MdCoPresent } from 'react-icons/md';
import {
  FaCalendarAlt,
  FaMobileAlt,
  FaCodeBranch,
  FaChalkboard,
  FaEdit,
} from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { ScheduleBigCalendar } from '@/components/ScheduleBigCalendar';
import { Announcements } from '@/components/Announcements';
import Link from 'next/link';
import { PerformanceChart } from '@/components/PerformanceChart';
import { FormModal } from '@/components/FormModal';

const StudentProfilePage = () => {
  return (
    <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
      {/* Left */}
      <div className='w-full xl:w-2/3'>
        {/* Top */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* teacher info */}
          <div className='bg-lightSky py-6 px-4 rounded-md flex-1 flex gap-4'>
            <div className='w-1/3'>
              <Image
                src={`/student-profile.jpg`}
                alt='Student'
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold'>Joe Root</h1>
                <FormModal
                  table='student'
                  type='update'
                  data={{
                    id: 1,
                    username: 'deanguerrero',
                    email: 'deanguerrero@gmail.com',
                    password: 'password',
                    firstName: 'Dean',
                    lastName: 'Guerrero',
                    phone: '+1 234 567 89',
                    address: '1234 Main St, Anytown, USA',
                    bloodType: 'A+',
                    dateOfBirth: '2000-01-01',
                    sex: 'male',
                    img: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  }}
                  icon={<FaEdit className='text-sm' />}
                />
              </div>
              <p className='text-sm text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
                consequuntur labore atque vitae ducimus assumenda.
              </p>
              <div className='flex justify-between items-center gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <MdBloodtype className='text-sm' />
                  <span>
                    A <sup>+</sup>
                  </span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <FaCalendarAlt className='text-sm' />
                  <span>January 2024</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <MdOutlineMail className='text-sm' />
                  <span>user@gmail.com</span>
                </div>
                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                  <FaMobileAlt className='text-sm' />
                  <span>+123 144 567 789</span>
                </div>
              </div>
            </div>
          </div>
          {/* mini card */}
          <div className='flex-1 flex gap-4 flex-wrap justify-between'>
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]'>
              <MdCoPresent className='w-6 h-6' />
              <div className=''>
                <h1 className='font-semibold text-xl'>90%</h1>
                <span className='text-sm text-gray-500'>Attendance</span>
              </div>
            </div>
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]'>
              <FaCodeBranch className='w-6 h-6' />
              <div className=''>
                <h1 className='font-semibold text-xl'>
                  2 <sup>nd</sup>
                </h1>
                <span className='text-sm text-gray-500'>Grade</span>
              </div>
            </div>
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]'>
              <FaChalkboard className='w-6 h-6' />
              <div className=''>
                <h1 className='font-semibold text-xl'>5</h1>
                <span className='text-sm text-gray-500'>Lessons</span>
              </div>
            </div>
            <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]'>
              <SiGoogleclassroom className='w-6 h-6' />
              <div className=''>
                <h1 className='font-semibold text-xl'>9B</h1>
                <span className='text-sm text-gray-500'>Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* Student`s schedule calendar */}
        <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
          <h1>Student Schedule</h1>
          <ScheduleBigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <div className='bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Shortcuts</h1>
          <div className='mt-4 flex gap-3 flex-wrap text-xs text-gray-500'>
            <Link className='p-3 rounded-md bg-lightSky' href='/'>
              Student`s Lessons
            </Link>
            <Link className='p-3 rounded-md bg-lightBlue' href='/'>
              Student`s Teachers
            </Link>
            <Link className='p-3 rounded-md bg-lightYellow' href='/'>
              Student`s Exams
            </Link>
            <Link className='p-3 rounded-md bg-gray-200' href='/'>
              Student`s Assignments
            </Link>
            <Link className='p-3 rounded-md bg-pink-200' href='/'>
              Student`s Results
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentProfilePage;
