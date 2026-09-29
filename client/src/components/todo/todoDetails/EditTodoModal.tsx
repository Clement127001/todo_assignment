import { toast } from "sonner";
import { useForm, type SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TodoForm from "@/components/form/TodoForm";
import { usePageLoader } from "@/contexts/pageLoaderProvider";
import type { Todo, TodoFormType } from "@/types/todo";
import { baseApiUrl } from "@/utils/common";

const EditTodoModal = ({
  todoData,
  opened,
  onClose,
  fetchTodoData,
}: {
  todoData: Todo;
  opened: boolean;
  onClose: () => void;
  fetchTodoData: () => Promise<void>;
}) => {
  const { title, description } = todoData;
  const todoForm = useForm<TodoFormType>({
    defaultValues: {
      title,
      description,
    },
  });

  const { showPageLoader, hidePageLoader } = usePageLoader();
  const { handleSubmit } = todoForm;

  const onCreateTodo: SubmitHandler<TodoFormType> = async (data) => {
    showPageLoader("Creating Todo");

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(`${baseApiUrl}/todo/${todoData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Success", {
          description: "Todo edited successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {},
          },
        });
        fetchTodoData();
        onClose();
      } else {
        const err = await response.json();
        toast.error("Error", {
          description: err.msg ?? "Failed to edit todo",
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (_) {
      toast.error("Error", {
        description: "Failed to edit todo",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {},
        },
      });
    } finally {
      hidePageLoader();
    }
  };

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-3">
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>
            Create todo to manage your tasks
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start mt-4 w-full flex gap-3  overflow-y-auto">
          <TodoForm
            isEdit
            todoForm={todoForm}
            onSubmit={handleSubmit(onCreateTodo)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoModal;
