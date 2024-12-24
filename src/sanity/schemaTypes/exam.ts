import { defineField, defineType } from 'sanity';

export const ExamsTableTypes = defineType({
    name: 'exam',
    title: 'Exam',
    type: 'document',
    fields: [
        defineField({
            name: 'examId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Exam_ID_${d.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subject',
            type: 'reference',
            to: [
                {
                    type: 'subject',
                },
            ],
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
            name: 'date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
    ],
});
