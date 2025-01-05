import Image from 'next/image';
import React from 'react';
import { MdBloodtype, MdOutlineMail, MdCoPresent } from 'react-icons/md';
import { FaCalendarAlt, FaMobileAlt, FaCodeBranch, FaChalkboard, FaEdit } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { ScheduleBigCalendar } from '@/components/ScheduleBigCalendar';
import { Announcements } from '@/components/Announcements';
import Link from 'next/link';
import { PerformanceChart } from '@/components/PerformanceChart';
import { FormModal } from '@/components/FormModal';
import { client } from '@/sanity/lib/client';
import { STUDENTS_INFO_BY_ID } from '@/sanity/lib/queries';
import moment from 'moment';

const StudentProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const StudentProfileData = await client.fetch(STUDENTS_INFO_BY_ID, { id });
    return (
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
            {/* Left */}
            <div className="w-full xl:w-2/3">
                {/* Top */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* teacher info */}
                    <div className="bg-lightSky py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image
                                src={StudentProfileData?.photo || '/profile.png'}
                                alt="Student"
                                width={144}
                                height={144}
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl font-semibold">
                                    {StudentProfileData?.name}
                                </h1>
                                <FormModal
                                    table="student"
                                    type="update"
                                    data={StudentProfileData}
                                    icon={<FaEdit className="text-sm" />}
                                />
                            </div>
                            <p className="text-sm text-gray-500">
                                {StudentProfileData?.description?.length > 150
                                    ? `${StudentProfileData?.description.slice(0, 150)}...`
                                    : StudentProfileData?.description}
                            </p>
                            <div className="flex justify-between items-center gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <MdBloodtype className="text-sm" />
                                    <span>{StudentProfileData?.bloodType}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <FaCalendarAlt className="text-sm" />
                                    <span>
                                        {moment(StudentProfileData?.dob).format('DD-MM-YYYY')}
                                    </span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <MdOutlineMail className="text-sm" />
                                    <span>{StudentProfileData?.email}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <FaMobileAlt className="text-sm" />
                                    <span>{StudentProfileData?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* mini card */}
                    <div className="flex-1 flex gap-4 flex-wrap justify-between">
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]">
                            <MdCoPresent className="w-6 h-6" />
                            <div className="">
                                <h1 className="font-semibold text-xl">
                                    {StudentProfileData?.attendance}
                                </h1>
                                <span className="text-sm text-gray-500">Attendance</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]">
                            <FaCodeBranch className="w-6 h-6" />
                            <div className="">
                                <h1 className="font-semibold text-xl">
                                    {StudentProfileData?.grade}
                                    <sup className="text-xs">
                                        {StudentProfileData?.grade == '1' ? 'st' : 'nd'}
                                    </sup>
                                </h1>
                                <span className="text-sm text-gray-500">Grade</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]">
                            <FaChalkboard className="w-6 h-6" />
                            <div className="">
                                <h1 className="font-semibold text-xl">
                                    {StudentProfileData?.studentLessonCount}
                                </h1>
                                <span className="text-sm text-gray-500">Lessons</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]">
                            <SiGoogleclassroom className="w-6 h-6" />
                            <div className="">
                                <h1 className="font-semibold text-xl">
                                    {StudentProfileData?.class?.name}
                                </h1>
                                <span className="text-sm text-gray-500">Class</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Student`s schedule calendar */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1 className="font-medium">Student Schedule</h1>
                    {/* <ScheduleBigCalendar /> */}
                </div>
            </div>
            {/* Right */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-3 flex-wrap text-xs text-gray-500">
                        <Link
                            className="p-3 rounded-md bg-lightSky"
                            href={`/list/lessons?classId=${StudentProfileData?.class?.classId}`}
                        >
                            Student`s Lessons
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-lightBlue"
                            href={`/list/teachers?classId=${StudentProfileData?.class?.classId}`}
                        >
                            Student`s Teachers
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-lightYellow"
                            href={`/list/exams?classId=${StudentProfileData?.class?.classId}`}
                        >
                            Student`s Exams
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-gray-200"
                            href={`/list/assignments?classId=${StudentProfileData?.class?.classId}`}
                        >
                            Student`s Assignments
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-pink-200"
                            href={`/list/results?studentId=${StudentProfileData?.studentId}`}
                        >
                            Student`s Results
                        </Link>
                    </div>
                </div>
                <PerformanceChart chartData={StudentProfileData?.Performance} />
                <Announcements
                    top3Data={StudentProfileData?.class?.studentInfoAnnouncementTop3}
                    announcementData={StudentProfileData?.class?.studentInfoAnnouncement}
                />
            </div>
        </div>
    );
};

export default StudentProfilePage;
