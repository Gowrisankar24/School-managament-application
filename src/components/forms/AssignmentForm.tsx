/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdCancel } from 'react-icons/md';
import { AssignmentSchema, AssignmentSchemaTypes } from '@/lib/formValidationSchema';
import { Box, Chip, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@/lib/action';
import { ASSIGNMENT_DOC_TYPE } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import moment from 'moment';

const AssignmentForm = ({
    type,
    data,
    setOpen,
    dropdownClsData,
    dropDownTeacherList,
    dropdownSubsData,
}: {
    type: 'create' | 'update';
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dropdownClsData?: Array<{ [key: string]: string }>;
    dropDownTeacherList?: Array<{ [key: string]: string }>;
    dropdownSubsData?: Array<{ [key: string]: string }>;
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AssignmentSchemaTypes>({
        resolver: zodResolver(AssignmentSchema),
    });
    const [selectedClsList, setSelectedClsList] = useState<string>('');
    const [selectedSubList, setSelectedSubList] = useState<string>('');
    const [seletedTeachersList, setSeletedTeachersList] = useState<string>('');
    useEffect(() => {
        if (!isEmpty(data)) {
            setSeletedTeachersList(data?.teacher?._id);
            setSelectedSubList(data?.subject?._id);
            setSelectedClsList(data?.class?._id);
        }
    }, [data]);

    const hanldeClsChange = useCallback(
        (event: SelectChangeEvent<typeof selectedClsList>) => {
            const {
                target: { value },
            } = event;
            setSelectedClsList(value);
        },
        [selectedClsList],
    );
    const hanldeSubChange = useCallback(
        (event: SelectChangeEvent<typeof selectedSubList>) => {
            const {
                target: { value },
            } = event;
            setSelectedSubList(value);
        },
        [selectedSubList],
    );
    const hanldeTeachersChange = useCallback(
        (event: SelectChangeEvent<typeof seletedTeachersList>) => {
            const {
                target: { value },
            } = event;
            setSeletedTeachersList(value);
        },
        [seletedTeachersList],
    );
    const onSubmitForm = handleSubmit(async formData => {
        const formPropAssignment = {
            _id: type == 'create' ? uuidv4() : data?._id,
            assignmentId: type == 'create' ? uuidv4() : data?.assignmentId,
            dueDate: moment(formData?.duedate).format('YYYY-MM-DD'),
            subject: {
                _type: 'reference',
                _ref: selectedSubList,
                _key: uuidv4(),
            },
            class: {
                _type: 'reference',
                _ref: selectedClsList,
                _key: uuidv4(),
            },
            teacher: {
                _type: 'reference',
                _ref: seletedTeachersList,
                _key: uuidv4(),
            },
        };
        try {
            const result = await createAction(formPropAssignment, ASSIGNMENT_DOC_TYPE);
            if (result?.status === 'SUCCESS') {
                router.push(`/list/assignments`);
                setOpen(false);
                toast.success(`Assignment list ${type}d successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(`Failed to add Assignment list`, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    });

    return (
        <>
            <Box
                sx={{ height: '55vh', display: 'flex', flexDirection: 'column' }}
                className="bg-white rounded-md w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"
            >
                <Box sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <Typography
                        variant="caption"
                        className="font-semibold bg-lightSky p-2 relative rounded-t-md flex flex-row items-center"
                    >
                        <h3 className="text-lg mx-1">
                            {type === 'create' ? 'Create a new Exam' : 'Update a Exam'}{' '}
                        </h3>
                        <span
                            className="absolute right-2 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <MdCancel className="text-xl" />
                        </span>
                    </Typography>
                </Box>
                <Box className="flex-1 overflow-y-auto side-bar rounded-sm">
                    <form className="flex flex-col gap-8 mx-3" onSubmit={onSubmitForm}>
                        <Box className="flex flex-row justify-between gap-4 w-full">
                            <div className="w-full">
                                <label className="text-xs text-gray-500">Date</label>
                                <input
                                    type={'date'}
                                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                                    {...register('duedate')}
                                    defaultValue={data?.dueDate}
                                />
                                {errors?.duedate?.message && (
                                    <p className="text-xs text-red-400">
                                        {errors?.duedate?.message.toString()}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="text-xs text-gray-500">Class</label>
                                <Select
                                    className="p-1 rounded-md text-sm w-full h-10"
                                    value={selectedClsList}
                                    onChange={hanldeClsChange}
                                    renderValue={selected => {
                                        return (
                                            <Chip
                                                key={selected}
                                                label={
                                                    dropdownClsData?.find(
                                                        (item: any) => item?._id == selected,
                                                    )?.name
                                                }
                                            />
                                        );
                                    }}
                                >
                                    {dropdownClsData?.map((cls: any) => (
                                        <MenuItem key={cls?._id} value={cls?._id}>
                                            {cls?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </Box>
                        <Box className="flex flex-row justify-between gap-4 w-full">
                            <div className="w-full">
                                <label className="text-xs text-gray-500">Subject</label>
                                <Select
                                    className="p-2 rounded-md text-sm w-full h-10"
                                    value={selectedSubList}
                                    onChange={hanldeSubChange}
                                    renderValue={selected => {
                                        return (
                                            <Chip
                                                key={selected}
                                                label={
                                                    dropdownSubsData?.find(
                                                        (item: any) => item?._id == selected,
                                                    )?.subjectName
                                                }
                                            />
                                        );
                                    }}
                                >
                                    {dropdownSubsData?.map((sub: any) => (
                                        <MenuItem key={sub?._id} value={sub?._id}>
                                            {sub?.subjectName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="w-full">
                                <label className="text-xs text-gray-500">Teacher</label>
                                <Select
                                    className="p-2 rounded-md text-sm w-full h-10"
                                    value={seletedTeachersList}
                                    onChange={hanldeTeachersChange}
                                    renderValue={selected => {
                                        return (
                                            <Chip
                                                key={selected}
                                                label={
                                                    dropDownTeacherList?.find(
                                                        (item: any) => item?._id == selected,
                                                    )?.name
                                                }
                                            />
                                        );
                                    }}
                                >
                                    {dropDownTeacherList?.map((stu: any) => (
                                        <MenuItem key={stu?._id} value={stu?._id}>
                                            {stu?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </Box>
                        <Box className="flex justify-center items-center gap-5 my-4">
                            <button className="bg-blue-400 text-white p-2 rounded-md">
                                {type === 'create' ? 'Create' : 'Update'}
                            </button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default AssignmentForm;
