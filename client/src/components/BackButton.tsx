import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({
  className,
  url,
}: {
  className?: string;
  url?: string;
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (url) {
      navigate(url);
      return;
    }

    navigate(-1);
  };

  return (
    <div
      onClick={handleBack}
      className={`flex gap-2 items-center group w-fit cursor-pointer text-[14px] font-normal bg-white shadow-md px-4 py-2 rounded-md  ${className}`}
    >
      <ArrowLeft
        size={18}
        className="group-hover:scale-[1.1] group-hover:-translate-x-1 ease-linear transition-[300ms]"
      />
      <p className="hidden sm:flex">Back</p>
    </div>
  );
};

export default BackButton;
