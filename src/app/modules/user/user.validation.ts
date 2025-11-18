import { string, z } from 'zod';
import { USER_ROLES } from '../../../enums/user';

export const createArtistUserZodSchema = z.object({
     body: z.object({
          email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
          role: z.enum([USER_ROLES.ARTIST, USER_ROLES.INVESTOR]),
          password: z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters long'),
     }),
});

const createInvestorUserZodSchema = z.object({
     body: z.object({
          email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
          password: z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters long'),
     }),
});

const updateUserZodSchema = z.object({
     body: z.object({
          email: z.string().email('Invalid email address').optional(),
     }),
});

export const UserValidation = {
     createArtistUserZodSchema,
     updateUserZodSchema,
     createInvestorUserZodSchema,
};
