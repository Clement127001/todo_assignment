import { lazy, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ErrorMessage from "@/components/ErrorMessage";
import TodoDetailsSkeleton from "@/components/todo/todoDetails/TodoDetailsSkeleton";
import { Button } from "@/components/ui/button";
import { useTodoDetails } from "@/hooks/useTodoDetails";
import { usePageLoader } from "@/contexts/pageLoaderProvider";
import { baseApiUrl } from "@/utils/common";

const DeleteTodoConfirmationModal = lazy(
  () => import("@/components/ConfirmationModal"),
);

const EditTodoModal = lazy(
  () => import("@/components/todo/todoDetails/EditTodoModal.tsx"),
);

const TodoDetails = ({ todoId }: { todoId: string }) => {
  const { isLoading, error, fetchTodoData, todoData } = useTodoDetails(todoId);
  const [deleteConfirmationModalOpened, setDeleteConfirmationModalOpened] =
    useState<boolean>(false);
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
  const { showPageLoader, hidePageLoader } = usePageLoader();
  const navigate = useNavigate();

  if (error) return <ErrorMessage error={error} redirectLink="/" />;

  if (isLoading) return <TodoDetailsSkeleton />;

  if (!todoData)
    return (
      <div className="font-semibold min-h-[40vh] flex items-center">
        <p className="capitalize">Todo Detail is not available</p>
      </div>
    );

  const handleOpenDeleteConfirmationModal = () => {
    setDeleteConfirmationModalOpened(true);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setDeleteConfirmationModalOpened(false);
  };

  const handleDeleteTodo = async () => {
    showPageLoader("Deleting Todo, please wait");

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(baseApiUrl + "/todo/" + todoData._id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok && response.status == 200) {
        toast.success("Todo deleted", {
          description: "Todo deleted successfully",
          duration: 2000,
          action: {
            label: "close",
            onClick: () => {},
          },
        });

        navigate("/todos");
      } else {
        const err = await response.json();
        toast.error("Error", {
          duration: 2000,
          description: err.msg ?? "Failed to delete todo",
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (_) {
      toast.error("Error", {
        description: "Failed to delete todo",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {},
        },
      });
    } finally {
      hidePageLoader();
      handleCloseDeleteConfirmationModal();
      navigate("/todos");
    }
  };

  const handleOpenEditModal = () => {
    setEditModalOpened(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpened(false);
  };

  return (
    <>
      <div className="flex min-h-screen justify-center px-4 pt-8">
        <div className="w-full max-w-2xl space-y-6">
          {/* Back link */}
          <Link
            to="/todos"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to todos
          </Link>

          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Todo Details</h2>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleOpenEditModal}
                aria-label="Edit todo"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={handleOpenDeleteConfirmationModal}
                aria-label="Delete todo"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Todo content */}
          <div className="space-y-3 rounded-md border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <h3
                className={`text-lg font-medium ${
                  todoData.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-800"
                }`}
              >
                {todoData.title}
              </h3>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
                  todoData.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {todoData.completed ? "Completed" : "Pending"}
              </span>
            </div>

            {todoData.description ? (
              <p className="whitespace-pre-wrap text-gray-600">
                {todoData.description}
              </p>
            ) : (
              <p className="text-sm italic text-gray-400">No description</p>
            )}
          </div>
        </div>
      </div>

      {deleteConfirmationModalOpened && (
        <DeleteTodoConfirmationModal
          opened={deleteConfirmationModalOpened}
          onClose={handleCloseDeleteConfirmationModal}
          title="Delete Todo"
          description="Are you sure you want to delete this todo? You cannot revert this action"
          confirmText="Yes, Delete"
          onClickConfirm={handleDeleteTodo}
        />
      )}

      {editModalOpened && (
        <EditTodoModal
          onClose={handleCloseEditModal}
          opened={editModalOpened}
          todoData={todoData}
          fetchTodoData={fetchTodoData}
        />
      )}
    </>
  );
};

export default TodoDetails;
