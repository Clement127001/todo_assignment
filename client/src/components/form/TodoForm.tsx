import { Plus } from "lucide-react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { CommonInput } from "@/components/form/CommonInput";
import { CommonTextArea } from "@/components/form/CommonTextArea";
import { Button } from "@/components/ui/button";
import type { TodoFormType } from "@/types/todo";

const TodoForm = ({
  todoForm,
  onSubmit,
  isEdit,
}: {
  todoForm: UseFormReturn<TodoFormType>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isEdit?: boolean;
}) => {
  return (
    <div className="w-full">
      <FormProvider {...todoForm}>
        <form onSubmit={onSubmit} className="py-3 pb-6 px-1 space-y-4">
          <CommonInput
            hForm={todoForm}
            label="Title"
            name="title"
            showError
            placeholder="Enter the Todo title"
            registerOptions={{
              required: "Todo title is required",
              minLength: {
                value: 4,
                message: "Title should have 4 character at least",
              },
              maxLength: {
                value: 40,
                message: "Title should have 40 character at most",
              },
            }}
            inputClassName="rounded-md"
          />

          <CommonTextArea
            hForm={todoForm}
            label="Description"
            name="description"
            placeholder="Enter todo description"
            registerOptions={{
              required: "Description is required",
              minLength: {
                value: 40,
                message: "Description need to be at least 40 characters",
              },
              maxLength: {
                value: 2500,
                message: "Description needs to be at most 2500 characters",
              },
            }}
            inputClassName="rounded-md"
          />

          <Button type="submit" className="w-full group mt-4">
            <Plus
              strokeWidth={3}
              className="group-hover:scale-125 transition-transform duration-200 ease-in-out"
            />
            {isEdit ? "Edit Todo" : "Create Todo"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default TodoForm;
