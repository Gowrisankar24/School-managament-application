import { defineField, defineType } from 'sanity';

export const SubjectsTableTypes = defineType({
    name: 'subject',
    title: 'Subject',
    type: 'document',
    fields: [
        defineField({
            name: 'subjectId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Subject_ID_${d.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subjectName',
            title: 'Subject Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'teacher',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'teacher' }] }],
            validation: Rule => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'subjectName',
        },
    },
});
