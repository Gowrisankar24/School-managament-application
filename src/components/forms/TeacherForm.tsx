/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReusableInputFields } from '../ReusableInputFields';
import { MdCancel, MdCloudUpload } from 'react-icons/md';
import { teacherSchema, TeacherSchemaTypes } from '@/lib/formValidationSchema';
import { CldUploadWidget } from 'next-cloudinary';
import { createAction } from '@/lib/action';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Typography, Box, Chip, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

const TeacherForm = ({
    type,
    data,
    setOpen,
    dropdownClsData,
    dropdownSubsData,
}: {
    type: 'create' | 'update';
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dropdownClsData?: Array<{ _id: string; name: string }>;
    dropdownSubsData?: Array<{ _id: string; subjectName: string }>;
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeacherSchemaTypes>({
        resolver: zodResolver(teacherSchema),
    });
    const [imgFile, setImgFile] = useState<any>();
    const [selectedSubjectVal, setSelectedSubjectVal] = useState<string[]>([]);
    const [selectedClsVal, setSelectedClsVal] = useState<string[]>([]);

    //set default values of select compo
    useEffect(() => {
        if (!isEmpty(data)) {
            const reusableFunc = (value: Array<{ _id: string[] }>) => {
                const getId = value?.map(d => d?._id);
                return getId;
            };
            const getDefaultSub: any = reusableFunc(data?.subjects);
            const getDefaultCls: any = reusableFunc(data?.classes);
            setSelectedSubjectVal(getDefaultSub);
            setSelectedClsVal(getDefaultCls);
            setImgFile(data?.photo);
        }
    }, [data]);

    //select sub value change
    const handleSubjectChange = useCallback(
        (event: SelectChangeEvent<typeof selectedSubjectVal>) => {
            const {
                target: { value },
            } = event;
            setSelectedSubjectVal(typeof value === 'string' ? value.split(',') : value);
        },
        [selectedSubjectVal]
    );

    //select cls value change
    const handleClsChange = useCallback(
        (event: SelectChangeEvent<typeof selectedClsVal>) => {
            const {
                target: { value },
            } = event;
            setSelectedClsVal(typeof value === 'string' ? value.split(',') : value);
        },
        [selectedClsVal]
    );

    const onSubmitForm = handleSubmit(async formData => {
        try {
            const FormPropsTeacher = {
                _id: type === 'create' ? uuidv4() : data?._id,
                teacherId:
                    type === 'create'
                        ? `Teacher_ID_${moment().toDate().getTime()}`
                        : data?.teacherId,
                name: formData?.name + ' ' + formData?.surname,
                email: formData?.email,
                photo: type === 'create' ? imgFile?.secure_url : data?.photo,
                phone: formData?.phone,
                address: formData?.address,
                bloodType: formData?.bloodType,
                dob: moment(formData?.birthday).format('YYYY-MM-DD'),
                sex: formData?.sex,
                Performance: ['1st semester', '2nd semester'].map((semester, index) => ({
                    _type: 'charts',
                    name: semester,
                    value: formData?.performance / 2,
                    _key: uuidv4(),
                })),
                subjects: formData?.subjects?.map(sub => ({
                    _type: 'reference',
                    _ref: sub,
                    _key: uuidv4(),
                })),
                classes: formData?.classes?.map(cls => ({
                    _type: 'reference',
                    _ref: cls,
                    _key: uuidv4(),
                })),
                lessons: formData?.subjects?.map(sub => ({
                    _type: 'reference',
                    _ref: sub,
                    _key: uuidv4(),
                })),
                branches: formData?.subjects?.length,
                username: formData?.username,
                password: formData?.password,
                description: formData?.description,
            };
            const result = await createAction(FormPropsTeacher, 'teacher');
            if (result?.status === 'SUCCESS') {
                router.push(`/list/teachers`);
                setOpen(false);
                toast.success(`Teachers info added successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (err) {
            console.log('err', err);
            if (err instanceof z.ZodError) {
                const fieldsError = err.flatten().fieldErrors;
                // setErrors(fieldsError as unknown as Record<string, string>);
            } else {
                console.error('Unknown error:', err);
            }
            toast.error(`Failed to add Teachers list`, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    });
    const performanceTotalVal =
        data && data?.Performance?.reduce((sum: number, item: any) => sum + (item.value || 0), 0);
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
                        <h3 className="text-lg mx-1">Create a new Teacher</h3>
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
                                Authentication Information
                            </Typography>
                            <Box className="flex justify-between flex-wrap gap-4">
                                <ReusableInputFields
                                    label="Username"
                                    name="username"
                                    register={register}
                                    defaultValue={data?.username}
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
                                    name="name"
                                    register={register}
                                    defaultValue={data?.name?.split(' ')[0]}
                                    error={errors?.name}
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
                                <ReusableInputFields
                                    label="Blood Type"
                                    name="bloodType"
                                    register={register}
                                    defaultValue={data?.bloodType}
                                    error={errors?.bloodType}
                                />
                                <ReusableInputFields
                                    label="Birthday"
                                    name="birthday"
                                    defaultValue={data?.dob}
                                    register={register}
                                    error={errors.birthday}
                                    type="date"
                                />
                                <ReusableInputFields
                                    label="Performance (max 200)"
                                    name="performance"
                                    register={register}
                                    defaultValue={performanceTotalVal}
                                    error={errors?.performance}
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
                                        onSuccess={(result, { widget }) => {
                                            setImgFile(result.info);
                                            widget.close();
                                        }}
                                    >
                                        {({ open }) => {
                                            return (
                                                <>
                                                    <div
                                                        className="text-xs text-gray-500 flex flex-col items-center cursor-pointer gap-2"
                                                        onClick={() => open()}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <MdCloudUpload className="text-3xl" />
                                                            <span>Upload a Photo</span>
                                                        </div>
                                                        {imgFile && (
                                                            <div className="flex flex-row text-green-400 items-center">
                                                                <span>{imgFile?.display_name}</span>
                                                                {/* <MdDelete
                                                    className="cursor-pointer text-red-500"
                                                    onClick={() => setImgFile(null)}
                                                /> */}
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            );
                                        }}
                                    </CldUploadWidget>
                                    {imgFile && (
                                        <span className="text-xs whitespace-nowrap text-ellipsis overflow-hidden gap-0">
                                            <a
                                                href={imgFile}
                                                target="_blank"
                                                className="text-violet-400"
                                            >
                                                {imgFile}
                                            </a>
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-row gap-3 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-xs text-gray-500">Subjects</label>
                                        <Select
                                            multiple
                                            className="p-2 rounded-md text-sm w-full"
                                            {...register('subjects')}
                                            value={selectedSubjectVal}
                                            onChange={handleSubjectChange}
                                            renderValue={selected => {
                                                return (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        {selected?.map(value => {
                                                            return (
                                                                <Chip
                                                                    key={value}
                                                                    label={
                                                                        dropdownSubsData?.find(
                                                                            (item: any) =>
                                                                                item?._id == value
                                                                        )?.subjectName
                                                                    }
                                                                />
                                                            );
                                                        })}
                                                    </Box>
                                                );
                                            }}
                                        >
                                            {dropdownSubsData?.map(sub => (
                                                <MenuItem key={sub?._id} value={sub?._id}>
                                                    {sub?.subjectName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors?.subjects?.message && (
                                            <p className="text-xs text-red-400">
                                                {errors?.subjects?.message.toString()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-xs text-gray-500">Classes</label>
                                        <Select
                                            multiple
                                            className="p-2 rounded-md text-sm w-full"
                                            {...register('classes')}
                                            value={selectedClsVal}
                                            onChange={handleClsChange}
                                            defaultValue={data?.classes?.name}
                                            renderValue={selected => {
                                                return (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        {selected?.map(value => {
                                                            return (
                                                                <Chip
                                                                    key={value}
                                                                    label={
                                                                        dropdownClsData?.find(
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
                                            {dropdownClsData?.map(cls => (
                                                <MenuItem key={cls?._id} value={cls?._id}>
                                                    {cls?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors?.classes?.message && (
                                            <p className="text-xs text-red-400">
                                                {errors?.classes?.message.toString()}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label className="text-xs text-gray-500">Description</label>
                                    <textarea
                                        {...register('description')}
                                        rows={3}
                                        minLength={5}
                                        cols={10}
                                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                                        defaultValue={data?.description}
                                    />
                                </div>
                            </Box>
                        </Box>
                        <Box className="flex justify-center items-center gap-5 my-4">
                            <button className="bg-blue-400 text-white p-2 rounded-md">
                                Submit
                            </button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default TeacherForm;
