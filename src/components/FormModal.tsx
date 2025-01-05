/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
// import dynamic from 'next/dynamic';
// import { TeacherForm } from './forms/TeacherForm';
import { StudentForm } from './forms/StudentForm';
import { ParentForm } from './forms/ParentForm';
import { ClassForm } from './forms/ClassForm';
import { SubjectForm } from './forms/SubjectForm';
import { EventForm } from './forms/EventForm';
import { LessonForm } from './forms/LessonForm';
import { ExamForm } from './forms/ExamForm';
import { AssignmentForm } from './forms/AssignmentForm';
import { ResultForm } from './forms/ResultForm';
import { AnnouncementForm } from './forms/Announcement';
import { Dialog, Modal, Popover, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import { deleteAction } from '@/lib/action';
import { client } from '@/sanity/lib/client';
import { TEACHERS_LIST_QUERY } from '@/sanity/lib/queries';
import { useRouter } from 'next/navigation';

export const FormModal = ({
    table,
    type,
    data,
    id,
    icon,
    dropdownClsData,
    dropdownSubsData,
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
    id?: string;
    icon: React.ReactNode;
    dropdownClsData?: Array<{ _id: string; name: string }>;
    dropdownSubsData?: Array<{ _id: string; subjectName: string }>;
}) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const bgColor =
        type === 'create' ? 'bg-lightYellow' : type === 'update' ? 'bg-lightSky' : 'bg-lightBlue';

    const addPadding = type === 'create' ? 'p-3' : 'p-2';

    const TeacherForm = dynamic(() => import('./forms/TeacherForm'), {
        loading: () => <h1>Loading...</h1>,
    });

    const forms: {
        [key: string]: (
            type: 'create' | 'update',
            data?: any,
            setOpen?: Dispatch<SetStateAction<boolean>>
        ) => JSX.Element;
    } = {
        teacher: (type, data) => (
            <TeacherForm
                type={type}
                data={data}
                setOpen={setOpen}
                dropdownClsData={dropdownClsData}
                dropdownSubsData={dropdownSubsData}
            />
        ),
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

    //delete form func
    const formDeleteAction = async () => {
        try {
            if (!id) {
                throw new Error('ID is required');
            }
            const deletedResult = await deleteAction(id, 'teacher');
            console.log('deletedResult', deletedResult);
            if (deletedResult?.status === 'SUCCESS') {
                setOpen(false);
                toast.success(`Teachers info deleted successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
                // await client.fetch(TEACHERS_LIST_QUERY);
                router.push(`/list/teachers`);
            } else {
                throw new Error('Unexpected delete response');
            }
        } catch (error) {
            console.log('errpr', error);
            setOpen(false);
            toast.error(`Failed to deleted Teachers info!.`, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };
    //

    //create form
    const Form = () => {
        return type === 'delete' && id ? (
            <div>
                <Dialog open={open}>
                    <Typography className="p-2">
                        Are you sure you want to delete this record from this{' '}
                        <span className=" capitalize font-semibold">{table}</span>`s table?.
                    </Typography>
                    <div className="flex flex-row justify-center items-center p-3 gap-3">
                        <button
                            className="bg-blue-400 text-white py-2 px-4 rounded-md border-none w-max self-center"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-600 text-white py-2 px-4 rounded-md border-none w-max self-center"
                            onClick={formDeleteAction}
                        >
                            Delete
                        </button>
                    </div>
                </Dialog>
            </div>
        ) : // <form onSubmit={formDeleteAction} className="p-4 flex flex-col gap-4">
        //     <span className="text-center font-medium">
        //         All data will be lost.Are you sure you want to delete this record from this{' '}
        //         {table}`s table
        //     </span>

        // </form>
        type === 'create' || type === 'update' ? (
            forms[table](type, data)
        ) : (
            'Form Not Found'
        );
    };

    const handleClick = () => {
        setOpen(true);
    };
    return (
        <>
            <button
                className={`${bgColor} flex items-center justify-center rounded-full ${addPadding} relative`}
                onClick={handleClick}
            >
                {icon}
            </button>
            {/* {open && ( */}
            {/* //{' '}
            <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                //{' '}
                <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"> */}
            <Modal
                open={open}
                // onClose={() => setOpen(false)}
                className="flex items-center justify-center"
            >
                <Form />
            </Modal>
            {/* //{' '}
                </div>
                //{' '}
            </div>
            )} */}
            <ToastContainer />
        </>
    );
};
