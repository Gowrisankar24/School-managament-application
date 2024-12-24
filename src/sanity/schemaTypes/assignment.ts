import { defineField, defineType } from 'sanity';

export const assignmentTableTypes = defineType({
    name: 'assignment',
    title: 'Assignment',
    type: 'document',
    fields: [
        defineField({
            name: 'assignmentId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Assignment_ID_${d?.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subject',
            type: 'reference',
            to: [{ type: 'subject', title: 'subjectName' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'class',
            type: 'reference',
            to: [
                {
                    type: 'class',
                },
            ],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'teacher',
            type: 'reference',
            to: [
                {
                    type: 'teacher',
                },
            ],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'dueDate',
            title: 'Due Date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
    ],
});
