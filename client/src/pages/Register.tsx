import RegisterForm from "@/components/auth/register/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <section className="bg-white min-w-[400px] rounded-md py-8 px-10 shadow-lg border-[1px] space-y-8">
        <h2 className="text-center text-3xl font-bold">Register</h2>
        <RegisterForm />

        <p style={{ display: "flex" }}>
          Already had account?{" "}
          <Link
            to={"/login"}
            className="text-app-primary-700 ml-2 font-semibold"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
