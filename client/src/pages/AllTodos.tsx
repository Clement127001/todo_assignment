import ErrorMessage from "@/components/ErrorMessage";
import TodosSkeleton from "@/components/todo/TodoList/TodosSkeleton";
import { useTodos } from "@/hooks/useTodos";
import { baseApiUrl } from "@/utils/common";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { lazy, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "sonner";
import { usePageLoader } from "@/contexts/pageLoaderProvider";

const CreateTodoModal = lazy(
  () => import("@/components/todo/CreateTodoModal.tsx"),
);

const AllTodosPage = () => {
  const { isLoading, error, todoList, fetchTodoList } = useTodos();
  const [createTodoModalOpened, setCreateTodoModalOpened] =
    useState<boolean>(false);
  const [deleteTodoModalOpened, setDeleteTodoModalOpened] =
    useState<boolean>(false);
  const [deleteTodoId, setDeleteTodoId] = useState<string | null>(null);
  const { showPageLoader, hidePageLoader } = usePageLoader();

  if (error) return <ErrorMessage error={error} redirectLink="/" />;
  if (isLoading) return <TodosSkeleton />;

  const handleStatusChange = async (id: string, completed: boolean) => {
    try {
      const userToken = Cookies.get("userToken");
      await fetch(baseApiUrl + `/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ completed }),
      });

      fetchTodoList();
    } catch (err) {}
  };

  const handleOpenCreateTodoModal = () => {
    setCreateTodoModalOpened(true);
    console.log("opening for creating todo");
  };

  const handleCloseCreateTodoModal = () => {
    setCreateTodoModalOpened(false);
  };

  const handleOpenDeleteTodoModal = (id: string) => {
    setDeleteTodoId(id);
    setDeleteTodoModalOpened(true);
  };

  const handleCloseDeleteTodoModal = () => {
    setCreateTodoModalOpened(false);
    setDeleteTodoId(null);
  };

  const handleDeleteTodo = async () => {
    showPageLoader("Deleting, please wait");

    try {
      const userToken = Cookies.get("userToken");
      const response = await fetch(baseApiUrl + "/todo/" + deleteTodoId, {
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

        fetchTodoList();
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
      handleCloseDeleteTodoModal();
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center pt-5">
        <div className="space-y-2 w-[50%]">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Your Todos</h2>

            <Button onClick={handleOpenCreateTodoModal}>Add Todo</Button>
          </div>

          {!todoList || todoList.todos.length === 0 ? (
            <p className="capitalize">no todos available</p>
          ) : (
            <div className="flex justify-center py-8">
              <div className="w-[95%] space-y-4">
                {todoList.todos.map((todo) => {
                  const { _id, title, description, completed } = todo;

                  return (
                    <div
                      key={_id}
                      className="flex items-center justify-between gap-4 rounded-md border border-gray-200 p-3 hover:bg-gray-100"
                    >
                      <Link to={"/todos/" + _id} className="flex-1">
                        <h3
                          className={`font-medium ${
                            completed
                              ? "text-gray-400 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {title}
                        </h3>
                        {description && (
                          <p className="text-sm text-gray-500">{description}</p>
                        )}
                      </Link>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          completed
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {completed ? "Completed" : "Pending"}
                      </span>

                      <select
                        value={completed ? "completed" : "pending"}
                        onChange={(e) =>
                          handleStatusChange(
                            _id,
                            e.target.value === "completed",
                          )
                        }
                        className="rounded-sm border border-gray-300 px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>

                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          handleOpenDeleteTodoModal(_id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {createTodoModalOpened && (
        <CreateTodoModal
          opened={createTodoModalOpened}
          onClose={handleCloseCreateTodoModal}
          fetchTodoList={fetchTodoList}
        />
      )}

      {deleteTodoId && deleteTodoModalOpened && (
        <ConfirmationModal
          opened={deleteTodoModalOpened}
          onClose={handleCloseDeleteTodoModal}
          title="Delete todo"
          description="Are you sure you want to delete this todo? You cannot revert this action"
          confirmText="Yes, Delete"
          onClickConfirm={handleDeleteTodo}
        />
      )}
    </>
  );
};

export default AllTodosPage;
