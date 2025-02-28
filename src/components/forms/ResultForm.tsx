/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReusableInputFields } from '../ReusableInputFields';
import { MdCancel } from 'react-icons/md';
import { Box, Chip, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { ResultsSchema, ResultsSchemaTypes } from '@/lib/formValidationSchema';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { toast } from 'react-toastify';
import { createAction } from '@/lib/action';
import { RESULTS_DOC_TYPE } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';

const ResultForm = ({
    type,
    data,
    setOpen,
    dropdownSubsData,
    dropdownStudentData,
    dropDownTeacherList,
    dropdownClsData,
}: {
    type: 'create' | 'update';
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dropdownSubsData?: Array<{ [key: string]: string }>;
    dropdownStudentData?: Array<{ [key: string]: string }>;
    dropDownTeacherList?: Array<{ [key: string]: string }>;
    dropdownClsData?: Array<{ [key: string]: string }>;
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResultsSchemaTypes>({
        resolver: zodResolver(ResultsSchema),
    });
    const [selectedSubList, setSelectedSubList] = useState<string>('');
    const [selectedClsList, setSelectedClsList] = useState<string>('');
    const [selectedTeacherList, setSelectedTeacherList] = useState<string>('');
    const [selectedStudentList, setSelectedStudentList] = useState<string>('');

    useEffect(() => {
        if (!isEmpty(data)) {
            setSelectedSubList(data?.subject?._id);
            setSelectedClsList(data?.class?._id);
            setSelectedTeacherList(data?.teacher?._id);
            setSelectedStudentList(data?.student?._id);
        }
    }, [data]);

    const handleSubChange = useCallback(
        (event: SelectChangeEvent<typeof selectedSubList>) => {
            const {
                target: { value },
            } = event;
            setSelectedSubList(value);
        },
        [selectedSubList],
    );
    const handleClsChange = useCallback(
        (event: SelectChangeEvent<typeof selectedClsList>) => {
            const {
                target: { value },
            } = event;
            setSelectedClsList(value);
        },
        [selectedClsList],
    );
    const handleTeacherChange = useCallback(
        (event: SelectChangeEvent<typeof selectedTeacherList>) => {
            const {
                target: { value },
            } = event;
            setSelectedTeacherList(value);
        },
        [selectedTeacherList],
    );
    const handleStudentChange = useCallback(
        (event: SelectChangeEvent<typeof selectedStudentList>) => {
            const {
                target: { value },
            } = event;
            setSelectedStudentList(value);
        },
        [selectedStudentList],
    );
    const onSubmitForm = handleSubmit(async (formData: any) => {
        const formPropResult = {
            _id: type == 'create' ? uuidv4() : data?._id,
            resultId: type == 'create' ? uuidv4() : data?.resultId,
            date: moment(formData?.date).format('YYYY-MM-DD'),
            score: parseInt(formData?.score),
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
                _ref: selectedTeacherList,
                _key: uuidv4(),
            },
            student: {
                _type: 'reference',
                _ref: selectedStudentList,
                _key: uuidv4(),
            },
        };
        try {
            const result = await createAction(formPropResult, RESULTS_DOC_TYPE);
            if (result?.status === 'SUCCESS') {
                router.push(`/list/results`);
                setOpen(false);
                toast.success(`Results list ${type}d successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(`Failed to add Results list`, {
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
                            {type === 'create' ? 'Create a new Result' : 'Update a Result'}{' '}
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
                    <form className="flex flex-col gap-8" onSubmit={onSubmitForm}>
                        <Box className="flex justify-between flex-wrap gap-4 mx-3">
                            <ReusableInputFields
                                label="Date"
                                name="date"
                                type="date"
                                register={register}
                                defaultValue={data?.date}
                                error={errors?.date}
                            />
                            <ReusableInputFields
                                label="Score"
                                name="score"
                                register={register}
                                type="number"
                                defaultValue={data?.score}
                                error={errors?.score}
                            />
                            <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Student</label>
                                <Select
                                    className="p-2 rounded-md text-sm w-full h-10"
                                    value={selectedStudentList}
                                    onChange={handleStudentChange}
                                    renderValue={selected => {
                                        return (
                                            <Chip
                                                key={selected}
                                                label={
                                                    dropdownStudentData?.find(
                                                        (item: any) => item?._id == selected,
                                                    )?.name
                                                }
                                            />
                                        );
                                    }}
                                >
                                    {dropdownStudentData?.map((stu: any) => (
                                        <MenuItem key={stu?._id} value={stu?._id}>
                                            {stu?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </Box>
                        <Box className="flex justify-between flex-wrap gap-4 mx-3">
                            <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Subject</label>
                                <Select
                                    className="p-2 rounded-md text-sm w-full h-10"
                                    value={selectedSubList}
                                    onChange={handleSubChange}
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
                            <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Class</label>
                                <Select
                                    className="p-2 rounded-md text-sm w-full h-10"
                                    value={selectedClsList}
                                    onChange={handleClsChange}
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
                            <div className="w-full md:w-1/4">
                                <label className="text-xs text-gray-500">Teacher</label>
                                <Select
                                    className="p-2 rounded-md text-sm w-full h-10"
                                    value={selectedTeacherList}
                                    onChange={handleTeacherChange}
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
                                    {dropDownTeacherList?.map((teacher: any) => (
                                        <MenuItem key={teacher?._id} value={teacher?._id}>
                                            {teacher?.name}
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

export default ResultForm;
