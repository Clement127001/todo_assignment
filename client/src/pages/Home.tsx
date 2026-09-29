import { Button } from "@/components/ui/button";
import { UseLogin } from "@/contexts/LoginProvider";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isLoggedIn } = UseLogin();

  return (
    <div className="w-[90%] md:w-[70%] mx-auto min-h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
        <img
          src="/assets/logo.svg"
          width={90}
          height={90}
          alt="Todo App Logo"
        />

        <div className="space-y-3">
          <h1 className="text-5xl font-sans font-bold tracking-tight">
            Organize your day.
            <br />
            <span className="text-primary">Get things done.</span>
          </h1>

          <p className="tracking-wide leading-relaxed max-w-[550px] mx-auto text-gray-600">
            A simple and powerful todo app to help you organize your tasks, stay
            focused, and make progress every day.
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          <Link to={isLoggedIn ? "/todos" : "/login"}>
            <Button className="hover:shadow-lg">
              {isLoggedIn ? "View my todos" : "Get started"}
            </Button>
          </Link>
        </div>

        <div className="flex gap-8 mt-6 text-sm text-gray-500">
          <div className="flex gap-2">
            <Check size={18} color="green" /> Simple
          </div>
          <div className="flex gap-2">
            <Check size={18} color="green" /> Organized
          </div>
          <div className="flex gap-2">
            <Check size={18} color="green" /> Productive
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
