/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReusableInputFields } from '../ReusableInputFields';
import { MdCloudUpload } from 'react-icons/md';

export const ClassForm = ({ type, data }: { type: 'create' | 'update'; data?: any }) => {
  const schema = z.object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long!' })
      .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({ message: 'Invalid email required!' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long!' }),
    firstName: z.string().min(1, { message: 'First name is required!' }),
    lastName: z.string().min(1, { message: 'Last name is rquired!' }),
    phone: z.number().min(10),
    address: z.string().min(1, { message: 'Address is required!' }),
    bloodType: z
      .string()
      .min(1, { message: 'Blood type is required!' })
      .max(4, { message: 'Username must be at most 4 characters long!' }),
    birthday: z.date({ message: 'Birthday is required!' }),
    sex: z.enum(['Male', 'Female'], { message: 'Sex is Required!' }),
    img: z.instanceof(File, { message: 'Image is required!' }),
  });

  type InputEvents = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputEvents>({
    resolver: zodResolver(schema),
  });
  const onSubmitForm = handleSubmit(data => {
    console.log(data);
  });
  return (
    <>
      <form className='flex flex-col gap-8' onSubmit={onSubmitForm}>
        <h1 className='text-xl font-semibold'>Create a new Class</h1>
        <span className='text-xs text-gray-400 font-medium'>
          Authtentication Information
        </span>
        <div className='flex justify-between flex-wrap gap-4'>
          <ReusableInputFields
            label='Username'
            name='username'
            register={register}
            defaultValue={data?.username}
            error={errors?.username}
          />
          <ReusableInputFields
            label='Email'
            name='email'
            type='email'
            register={register}
            defaultValue={data?.email}
            error={errors?.email}
          />
          <ReusableInputFields
            label='Password'
            name='password'
            register={register}
            type='Password'
            defaultValue={data?.password}
            error={errors?.password}
          />
        </div>

        <span className='text-xs text-gray-400 font-medium'>Personal Information</span>
        <div className='flex justify-between flex-wrap gap-4'>
          <ReusableInputFields
            label='First Name'
            name='firstName'
            register={register}
            defaultValue={data?.firstName}
            error={errors?.firstName}
          />
          <ReusableInputFields
            label='Last Name'
            name='lastName'
            register={register}
            defaultValue={data?.lastName}
            error={errors?.lastName}
          />

          <ReusableInputFields
            label='Phone'
            name='phone'
            type='tel'
            register={register}
            defaultValue={data?.phone}
            error={errors?.phone}
          />
          <ReusableInputFields
            label='Address'
            name='address'
            register={register}
            defaultValue={data?.address}
            error={errors?.address}
          />
          <ReusableInputFields
            label='Blood Type'
            name='bloodType'
            register={register}
            defaultValue={data?.bloodType}
            error={errors?.bloodType}
          />
          <ReusableInputFields
            label='Birthday'
            name='birthday'
            defaultValue={data?.birthday}
            register={register}
            error={errors.birthday}
            type='date'
          />

          <div className='flex flex-col gap-2 w-full md:w-1/4'>
            <label className='text-xs text-gray-500'>Sex</label>
            <select
              className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
              {...register('sex')}
              defaultValue={data?.sex}>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            {errors?.sex?.message && (
              <p className='text-xs text-red-400'>{errors?.sex?.message.toString()}</p>
            )}
          </div>
          <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
            <label
              className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'
              htmlFor='img'>
              <MdCloudUpload className='text-3xl' />
              Upload a Photo
            </label>
            <input
              type='file'
              {...register('img')}
              id='img'
              className='hidden'
              accept='image/png, image/jpeg'
            />
            {errors?.img?.message && (
              <p className='text-xs text-red-400'>{errors?.img?.message.toString()}</p>
            )}
          </div>
        </div>
        <button className='bg-blue-400 text-white p-2 rounded-md'>
          {type === 'create' ? 'Create' : 'Update'}
        </button>
      </form>
    </>
  );
};
