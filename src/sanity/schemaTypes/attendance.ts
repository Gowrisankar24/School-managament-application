import { defineField, defineType } from 'sanity';

export const AttendanceChartTypes = defineType({
    name: 'attendance',
    title: 'Attendance',
    type: 'document',
    fields: [
        defineField({
            name: 'Weekdays',
            type: 'array',
            of: [
                {
                    type: 'document',
                    fields: [
                        {
                            name: 'days',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Mon', value: 'Mon' },
                                    { title: 'Tue', value: 'Tue' },
                                    { title: 'Wed', value: 'Wed' },
                                    { title: 'Thu', value: 'Thu' },
                                    { title: 'Fri', value: 'Fri' },
                                ],
                            },
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'present',
                            type: 'number',
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'absent',
                            type: 'number',
                            validation: Rule => Rule.required(),
                        },
                    ],
                },
            ],
        }),
    ],
});
