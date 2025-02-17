import { defineField, defineType } from 'sanity';

export const StudentTableTypes = defineType({
    name: 'student',
    title: 'Student',
    type: 'document',
    fields: [
        defineField({
            name: 'studentId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Student_ID_${d.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'username',
            type: 'string',
        }),
        defineField({
            name: 'email',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'password',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'string',
            validation: Rule =>
                Rule.min(3).max(200).error('Description must be atmost 200 character'),
        }),
        defineField({
            name: 'nationality',
            type: 'string',
        }),
        defineField({
            name: 'photo',
            type: 'url',
        }),
        defineField({
            name: 'phone',
            type: 'string',
            validation: Rule =>
                Rule.required()
                    .regex(/^[0-9]{10}$/, {
                        name: 'phone number',
                    })
                    .error('Mobile number must be exactly 10 digits'),
        }),
        defineField({
            name: 'sex',
            type: 'string',
            options: {
                list: [
                    { title: 'Male', value: 'Male' },
                    { title: 'Female', value: 'Female' },
                ],
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'grade',
            type: 'number',
            validation: Rule =>
                Rule.lessThan(6).required().positive().error('Grade must be exactly upto 5'),
        }),
        defineField({
            name: 'class',
            type: 'reference',
            to: [{ type: 'class' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'address',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'bloodType',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'dob',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'attendance',
            type: 'string',
            validation: Rule =>
                Rule.regex(/[0-9]*\.?[0-9]+%/g).error('Value must be added with % symbol'),
        }),
        defineField({
            name: 'subjects',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'subject' }] }],
        }),
        defineField({
            name: 'Performance',
            type: 'array',
            of: [
                {
                    name: 'Performancecharts',
                    type: 'document',
                    fields: [
                        {
                            name: 'name',
                            type: 'string',
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'value',
                            type: 'number',
                            validation: Rule => Rule.required(),
                        },
                    ],
                },
            ],
        }),
        // defineField({
        //     name: 'ScheduleTime',
        //     title: 'Period Timings(Student)',
        //     type: 'array',
        //     of: [
        //         {
        //             name: 'Duration',
        //             title: 'Time  Period Duration',
        //             description: 'Please Select start and end time',
        //             type: 'object',
        //             fields: [
        //                 defineField({
        //                     name: 'title',
        //                     title: 'Title',
        //                     type: 'reference',
        //                     to: [{ type: 'subject' }],
        //                     validation: Rule => Rule.required(),
        //                 }),
        //                 defineField({
        //                     name: 'class',
        //                     title: 'Class',
        //                     type: 'reference',
        //                     to: [{ type: 'class' }],
        //                     validation: Rule => Rule.required(),
        //                 }),
        //                 defineField({
        //                     name: 'start',
        //                     title: 'Start Time',
        //                     type: 'datetime',
        //                     options: {
        //                         timeFormat: 'HH:mm',
        //                     },
        //                     validation: Rule => Rule.required(),
        //                 }),
        //                 defineField({
        //                     name: 'end',
        //                     title: 'End Time',
        //                     type: 'datetime',
        //                     options: {
        //                         timeFormat: 'HH:mm',
        //                     },
        //                     validation: Rule => Rule.required(),
        //                 }),
        //             ],
        //         },
        //     ],
        // }),
    ],
});
