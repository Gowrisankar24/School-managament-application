/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReusableInputFields } from '../ReusableInputFields';
import { MdCancel, MdCloudUpload } from 'react-icons/md';
import { Box, Chip, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { AnnoouncementSchema, AnnouncementSchemaTypes } from '@/lib/formValidationSchema';
import { useRouter } from 'next/navigation';
import { createAction } from '@/lib/action';
import { ANNOUNCEMENTS_DOC_TYPE } from '@/lib/data';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { isEmpty } from 'lodash';

export const AnnouncementForm = ({
    type,
    data,
    setOpen,
    dropdownClsData,
    dropDownTeacherList,
}: {
    type: 'create' | 'update';
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dropdownClsData?: Array<{ [key: string]: string }>;
    dropDownTeacherList?: Array<{ [key: string]: string }>;
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AnnouncementSchemaTypes>({
        resolver: zodResolver(AnnoouncementSchema),
    });
    const [selectedClsList, setSelectedClsList] = useState<string>('');
    const [seletedTeachersList, setSeletedTeachersList] = useState<string>('');
    useEffect(() => {
        if (!isEmpty(data)) {
            setSelectedClsList(data?.class?._id);
            setSeletedTeachersList(data?.teacher?._id);
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
    const hanldeTeacherChange = useCallback(
        (event: SelectChangeEvent<typeof seletedTeachersList>) => {
            const {
                target: { value },
            } = event;
            setSeletedTeachersList(value);
        },
        [seletedTeachersList],
    );
    const onSubmitForm = handleSubmit(async formData => {
        const formPropAnnouncement = {
            _id: type == 'create' ? uuidv4() : data?._id,
            announcementId: type == 'create' ? uuidv4() : data?.announcementId,
            title: formData?.title,
            date: moment(formData?.date).format('YYYY-MM-DD'),
            description: formData?.description,
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
            const result = await createAction(formPropAnnouncement, ANNOUNCEMENTS_DOC_TYPE);
            if (result?.status === 'SUCCESS') {
                router.push(`/list/announcements`);
                setOpen(false);
                toast.success(`Announcements list ${type}d successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(`Failed to add Announcement list`, {
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
                        <Box className="flex justify-between flex-wrap gap-4 mx-3">
                            <ReusableInputFields
                                label="Title"
                                name="title"
                                register={register}
                                defaultValue={data?.title}
                                error={errors?.title}
                            />
                            <ReusableInputFields
                                label="Date"
                                name="date"
                                type="date"
                                register={register}
                                defaultValue={data?.date}
                                error={errors?.date}
                            />
                            <div className="w-full md:w-1/4">
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
                                <label className="text-xs text-gray-500">Teacher</label>
                                <Select
                                    className="p-2 rounded-md text-sm w-full h-10"
                                    value={seletedTeachersList}
                                    onChange={hanldeTeacherChange}
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
                            <div className="w-full">
                                <label className="text-xs text-gray-500">Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={2}
                                    minLength={5}
                                    cols={10}
                                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full h-10"
                                    defaultValue={data?.description}
                                />
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
