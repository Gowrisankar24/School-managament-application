import { defineField, defineType } from 'sanity';

export const FinanceChartTypes = defineType({
    name: 'finance',
    title: 'Finance',
    type: 'document',
    fields: [
        defineField({
            name: 'monthData',
            type: 'array',
            of: [
                {
                    type: 'document',
                    fields: [
                        {
                            name: 'month',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Jan', value: 'Jan' },
                                    { title: 'Feb', value: 'Feb' },
                                    { title: 'Mar', value: 'Mar' },
                                    { title: 'Apr', value: 'Apr' },
                                    { title: 'May', value: 'May' },
                                    { title: 'Jun', value: 'Jun' },
                                    { title: 'Jul', value: 'Jul' },
                                    { title: 'Aug', value: 'Aug' },
                                    { title: 'Sep', value: 'Sep' },
                                    { title: 'Oct', value: 'Oct' },
                                    { title: 'Nov', value: 'Nov' },
                                    { title: 'Dec', value: 'Dec' },
                                ],
                            },
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'Income',
                            type: 'number',
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'Expense',
                            type: 'number',
                            validation: Rule => Rule.required(),
                        },
                    ],
                },
            ],
        }),
    ],
});
