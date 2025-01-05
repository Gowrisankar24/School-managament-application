import { z } from 'zod';

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
    bloodType: z
        .string()
        .min(1, { message: 'Blood type is required!' })
        .max(4, { message: 'Username must be at most 4 characters long!' }),
    birthday: z.coerce.date({ message: 'Birthday is required!' }),
    sex: z.enum(['Male', 'Female'], { message: 'Sex is Required!' }),
    img: z.string().optional(),
    subjects: z
        .array(z.string())
        .refine(value => value.some(item => item), {
            message: 'You have to select at least one item.',
        })
        .optional(),
    classes: z
        .array(z.string())
        .refine(value => value.some(item => item), {
            message: 'You have to select at least one item.',
        })
        .optional(),
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
