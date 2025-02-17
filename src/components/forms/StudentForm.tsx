/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReusableInputFields } from '../ReusableInputFields';
import { MdCancel, MdCloudUpload, MdDelete } from 'react-icons/md';
import { studentSchema, StudentSchemaTypes } from '@/lib/formValidationSchema';
import { Box, Chip, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { CldUploadWidget } from 'next-cloudinary';
import { toast } from 'react-toastify';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'lodash';
import { reusableFunc } from '@/lib/utils';

const StudentForm = ({
    type,
    data,
    setOpen,
    dropdownClsData,
    dropdownSubsData,
}: {
    type: 'create' | 'update';
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    dropdownClsData?: Array<{ [key: string]: string }>;
    dropdownSubsData?: Array<{ _id: string; subjectName: string }>;
}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StudentSchemaTypes>({
        resolver: zodResolver(studentSchema),
    });
    const [imgFile, setImgFile] = useState<any>();
    const [imgURL, setImgURL] = useState<any>();
    const [selectedSubjectVal, setSelectedSubjectVal] = useState<string[]>([]);
    const [selectedClsVal, setSelectedClsVal] = useState<string>('');

    //set default values of select compo
    useEffect(() => {
        if (!isEmpty(data)) {
            const getDefaultSub = reusableFunc(data?.subjects);
            // const getDefaultCls: any = reusableFunc(data?.class);
            setSelectedSubjectVal(getDefaultSub);
            setSelectedClsVal(data?.class?._id);
            setImgURL(data?.photo);
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
            setSelectedClsVal(value);
        },
        [selectedClsVal]
    );

    const onSubmitForm = handleSubmit(async formData => {
        const FormPropsStudent = {
            _id: type === 'create' ? uuidv4() : data?._id,
            studentId:
                type === 'create' ? `Student_ID_${moment().toDate().getTime()}` : data?.studentId,
            name: formData?.firstName + ' ' + formData?.surname,
            email: formData?.email,
            username: formData?.username,
            password: formData?.password,
            description: formData?.description,
            photo: imgURL,
            phone: formData?.phone,
            address: formData?.address,
            bloodType: formData?.bloodType,
            dob: moment(formData?.birthday).format('YYYY-MM-DD'),
            nationality: formData?.nationality,
            sex: formData?.sex,
            grade: formData?.grade,
            attendance: formData?.attendance,
            Performance: ['1st Semester', '2nd Semester'].map(semester => ({
                _type: 'Performancecharts',
                name: semester,
                value: formData?.performance / 2,
                _key: uuidv4(),
            })),
            subjects: selectedSubjectVal?.map(sub => ({
                _type: 'reference',
                _ref: sub,
                _key: uuidv4(),
            })),
            class: {
                _type: 'reference',
                _ref: selectedClsVal,
                _key: uuidv4(),
            },
        };
        try {
            const result = await createAction(FormPropsStudent, 'student');
            if (result?.status === 'SUCCESS') {
                router.push(`/list/students`);
                setOpen(false);
                toast.success(`Student info ${type}d successfully`, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            }
        } catch (err) {
            console.log('err', err);
            toast.error(`Failed to add Student list`, {
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
                        <h3 className="text-lg mx-1">
                            {' '}
                            {type === 'create'
                                ? 'Create a new Student Details'
                                : 'Update the Student Details'}
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
                                    label="Nationality"
                                    name="nationality"
                                    register={register}
                                    defaultValue={data?.nationality}
                                    error={errors?.nationality}
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
                                    error={errors?.birthday}
                                    type="date"
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
                                <ReusableInputFields
                                    label="Attendance %"
                                    name="attendance"
                                    defaultValue={data?.attendance}
                                    register={register}
                                    error={errors?.attendance}
                                />
                                <ReusableInputFields
                                    label="Grade(Max.grade 5)"
                                    name="grade"
                                    defaultValue={data?.grade}
                                    register={register}
                                    error={errors?.grade}
                                    type="number"
                                />

                                <ReusableInputFields
                                    label="Performance (max 200)"
                                    name="performance"
                                    register={register}
                                    defaultValue={performanceTotalVal}
                                    error={errors?.performance}
                                />

                                <div className="flex flex-col gap-2 w-full md:w-1/4">
                                    <label className="text-xs text-gray-500">Upload Photo</label>
                                    <CldUploadWidget
                                        uploadPreset="school_app"
                                        onSuccess={(result: any, { widget }) => {
                                            setImgFile(result.info);
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
                                <div className="flex flex-row gap-3 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-xs text-gray-500">Subjects</label>
                                        <Select
                                            multiple
                                            className="p-2 rounded-md text-sm w-full"
                                            // {...register('subjects')}
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
                                                        {selected?.map((value: string) => {
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
                                            {dropdownSubsData?.map((sub: any) => (
                                                <MenuItem key={sub?._id} value={sub?._id}>
                                                    {sub?.subjectName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {/* {errors?.subjects?.message && (
                                            <p className="text-xs text-red-400">
                                                {errors?.subjects?.message.toString()}
                                            </p>
                                        )} */}
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-xs text-gray-500">Classes</label>
                                        <Select
                                            className="p-2 rounded-md text-sm w-full"
                                            {...register('class')}
                                            value={selectedClsVal}
                                            onChange={handleClsChange}
                                            defaultValue={data?.class?.name}
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
                                                                dropdownClsData?.find(
                                                                    (item: any) =>
                                                                        item?._id == selected
                                                                )?.name
                                                            }
                                                        />
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
                                        {errors?.class?.message && (
                                            <p className="text-xs text-red-400">
                                                {errors?.class?.message.toString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
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
                                {type === 'create' ? 'Create' : 'Update'}
                            </button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default StudentForm;
