/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReusableInputFields } from '../ReusableInputFields';
import { MdCancel } from 'react-icons/md';
import { ClassSchema, ClassSchemaTypes } from '@/lib/formValidationSchema';
import { Box, Chip, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@/lib/action';
import { CLASS_DOC_TYPE } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ClassForm = ({
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
    } = useForm<ClassSchemaTypes>({
        resolver: zodResolver(ClassSchema),
    });
    const [seletedTeachersList, setSelectedTeachersList] = useState<string>('');

    useEffect(() => {
        if (!isEmpty(data)) {
            setSelectedTeachersList(data?.supervisor?._ud);
        }
    }, [data]);
    const hanldeTeachersChange = useCallback(
        (event: SelectChangeEvent<typeof seletedTeachersList>) => {
            const {
                target: { value },
            } = event;
            setSelectedTeachersList(value);
        },
        [seletedTeachersList]
    );

    const onSubmitForm = handleSubmit(async formData => {
        const formPropClass = {
            _id: type == 'create' ? uuidv4() : data?._id,
            classId: type == 'create' ? uuidv4() : data?.classId,
            name: formData?.classname,
            capacity: parseInt(formData?.capacity),
            grade: parseInt(formData?.grade),
            supervisor: {
                _type: 'reference',
                _ref: seletedTeachersList,
                _key: uuidv4(),
            },
        };
        try {
            const result = await createAction(formPropClass, CLASS_DOC_TYPE);
            if (result?.status === 'SUCCESS') {
                router.push(`/list/classes`);
                setOpen(false);
                toast.success(`Class list ${type}d successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (err) {
            console.log('err', err);
            toast.error(`Failed to add class list`, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    });
    return (
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
                        {type === 'create' ? 'Create a new Class' : 'Update a Class'}{' '}
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
                <form className="flex flex-col gap-4 mx-3" onSubmit={onSubmitForm}>
                    <Box className="flex justify-between flex-wrap gap-4">
                        <ReusableInputFields
                            label="Class Name"
                            name="classname"
                            register={register}
                            defaultValue={data?.name}
                            error={errors?.classname}
                        />
                        <ReusableInputFields
                            label="Grade"
                            name="grade"
                            register={register}
                            defaultValue={data?.grade}
                            error={errors?.grade}
                        />
                        <ReusableInputFields
                            label="Capacity"
                            name="capacity"
                            register={register}
                            defaultValue={data?.capacity}
                            error={errors?.capacity}
                        />
                        <div className="flex flex-col gap-2 w-full md:w-1/2">
                            <label className="text-xs text-gray-500">Teacher</label>
                            <Select
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
                                            <Chip
                                                key={selected}
                                                label={
                                                    dropDownTeacherList?.find(
                                                        (item: any) => item?._id == selected
                                                    )?.name
                                                }
                                            />
                                        </Box>
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
    );
};
export default ClassForm;
