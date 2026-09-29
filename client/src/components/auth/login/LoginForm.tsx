import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { CommonInput } from "@/components/form/CommonInput";
import { Button } from "@/components/ui/button";
import { usePageLoader } from "@/contexts/pageLoaderProvider";
import type { UserLogin } from "@/types/login";
import { baseApiUrl, emailRegex } from "@/utils/common";

const LoginForm = () => {
  const { showPageLoader, hidePageLoader } = usePageLoader();
  const navigate = useNavigate();
  const loginForm = useForm<UserLogin>({
    mode: "onSubmit",
    defaultValues: { email: "", password: "" },
  });

  const { handleSubmit } = loginForm;

  const onLogin: SubmitHandler<UserLogin> = async (data) => {
    showPageLoader("Logging In, please wait");

    try {
      const response = await fetch(baseApiUrl + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok && response.status == 200) {
        const { token } = await response.json();
        Cookies.set("userToken", token, { expires: 7 });

        toast.success("Login Success", {
          description: "User Logged in successfully",
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
          description: err.msg ?? "Failed to Login user",
          action: {
            label: "close",
            onClick: () => {},
          },
        });
      }
    } catch (_) {
      toast.error("Error", {
        description: "Failed to login",
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
    <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
      <CommonInput
        hForm={loginForm}
        label="Email"
        type="text"
        name="email"
        placeholder="Enter email"
        registerOptions={{
          required: "Email is required",
          validate: (value: any) =>
            (typeof value === "string" && emailRegex.test(value)) ||
            "Please enter a valid email",
        }}
      />

      <CommonInput
        hForm={loginForm}
        type="password"
        label="password"
        name="password"
        placeholder="Enter password"
        registerOptions={{
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Password should be 6 character at least",
          },
        }}
      />

      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
