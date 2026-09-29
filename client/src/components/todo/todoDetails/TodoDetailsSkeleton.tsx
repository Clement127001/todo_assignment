const TodoDetailsSkeleton = () => {
  return (
    <div className="w-[60%] space-y-6 animate-pulse">
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="w-[40%] h-6 bg-gray-200 rounded-sm" />
      </div>

      <div className="w-full h-80 bg-gray-200 rounded-md" />

      <div className="space-y-2">
        <div className="w-full h-6 bg-gray-200 rounded-sm" />
        <div className="w-full h-6 bg-gray-200 rounded-sm" />
        <div className="w-[40%] h-6 bg-gray-200 rounded-sm" />
      </div>
    </div>
  );
};

export default TodoDetailsSkeleton;
