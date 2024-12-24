import { defineField, defineType } from 'sanity';

export const AnnoncementTableTypes = defineType({
    name: 'announcement',
    title: 'Announcement',
    type: 'document',
    fields: [
        defineField({
            name: 'announcementId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Announcement_ID_${d?.getTime()}`;
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'class',
            type: 'reference',
            to: [{ type: 'class' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
});
