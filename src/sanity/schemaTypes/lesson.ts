import { defineField, defineType } from 'sanity';

export const lessonsTableTypes = defineType({
    name: 'lesson',
    title: 'Lesson',
    type: 'document',
    fields: [
        defineField({
            name: 'lessonId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Lesson_ID_${d.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'subject',
            type: 'string',
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
        }),
    ],
});
