/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FieldErrors } from 'react-hook-form';

type InputFieldsType = {
    label: string;
    type: string;
    register: any;
    name: string;
    defaultValue?: string;
    error?: FieldErrors;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const ReusableInputFields = ({
    label,
    type = 'text',
    register,
    name,
    defaultValue,
    error,
    inputProps,
}: InputFieldsType) => {
    return (
        <>
            <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label className="text-xs text-gray-500">{label}</label>
                <input
                    type={type}
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                    {...register(name)}
                    defaultValue={defaultValue}
                    {...inputProps}
                />
                {error?.message && (
                    <p className="text-xs text-red-400">{error?.message.toString()}</p>
                )}
            </div>
        </>
    );
};
