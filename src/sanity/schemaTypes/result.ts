import { defineField, defineType } from 'sanity';

export const ResultsTableTypes = defineType({
    name: 'result',
    title: 'Result',
    type: 'document',
    fields: [
        defineField({
            name: 'resultId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Result_ID_${d.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subject',
            type: 'reference',
            to: [{ type: 'subject' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'class',
            type: 'reference',
            to: [{ type: 'class' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'teacher',
            type: 'reference',
            to: [{ type: 'teacher' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'student',
            type: 'reference',
            to: [{ type: 'student' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'type',
            type: 'string',
            initialValue: 'exam',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'score',
            type: 'number',
            validation: Rule => Rule.positive().lessThan(101).required(),
        }),
    ],
});
