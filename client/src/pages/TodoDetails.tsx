import TodoDetails from "@/components/todo/todoDetails/TodoDetails";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TodoDetailsPage = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();

  useEffect(() => {
    if (!todoId) {
      navigate("/todos");
    }
  }, [todoId]);

  return todoId ? (
    <div className="py-10 flex flex-col items-center gap-4">
      <TodoDetails todoId={todoId} />
    </div>
  ) : null;
};

export default TodoDetailsPage;
