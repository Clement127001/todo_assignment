import { useEffect, useState } from "react";
import { baseApiUrl } from "@/utils/common";
import Cookies from "js-cookie";
import type { TodosResponse } from "@/types/todo";

export const useTodos = () => {
  const [todoList, setTodoList] = useState<TodosResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodoList = async () => {
    setIsLoading(true);
    const emailListUrl = `${baseApiUrl}/todo/`;
    const userToken = Cookies.get("userToken");

    const response = await fetch(emailListUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTodoList(data);
      setIsLoading(false);
      setError(null);
    } else {
      const data = await response.json();
      setError(data.error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  return { isLoading, error, todoList, fetchTodoList };
};
