import { defineField, defineType } from 'sanity';

export const classTableTypes = defineType({
    name: 'class',
    title: 'Class',
    type: 'document',
    fields: [
        defineField({
            name: 'classId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Class_ID_${d.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'capacity',
            type: 'number',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'grade',
            type: 'number',
            validation: Rule =>
                Rule.lessThan(6).required().positive().error('Grade must be exactly upto 5'),
        }),
        defineField({
            name: 'supervisor',
            type: 'reference',
            to: [{ type: 'teacher' }],
            validation: Rule => Rule.required(),
        }),
        // defineField({
        //     name: 'ScheduleTime',
        //     title: 'Period Timings',
        //     type: 'array',
        //     of: [
        //         {
        //             name: 'Duration',
        //             title: 'Time  Period Duration',
        //             description: 'Please Select start and end time',
        //             type: 'object',
        //             fields: [
        //                 defineField({
        //                     name: 'subject',
        //                     title: 'Subject',
        //                     type: 'reference',
        //                     to: [{ type: 'subject' }],
        //                     validation: Rule => Rule.required(),
        //                 }),
        //                 defineField({
        //                     name: 'teacher',
        //                     title: 'Teacher',
        //                     type: 'reference',
        //                     to: [{ type: 'teacher' }],
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
        //             preview: {
        //                 select: {
        //                     title: 'subject.subjectName',
        //                     subtitle: 'teacher.name',
        //                 },
        //             },
        //         },
        //     ],
        // }),
    ],
});
