import { z } from "zod";

const emailSchema = z.string().trim().email("Please provide a valid email");

const passwordSchema = z
  .string()
  .min(6, "Password should have at least 6 characters");

export const registerUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name should have at least 3 characters")
      .max(30, "Name cannot exceed 30 characters"),

    email: emailSchema,

    password: passwordSchema,
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>["body"];

export type LoginUserInput = z.infer<typeof loginUserSchema>["body"];
