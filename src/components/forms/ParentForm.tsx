/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReusableInputFields } from '../ReusableInputFields';
import { MdCancel, MdCloudUpload, MdDelete } from 'react-icons/md';
import { parentSchema, ParentSchemaTypes } from '@/lib/formValidationSchema';
import { Box, Chip, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { CldUploadWidget } from 'next-cloudinary';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { PARENT_DOC_TYPE } from '@/lib/data';
import { createAction } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { reusableFunc } from '@/lib/utils';

const ParentForm = ({
    type,
    data,
    setOpen,
    dropdownStudentData,
}: {
    type: 'create' | 'update';
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dropdownStudentData?: Array<{ [key: string]: string }>;
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ParentSchemaTypes>({
        resolver: zodResolver(parentSchema),
    });
    const [imgFile, setImgFile] = useState<any>();
    const [imgURL, setImgURL] = useState<any>();
    const [selectedStudentName, setSelectedStudentName] = useState<string[]>([]);

    useEffect(() => {
        if (!isEmpty(data)) {
            const getDefaultSub = reusableFunc(data?.students);
            setSelectedStudentName(getDefaultSub);
            setImgURL(data?.photo);
        }
    }, [data]);
    //handle student change event
    const hanldeStudentChange = (event: SelectChangeEvent<typeof selectedStudentName>) => {
        const {
            target: { value },
        } = event;
        setSelectedStudentName(typeof value === 'string' ? value.split(',') : value);
    };
    const onSubmitForm = handleSubmit(async formData => {
        const FormPropsParent = {
            _id: type === 'create' ? uuidv4() : data?._id,
            parentId:
                type === 'create' ? `parent_Id_${moment().toDate().getTime()}` : data?.parentId,
            name: formData?.firstName + ' ' + formData?.surname,
            email: formData?.email,
            username: formData?.username,
            password: formData?.password,
            photo: imgURL,
            phone: formData?.phone,
            address: formData?.address,
            sex: formData?.sex,
            students: selectedStudentName?.map(stu => ({
                _type: 'reference',
                _ref: stu,
                _key: uuidv4(),
            })),
        };
        try {
            const result = await createAction(FormPropsParent, PARENT_DOC_TYPE);
            if (result?.status === 'SUCCESS') {
                router.push(`/list/parents`);
                setOpen(false);
                toast.success(`Parent info ${type}d successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (error) {
            console.log('err', error);
            toast.error(`Failed to add Parent list`, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    });
    return (
        <>
            <Box
                sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}
                className="bg-white rounded-md w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"
            >
                <Box sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <Typography
                        variant="caption"
                        className="font-semibold bg-lightSky p-2 relative rounded-t-md flex flex-row items-center"
                    >
                        <h3 className="text-lg mx-1">
                            {type === 'create' ? 'Create a new Parent' : 'Update a Parent'}{' '}
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
                    <form className="flex flex-col gap-4" onSubmit={onSubmitForm}>
                        <Box className="h-auto px-4">
                            <Typography variant="subtitle2" className="text-gray-400">
                                Authtentication Information
                            </Typography>
                            <Box className="flex justify-between flex-wrap gap-4">
                                <ReusableInputFields
                                    label="Username"
                                    name="username"
                                    register={register}
                                    defaultValue={data?.name}
                                    error={errors?.username}
                                />
                                <ReusableInputFields
                                    label="Email"
                                    name="email"
                                    type="email"
                                    register={register}
                                    defaultValue={data?.email}
                                    error={errors?.email}
                                />
                                <ReusableInputFields
                                    label="Password"
                                    name="password"
                                    register={register}
                                    type="Password"
                                    defaultValue={data?.password}
                                    error={errors?.password}
                                />
                            </Box>
                            <Typography
                                variant="subtitle2"
                                className="text-gray-400"
                                sx={{ mt: 2 }}
                            >
                                Personal Information
                            </Typography>
                            <Box className="flex justify-between flex-wrap gap-4">
                                <ReusableInputFields
                                    label="First Name"
                                    name="firstName"
                                    register={register}
                                    defaultValue={data?.name?.split(' ')[0]}
                                    error={errors?.firstName}
                                />
                                <ReusableInputFields
                                    label="Last Name"
                                    name="surname"
                                    register={register}
                                    defaultValue={data?.name?.split(' ')[1]}
                                    error={errors?.surname}
                                />

                                <ReusableInputFields
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    register={register}
                                    defaultValue={data?.phone}
                                    error={errors?.phone}
                                />
                                <ReusableInputFields
                                    label="Address"
                                    name="address"
                                    register={register}
                                    defaultValue={data?.address}
                                    error={errors?.address}
                                />

                                <div className="flex flex-col gap-2 w-full md:w-1/4">
                                    <label className="text-xs text-gray-500">Sex</label>
                                    <select
                                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                                        {...register('sex')}
                                        defaultValue={data?.sex}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors?.sex?.message && (
                                        <p className="text-xs text-red-400">
                                            {errors?.sex?.message.toString()}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 w-full md:w-1/4">
                                    <label className="text-xs text-gray-500">Upload Photo</label>
                                    <CldUploadWidget
                                        uploadPreset="school_app"
                                        onSuccess={(result: any, { widget }) => {
                                            setImgFile(result?.info);
                                            setImgURL(result?.info?.secure_url);
                                            widget.close();
                                        }}
                                    >
                                        {({ open }) => {
                                            return (
                                                <>
                                                    <div
                                                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-xs text-gray-500 flex flex-col items-center cursor-pointer"
                                                        onClick={() => open()}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <MdCloudUpload className="text-xl" />
                                                            <span>Upload a Photo</span>
                                                        </span>
                                                    </div>
                                                </>
                                            );
                                        }}
                                    </CldUploadWidget>
                                    {imgURL && (
                                        <div className="flex flex-row gap-2">
                                            <a
                                                href={imgURL}
                                                target="_blank"
                                                className="text-xs whitespace-nowrap text-ellipsis overflow-hidden text-violet-400"
                                            >
                                                {imgFile?.display_name || imgURL}
                                            </a>
                                            <span className="text-lg">
                                                <MdDelete
                                                    className="cursor-pointer text-red-500"
                                                    onClick={() => setImgURL(null)}
                                                />
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label className="text-xs text-gray-500">Studenets</label>
                                    <Select
                                        multiple
                                        className="p-2 rounded-md text-sm w-full"
                                        // {...register('students')}
                                        value={selectedStudentName}
                                        onChange={hanldeStudentChange}
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
                                                                    dropdownStudentData?.find(
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
                                        {dropdownStudentData?.map((stu: any) => (
                                            <MenuItem key={stu?._id} value={stu?._id}>
                                                {stu?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* {errors?.students?.message && (
                                        <p className="text-xs text-red-400">
                                            {errors?.students?.message.toString()}
                                        </p>
                                    )} */}
                                </div>
                            </Box>
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

export default ParentForm;
