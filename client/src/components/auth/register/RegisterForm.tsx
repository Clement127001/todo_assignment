import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { CommonInput } from "@/components/form/CommonInput";
import { Button } from "@/components/ui/button";
import { baseApiUrl, emailRegex } from "@/utils/common";
import { defaultCreateUserValue } from "@/utils/register";
import type { UserRegister } from "@/types/register";
import { usePageLoader } from "@/contexts/pageLoaderProvider";

const RegisterForm = () => {
  const registerForm = useForm<UserRegister>({
    mode: "onSubmit",
    defaultValues: defaultCreateUserValue,
  });
  const navigate = useNavigate();
  const { showPageLoader, hidePageLoader } = usePageLoader();

  const { handleSubmit } = registerForm;

  const onCreate: SubmitHandler<UserRegister> = async (data) => {
    showPageLoader("Creating profile");
    try {
      const response = await fetch(baseApiUrl + "/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok && response.status == 201) {
        const { token } = await response.json();
        Cookies.set("userToken", token, { expires: 7 });

        toast.success("User Created", {
          description: "User registered  successfully",
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
          description: err.msg ?? "Failed to register user",
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
    <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
      <CommonInput
        hForm={registerForm}
        label="Name"
        type="text"
        name="name"
        placeholder="Enter Name"
        registerOptions={{
          required: "Name is required",
          minLength: {
            value: 5,
            message: "Name should be 5 character atleast",
          },
        }}
      />

      <CommonInput
        hForm={registerForm}
        label="Email"
        type="text"
        name="email"
        placeholder="Enter email"
        registerOptions={{
          required: "Email is required",
          validate: (value) =>
            (typeof value === "string" && emailRegex.test(value)) ||
            "Please enter a valid email",
        }}
      />

      <CommonInput
        hForm={registerForm}
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
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
