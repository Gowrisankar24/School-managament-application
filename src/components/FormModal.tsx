/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';
// import dynamic from 'next/dynamic';
import { TeacherForm } from './forms/TeacherForm';
import { StudentForm } from './forms/StudentForm';
import { ParentForm } from './forms/ParentForm';
import { ClassForm } from './forms/ClassForm';
import { SubjectForm } from './forms/SubjectForm';
import { EventForm } from './forms/EventForm';
import { LessonForm } from './forms/LessonForm';
import { ExamForm } from './forms/ExamForm';
import { AssignmentForm } from './forms/AssignmentForm';
import { ResultForm } from './forms/ResultForm';
import { AttendanceForm } from './forms/AttendanceForm';
import { AnnouncementForm } from './forms/Announcement';

export const FormModal = ({
    table,
    type,
    data,
    id,
    icon,
}: {
    table:
        | 'teacher'
        | 'student'
        | 'assignment'
        | 'class'
        | 'event'
        | 'exam'
        | 'event'
        | 'lesson'
        | 'parent'
        | 'result'
        | 'student'
        | 'announcement'
        | 'subject';
    type: 'create' | 'update' | 'delete';
    data?: any;
    id?: number;
    icon: React.ReactNode;
}) => {
    const [open, setOpen] = useState(false);
    const bgColor =
        type === 'create' ? 'bg-lightYellow' : type === 'update' ? 'bg-lightSky' : 'bg-lightBlue';

    const addPadding = type === 'create' ? 'p-3' : 'p-2';

    // const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
    //   ssr: false,
    //   loading: () => <h1>Loading...</h1>,
    // });

    // const StudentForm = dynamic(() => import('./forms/StudentForm'), {
    //   ssr: false,
    //   loading: () => <h1>Loading...</h1>,
    // });

    const forms: {
        [key: string]: (type: 'create' | 'update', data?: any) => JSX.Element;
    } = {
        teacher: (type, data) => <TeacherForm type={type} data={data} />,
        student: (type, data) => <StudentForm type={type} data={data} />,
        parent: (type, data) => <ParentForm type={type} data={data} />,
        class: (type, data) => <ClassForm type={type} data={data} />,
        subject: (type, data) => <SubjectForm type={type} data={data} />,
        lesson: (type, data) => <LessonForm type={type} data={data} />,
        exam: (type, data) => <ExamForm type={type} data={data} />,
        assignment: (type, data) => <AssignmentForm type={type} data={data} />,
        result: (type, data) => <ResultForm type={type} data={data} />,
        event: (type, data) => <EventForm type={type} data={data} />,
        announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
    };

    //create form
    const Form = () => {
        return type === 'delete' && id ? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center font-medium">
                    All data will be lost.Are you sure you want to delete this record from this{' '}
                    {table}`s table
                </span>
                <button className="bg-red-600 text-white py-2 px-4 rounded-md border-none w-max self-center">
                    Delete
                </button>
            </form>
        ) : type === 'create' || type === 'update' ? (
            forms[table](type, data)
        ) : (
            'Form Not Found'
        );
    };

    return (
        <>
            <button
                className={`${bgColor} flex items-center justify-center rounded-full ${addPadding}`}
                onClick={() => setOpen(true)}
            >
                {icon}
            </button>
            {open && (
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <Form />
                        <div
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <MdCancel className="text-xl" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
