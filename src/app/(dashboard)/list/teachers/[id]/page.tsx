import Image from 'next/image';
import React from 'react';
import { MdBloodtype, MdOutlineMail, MdCoPresent } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { FaCalendarAlt, FaMobileAlt, FaCodeBranch, FaChalkboard, FaEdit } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { ScheduleBigCalendar } from '@/components/ScheduleBigCalendar';
import { Announcements } from '@/components/Announcements';
import Link from 'next/link';
import { PerformanceChart } from '@/components/PerformanceChart';
import { FormModal } from '@/components/FormModal';
import { sanityFetch } from '@/sanity/lib/live';
import { TEACHERS_INFO_BY_ID } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import moment from 'moment';

const TeacherProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const data = await client.fetch(TEACHERS_INFO_BY_ID, { id });
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
                                src={data?.photo! || `/profile.png`}
                                alt="Teacher"
                                width={144}
                                height={144}
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl font-semibold">{data?.name}</h1>
                                <FormModal
                                    table="teacher"
                                    type="update"
                                    data={data}
                                    icon={<FaEdit className="text-sm" />}
                                />
                            </div>

                            <span className="text-sm text-gray-500">
                                {data?.description.slice(0, 150)}...
                            </span>

                            <div className="flex justify-between items-center gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <MdBloodtype className="text-sm" />
                                    <span>{data?.bloodType}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <FaCalendarAlt className="text-sm" />
                                    <span>{moment(data?.dob).format('DD-MM-YYYY')}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <AiOutlineMail className="text-sm" />
                                    <span>{data?.email}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <FaMobileAlt className="text-sm" />
                                    <span>{data?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* mini card */}
                    <div className="flex-1 flex gap-4 flex-wrap justify-between">
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[46%] 2xl:w-[w-48%]">
                            <MdCoPresent className="w-6 h-6" />
                            <div className="">
                                <h1 className="font-semibold text-xl">{data?.attendance}</h1>
                                <span className="text-sm text-gray-500">Attendance</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]">
                            <FaCodeBranch className="w-6 h-6" />
                            <div className="">
                                <h1 className="font-semibold text-xl">{data?.branches}</h1>
                                <span className="text-sm text-gray-500">Branches</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]">
                            <FaChalkboard className="w-6 h-6" />
                            <div className="">
                                <h1 className="font-semibold text-xl">{data?.lessons}</h1>
                                <span className="text-sm text-gray-500">Lessons</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[w-48%]">
                            <SiGoogleclassroom className="w-6 h-6" />
                            <div className="">
                                <h1 className="font-semibold text-xl">{data?.classes?.length}</h1>
                                <span className="text-sm text-gray-500">Class</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Teacher`s schedule calendar */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h2 className="font-medium">Teacher`s Schedule</h2>
                    <ScheduleBigCalendar scheduleData={data?.ScheduleTime} />
                </div>
            </div>
            {/* Right */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-3 flex-wrap text-xs text-gray-600">
                        <Link
                            className="p-3 rounded-md bg-lightSky"
                            href={`/list/classes?supervisorId=${data?.teacherId}`}
                        >
                            Teacher&apos;s Classes
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-lightBlue"
                            href={`/list/students?teacherId=${data?.teacherId}`}
                        >
                            Teacher&apos;s Students
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-lightYellow"
                            href={`/list/lessons?teacherId=${data?.teacherId}`}
                        >
                            Teacher&apos;s Lessons
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-pink-200"
                            href={`/list/exams?teacherId=${data?.teacherId}`}
                        >
                            Teacher&apos;s Exams
                        </Link>
                        <Link
                            className="p-3 rounded-md bg-gray-200"
                            href={`/list/assignments?teacherId=${data?.teacherId}`}
                        >
                            Teacher&apos;s Assignments
                        </Link>
                    </div>
                </div>
                <PerformanceChart chartData={data?.Performance} />
                <Announcements
                    announcementData={data?.relatedAnnouncements}
                    top3Data={data?.relatedAnnouncementTop3}
                />
            </div>
        </div>
    );
};

export default TeacherProfilePage;
