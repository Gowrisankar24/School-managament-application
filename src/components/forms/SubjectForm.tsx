/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { MdCancel } from 'react-icons/md';
import { SubjectSchema, SubjectSchemaTypes } from '@/lib/formValidationSchema';
import { Box, Chip, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { reusableFunc } from '@/lib/utils';
import { createAction } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const SubjectForm = ({
    type,
    data,
    setOpen,
    dropDownTeacherList,
}: {
    type: 'create' | 'update';
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dropDownTeacherList?: Array<{ [key: string]: string }>;
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubjectSchemaTypes>({
        resolver: zodResolver(SubjectSchema),
    });
    const [seletedTeachersList, setSelectedTeachersList] = useState<string[]>([]);

    //set default values of select compo
    useEffect(() => {
        if (!isEmpty(data)) {
            const getDefaultTeachers = reusableFunc(data?.teacher);
            setSelectedTeachersList(getDefaultTeachers);
        }
    }, [data]);
    const hanldeTeachersChange = useCallback(
        (event: SelectChangeEvent<typeof seletedTeachersList>) => {
            const {
                target: { value },
            } = event;
            setSelectedTeachersList(typeof value === 'string' ? value.split(',') : value);
        },
        [seletedTeachersList]
    );
    const onSubmitForm = handleSubmit(async formData => {
        const formPropSubjects = {
            _id: type === 'create' ? uuidv4() : data?._id,
            subjectName: formData?.subjectName,
            teacher: seletedTeachersList?.map(teacher => ({
                _type: 'reference',
                _ref: teacher,
                _key: uuidv4(),
            })),
        };
        try {
            const result = await createAction(formPropSubjects, 'subject');
            if (result?.status === 'SUCCESS') {
                router.push(`/list/subjects`);
                setOpen(false);
                toast.success(`Subject List ${type}d successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.log('err', error);
            toast.error(`Failed to add Subjects list`, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    });
    return (
        <>
            <Box
                sx={{ height: '55vh', display: 'flex', flexDirection: 'column' }}
                className="bg-white rounded-md w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"
            >
                <Box sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <Typography
                        variant="caption"
                        className="font-semibold bg-lightSky p-2 relative rounded-t-md flex flex-row items-center"
                    >
                        <h3 className="text-lg mx-1">
                            {type === 'create' ? 'Create a new Subject' : 'Update a Subject'}
                        </h3>
                        <span
                            className="absolute right-2 cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <MdCancel className="text-xl" />
                        </span>
                    </Typography>
                </Box>
                <Box className="flex flex-1 justify-center items-center overflow-y-auto side-bar rounded-sm">
                    <form className="flex flex-col w-full gap-5 mx-3" onSubmit={onSubmitForm}>
                        <div className="flex flex-col gap-2">
                            <div>
                                <label className="text-xs text-gray-500">Subject Name</label>
                                <input
                                    type={type}
                                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                                    {...register('subjectName')}
                                    defaultValue={data?.subjectName}
                                />
                                {errors?.subjectName?.message && (
                                    <p className="text-xs text-red-400">
                                        {errors?.subjectName?.message.toString()}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="text-xs text-gray-500">Teachers</label>
                                <Select
                                    multiple
                                    className="p-2 rounded-md text-sm w-full"
                                    value={seletedTeachersList}
                                    onChange={hanldeTeachersChange}
                                    renderValue={selected => {
                                        return (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 0.5,
                                                }}
                                            >
                                                {selected?.map((value: string) => {
                                                    return (
                                                        <Chip
                                                            key={value}
                                                            label={
                                                                dropDownTeacherList?.find(
                                                                    (item: any) =>
                                                                        item?._id == value
                                                                )?.name
                                                            }
                                                        />
                                                    );
                                                })}
                                            </Box>
                                        );
                                    }}
                                >
                                    {dropDownTeacherList?.map((d: any) => (
                                        <MenuItem key={d?._id} value={d?._id}>
                                            {d?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

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

export default SubjectForm;
