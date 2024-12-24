import React from 'react';
import { FaHome, FaUserCheck, FaCalendarAlt, FaUserCog } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentBold, PiChalkboardTeacherFill } from 'react-icons/pi';
import { RiParentLine } from 'react-icons/ri';
import { SiGoogleclassroom } from 'react-icons/si';
import { TfiWrite } from 'react-icons/tfi';
import {
    MdOutlineAssignment,
    MdOutlineMessage,
    MdOutlineSettings,
    MdSubject,
} from 'react-icons/md';
import { LuNotebookPen } from 'react-icons/lu';
import { GrAnnounce } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';
import { role } from '@/lib/data';

export const Menu = () => {
    const MenuItems = [
        {
            title: 'MENU',
            items: [
                {
                    icon: <FaHome />,
                    label: 'Home',
                    href: '/',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
                {
                    icon: <GiTeacher />,
                    label: 'Teachers',
                    href: '/list/teachers',
                    visible: ['parent', 'admin', 'teacher'],
                },
                {
                    icon: <PiStudentBold />,
                    label: 'Students',
                    href: '/list/students',
                    visible: ['parent', 'admin', 'teacher'],
                },
                {
                    icon: <RiParentLine />,
                    label: 'Parents',
                    href: '/list/parents',
                    visible: ['parent', 'admin', 'teacher'],
                },
                {
                    icon: <MdSubject />,
                    label: 'Subjects',
                    href: '/list/subjects',
                    visible: ['admin'],
                },
                {
                    icon: <SiGoogleclassroom />,
                    label: 'Classes',
                    href: '/list/classes',
                    visible: ['parent', 'admin', 'teacher'],
                },
                {
                    icon: <PiChalkboardTeacherFill />,
                    label: 'Lessons',
                    href: '/list/lessons',
                    visible: ['parent', 'admin', 'teacher'],
                },
                {
                    icon: <TfiWrite />,
                    label: 'Exams',
                    href: '/list/exams',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
                {
                    icon: <MdOutlineAssignment />,
                    label: 'Assignments',
                    href: '/list/assignments',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
                {
                    icon: <LuNotebookPen />,
                    label: 'Results',
                    href: '/list/results',
                    visible: ['admin', 'teacher', 'student', 'parent'],
                },
                {
                    icon: <FaUserCheck />,
                    label: 'Attendance',
                    href: '/list/attendance',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
                {
                    icon: <FaCalendarAlt />,
                    label: 'Events',
                    href: '/list/events',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
                {
                    icon: <MdOutlineMessage />,
                    label: 'Messaages',
                    href: '/list/messages',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
                {
                    icon: <GrAnnounce />,
                    label: 'Announcements',
                    href: '/list/announcements',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
            ],
        },
        {
            title: 'OTHER',
            items: [
                {
                    icon: <FaUserCog />,
                    label: 'Profile',
                    href: '/profile',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
                {
                    icon: <MdOutlineSettings />,
                    label: 'Settings',
                    href: '/settings',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
                {
                    icon: <AiOutlineLogout />,
                    label: 'Logout',
                    href: '/logout',
                    visible: ['student', 'parent', 'admin', 'teacher'],
                },
            ],
        },
    ];
    return (
        <div className="mt-4 text-sm">
            {MenuItems?.map(i => (
                <div className="flex flex-col gap-2" key={i?.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-2">
                        {i?.title}
                    </span>
                    {i?.items?.map(d => {
                        if (d?.visible?.includes(role)) {
                            return (
                                <Link
                                    href={d?.href}
                                    key={d?.label}
                                    className="flex justify-center lg:justify-start gap-4 text-gray-500 py-1 px-2 font-semibold rounded-md hover:bg-lightSky"
                                >
                                    <span className="text-2xl">{d?.icon}</span>
                                    <span className="hidden lg:block">{d?.label}</span>
                                </Link>
                            );
                        }
                    })}
                </div>
            ))}
        </div>
    );
};
