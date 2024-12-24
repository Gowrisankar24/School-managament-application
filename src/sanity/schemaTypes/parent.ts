import { defineField, defineType } from 'sanity';

export const parentTableTypes = defineType({
    name: 'parent',
    title: 'Parent',
    type: 'document',
    fields: [
        defineField({
            name: 'parentId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `parent_Id_${d.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'students',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'student' } }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'email',
            type: 'string',
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
            name: 'address',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
    ],
});
