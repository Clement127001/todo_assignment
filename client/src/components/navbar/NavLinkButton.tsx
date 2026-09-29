import { Link, useLocation } from "react-router-dom";
import type { LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavLinkButton = ({
  label,
  to,
  Icon,
}: {
  label: string;
  to: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  const router = useLocation();
  const isActive = router.pathname === to;

  return (
    <Link to={to} className="cursor-pointer">
      <div className="relative">
        <Button
          className={`cursor-pointer text-md gap-3 py-5 font-normal min-h-[40px]
        transition-colors duration-300 bg-transparent w-fit  shadow-none  hover:bg-transparent hover:cursor-pointer  ${
          isActive
            ? " text-black shadow-freelancer"
            : "text-gray-700 hover:text-black"
        }`}
        >
          {Icon && <Icon strokeWidth={2.5} />}
          <p className="font-medium capitalize">{label}</p>
        </Button>

        {isActive && (
          <div className="bg-app-primary-700  h-1 rounded-t-sm block absolute w-full bottom-[-16px]" />
        )}
      </div>
    </Link>
  );
};

export default NavLinkButton;
