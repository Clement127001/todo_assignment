import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid todo ID");

export const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(4, "Title should have at least 4 characters")
      .max(100, "Title cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .min(20, "Description should have at least 20 characters")
      .max(2500, "Description cannot exceed 2500 characters"),
  }),
});

export const updateTodoSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .trim()
        .min(4, "Title should have at least 4 characters")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),

      description: z
        .string()
        .trim()
        .min(20, "Description should have at least 20 characters")
        .max(2500, "Description cannot exceed 2500 characters")
        .optional(),

      completed: z.boolean().optional(),
    })
    .refine(
      (data) =>
        data.title !== undefined ||
        data.description !== undefined ||
        data.completed !== undefined,
      {
        message: "At least one field is required for update",
      },
    ),

  params: z.object({
    todoId: objectIdSchema,
  }),
});

export const deleteTodoSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>["body"];

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>["body"];
