import ErrorMessage from "@/components/ErrorMessage";
import TodosSkeleton from "@/components/todo/TodoList/TodosSkeleton";
import { useTodos } from "@/hooks/useTodos";
import { baseApiUrl } from "@/utils/common";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

const AllTodosPage = () => {
  const { isLoading, error, todoList, fetchTodoList } = useTodos();
  if (error) return <ErrorMessage error={error} redirectLink="/" />;
  if (isLoading) return <TodosSkeleton />;

  if (!todoList || todoList.todos.length === 0)
    return (
      <div className="font-semibold min-h-[40vh] flex items-center">
        <p className="capitalize">no todos available</p>
      </div>
    );

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

  return (
    <div className="flex h-screen justify-center pt-5">
      <div className="space-y-2 w-[50%]">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Your Todos</h2>

          <Button>Add Todo</Button>
        </div>
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
                      handleStatusChange(_id, e.target.value === "completed")
                    }
                    className="rounded-sm border border-gray-300 px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTodosPage;
