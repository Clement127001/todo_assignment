import { useEffect, useState } from "react";
import { baseApiUrl } from "@/utils/common";
import Cookies from "js-cookie";
import type { Todo } from "@/types/todo";

export const useTodoDetails = (id: string) => {
  const [todoData, setTodoData] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodoData = async () => {
    setIsLoading(true);
    const fetchTodoUrl = `${baseApiUrl}/todo/${id}`;
    const userToken = Cookies.get("userToken");

    const response = await fetch(fetchTodoUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTodoData(data.todo);
      setIsLoading(false);
      setError(null);
    } else {
      const data = await response.json();
      setError(data.error.msg);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  return { isLoading, error, todoData, fetchTodoData };
};
