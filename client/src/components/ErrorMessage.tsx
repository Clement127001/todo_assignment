import React from "react";
import { Link } from "react-router-dom";

const ErrorMessage = ({
  error,
  redirectLink,
  textProps,
  redirectingButtonLabel = "Go back",
  className = "",
}: {
  error: any;
  textProps?: React.HTMLAttributes<HTMLParagraphElement>;
  redirectLink?: string;
  redirectingButtonLabel?: string;
  goToFullScreenOnClick?: boolean;
  className?: string;
}) => {
  console.log(error);

  return (
    <div
      className={`min-h-[90vh] flex items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center gap-4 shadow-md px-20 py-6 rounded-xl  outline-1 outline-app-gray-100 ">
        <p
          className="text-app-primary-800 dark:text-app-primary-200 capitalize text-[16px]"
          {...textProps}
        >
          {error ?? "An error occurred"}
        </p>
        {redirectLink && (
          <Link to={redirectLink}>
            <p className="bg-app-secondary-500 bg-app-primary-700 text-white dark:text-app-primary-200 px-4 py-2 rounded">
              {redirectingButtonLabel}
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
