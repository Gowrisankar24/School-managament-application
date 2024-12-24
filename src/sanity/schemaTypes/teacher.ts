import { defineField, defineType } from 'sanity';

export const teacherTableTypes = defineType({
    name: 'teacher',
    title: 'Teacher',
    type: 'document',
    fields: [
        defineField({
            name: 'teacherId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Teacher_ID_${d.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'email',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'photo',
            type: 'url',
            validation: Rule => Rule.required(),
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
            name: 'subjects',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'subject' }] }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'classes',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'class' }] }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'address',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
    ],
});
