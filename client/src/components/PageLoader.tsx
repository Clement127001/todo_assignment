const PageLoader = ({
  isPageLoaderVisible,
  message,
}: {
  isPageLoaderVisible: boolean;
  message: string | null;
}) => {
  if (!isPageLoaderVisible) return null;

  return (
    <section className="fixed inset-0 z-100 flex items-center justify-center bg-black/20">
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg  space-y-3">
        <div className="w-10 h-10 border-4 border-app-primary-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="">{message ? message : "Loading..."}</p>
      </div>
    </section>
  );
};

export default PageLoader;
