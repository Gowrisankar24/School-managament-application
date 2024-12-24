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
            type: 'string',
            validation: Rule => Rule.required(),
        }),
    ],
});
