import { toast } from "sonner";
import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import LoginForm from "@/components/auth/login/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const router = useLocation();

  const [searchParams, _] = useSearchParams();

  const isUnauthorized = String(searchParams.get("ua") ?? "");
  const path = router.pathname;

  useEffect(() => {
    if (!isUnauthorized) return;

    if (isUnauthorized === "true") {
      toast.warning("Unauthorized", {
        description: "Please login to view the page",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {
            {
            }
          },
        },
      });
    } else {
      toast.success("Logged out", {
        description: "Logged out successfully",
        duration: 2000,
        action: {
          label: "close",
          onClick: () => {
            {
            }
          },
        },
      });
    }

    navigate(path, { replace: true });
  }, [isUnauthorized, searchParams]);

  return (
    <>
      <section className="flex justify-center items-center h-screen">
        <div className="bg-white min-w-[400px] rounded-md py-8 px-10 shadow-lg border-[1px] space-y-8">
          <h2 className="text-center text-3xl font-bold">Login</h2>
          <LoginForm />

          <p style={{ display: "flex" }}>
            {`Don't have account? `}
            <Link
              to={"/register"}
              className="text-app-primary-700 ml-2 font-semibold"
            >
              register
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
