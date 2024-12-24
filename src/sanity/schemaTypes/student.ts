import { defineField, defineType } from 'sanity';

export const StudentTableTypes = defineType({
    name: 'student',
    title: 'Student',
    type: 'document',
    fields: [
        defineField({
            name: 'studentId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Student_ID_${d.getTime()}`;
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
            name: 'grade',
            type: 'number',
            validation: Rule =>
                Rule.lessThan(6).required().positive().error('Grade must be exactly upto 5'),
        }),
        defineField({
            name: 'class',
            type: 'reference',
            to: [{ type: 'class' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'address',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
    ],
});
