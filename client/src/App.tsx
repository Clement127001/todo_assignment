import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/Root";
import ErrorPage from "@/pages/Error";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import HomePage from "@/pages/Home";
import TodoRootPage from "@/pages/TodoRoot";
import AllTodosPage from "@/pages/AllTodos";
import TodoDetailsPage from "@/pages/TodoDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "todos",
        element: <TodoRootPage />,
        children: [
          { index: true, element: <AllTodosPage /> },
          {
            path: ":todoId",
            element: <TodoDetailsPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
