import { cn } from "@/lib/utils";

const UserAvatar = ({ src, name }: { src?: string | null; name: string }) => {
  const fallBack = name
    .split(" ")
    .map((item) => item[0].toLocaleUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full">
      {src && (
        <img
          src={src}
          className={cn(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
          )}
        />
      )}
      <p className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 font-semibold">
        {fallBack}
      </p>
    </div>
  );
};

export default UserAvatar;
