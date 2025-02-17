import { string, z } from 'zod';
import { TIME_REGEX_FORMAT } from './data';

export const teacherSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({ message: 'Invalid email required!' }).optional().or(z.literal('')),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long!' })
        .optional()
        .or(z.literal('')),
    name: z.string().min(1, { message: 'First name is required!' }),
    surname: z.string().min(1, { message: 'Last name is rquired!' }).optional(),
    phone: z.string().optional(),
    address: z.string().min(1, { message: 'Address is required!' }),
    bloodType: z.string().min(1, { message: 'Blood type is required!' }),
    birthday: z.coerce.date({ message: 'Birthday is required!' }),
    sex: z.enum(['Male', 'Female'], { message: 'Sex is Required!' }),
    img: z.string().url().optional(),
    attendance: z
        .string()
        .refine(val => /^[0-9]*\.?[0-9]+%$/.test(val), {
            message: 'Invalid attendance format. It should be a percentage (e.g., 75%).',
        })
        .optional(),
    // subjects: z
    //     .array(
    //         z.object({
    //             _id: z.string(),
    //             name: z.string(),
    //         })
    //     )
    //     .optional(),
    // classes: z
    //     .array(
    //         z.object({
    //             _id: z.string(),
    //             name: z.string(),
    //         })
    //     )
    //     .optional(),
    // lessons: z
    //     .array(z.string())
    //     .refine(value => value.some(item => item), {
    //         message: 'You have to select at least one item.',
    //     })
    //     .optional(),
    // branches: z
    //     .array(z.string())
    //     .refine(value => value.some(item => item), {
    //         message: 'You have to select at least one item.',
    //     })
    //     .optional(),
    performance: z.coerce.number({
        message: 'Performance must be in numbers',
    }),
    description: z.string().optional(),
});

export type TeacherSchemaTypes = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({ message: 'Invalid email required!' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
    firstName: z.string().min(1, { message: 'First name is required!' }),
    surname: z.string().min(1, { message: 'Last name is rquired!' }).optional(),
    phone: z.string().optional(),
    address: z.string().min(1, { message: 'Address is required!' }),
    bloodType: z.string().min(1, { message: 'Blood type is required!' }),
    birthday: z.coerce.date({ message: 'Birthday is required!' }),
    sex: z.enum(['Male', 'Female'], { message: 'Sex is Required!' }),
    img: z.string().url().optional(),
    description: z.string().optional(),
    grade: z.coerce.number().min(1).max(5),
    nationality: z.string().optional(),
    class: z.string().optional(),
    // subjects: z.string().optional(),
    attendance: z
        .string()
        .refine(val => /^[0-9]*\.?[0-9]+%$/.test(val), {
            message: 'Invalid attendance format. It should be a percentage (e.g., 75%).',
        })
        .optional(),
    performance: z.coerce.number({
        message: 'Performance must be in numbers',
    }),
});

export type StudentSchemaTypes = z.infer<typeof studentSchema>;

export const parentSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({ message: 'Invalid email required!' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
    firstName: z.string().min(1, { message: 'First name is required!' }),
    surname: z.string().min(1, { message: 'Last name is rquired!' }).optional(),
    phone: z.string().optional(),
    address: z.string().min(1, { message: 'Address is required!' }),
    sex: z.enum(['Male', 'Female'], { message: 'Sex is Required!' }),
    img: z.string().url().optional(),
    // students: z
    //     .array(
    //         z.object({
    //             _id: z.string(),
    //             name: z.string(),
    //         })
    //     )
    //     .optional(),
});

export type ParentSchemaTypes = z.infer<typeof parentSchema>;

export const SubjectSchema = z.object({
    subjectName: z.string().optional(),
    // teachers: z.array(z.string()),
});

export type SubjectSchemaTypes = z.infer<typeof SubjectSchema>;

export const ClassSchema = z.object({
    classname: z.string(),
    grade: z.string(),
    capacity: z.string(),
});

export type ClassSchemaTypes = z.infer<typeof ClassSchema>;

export const ExamSchema = z.object({
    date: z.coerce.date({ message: 'Exam Date is required!' }),
});

export type ExamSchemaTypes = z.infer<typeof ExamSchema>;

export const AssignmentSchema = z.object({
    duedate: z.coerce.date({ message: 'Assignment Due Date Required' }),
});

export type AssignmentSchemaTypes = z.infer<typeof AssignmentSchema>;

export const ResultsSchema = z.object({
    date: z.coerce.date({ message: 'Result Date Required' }),
    type: z.string().optional(),
    score: z.coerce.number().positive().optional(),
});

export type ResultsSchemaTypes = z.infer<typeof ResultsSchema>;

export const EventsSchema = z.object({
    title: z.string(),
    date: z.coerce.date({ message: 'Event Date Required' }),
    startTime: z
        .string()
        .min(1, 'Start Time is required')
        .regex(TIME_REGEX_FORMAT, 'Invalid Time format (HH:MM)'),
    endTime: z
        .string()
        .min(1, 'End Time is required')
        .regex(TIME_REGEX_FORMAT, 'Invalid Time format (HH:MM)'),
    description: z.string(),
});

export type EventSchemaTypes = z.infer<typeof EventsSchema>;

export const AnnoouncementSchema = z.object({
    title: z.string(),
    date: z.coerce.date({ message: 'Invalid date format' }),
    description: z.string(),
});

export type AnnouncementSchemaTypes = z.infer<typeof AnnoouncementSchema>;
