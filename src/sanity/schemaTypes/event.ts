import { defineField, defineType } from 'sanity';

export const eventsTableListTypes = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        defineField({
            name: 'eventId',
            type: 'string',
            initialValue: () => {
                let d = new Date();
                return `Event_ID_${d.getTime()}`;
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
            to: [
                {
                    type: 'class',
                },
            ],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'date',
            type: 'date',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'startTime',
            type: 'datetime',
            options: {
                timeFormat: 'HH:mm',
                // timeStep: 30,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'endTime',
            type: 'datetime',
            options: {
                timeFormat: 'HH:mm',
                // timeStep: 30,
            },
            validation: Rule => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
});
