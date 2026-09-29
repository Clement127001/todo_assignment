import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import TodoForm from "../form/TodoForm";
import type { TodoFormType } from "@/types/todo";
import { useForm, type SubmitHandler } from "react-hook-form";
import { usePageLoader } from "@/contexts/pageLoaderProvider";
import Cookies from "js-cookie";
import { baseApiUrl } from "@/utils/common";

const CreateTodoModal = ({
  opened,
  onClose,
  fetchTodoList,
}: {
  opened: boolean;
  onClose: () => void;
  fetchTodoList: () => Promise<void>;
}) => {
  const todoForm = useForm<TodoFormType>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { showPageLoader, hidePageLoader } = usePageLoader();
  const { handleSubmit } = todoForm;

  const onCreateTodo: SubmitHandler<TodoFormType> = async (data) => {
    showPageLoader("Creating Todo");

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(`${baseApiUrl}/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Success", {
          description: "Todo created successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {},
          },
        });
        onClose();
        fetchTodoList();
      } else {
        const err = await response.json();
        toast.error("Error", {
          description: err.msg ?? "Failed to create todo",
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (_) {
      toast.error("Error", {
        description: "Failed to create todo",
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
          <TodoForm todoForm={todoForm} onSubmit={handleSubmit(onCreateTodo)} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoModal;
