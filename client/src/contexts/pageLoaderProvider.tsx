import { createContext, useState, useContext, type ReactNode } from "react";
import PageLoader from "@/components/PageLoader";

interface PageLoaderContextInterface {
  message: string | null;
  isPageLoaderVisible: boolean;
  hidePageLoader: () => void;
  showPageLoader: (val: string) => void;
}

const PageLoaderContext = createContext<PageLoaderContextInterface>({
  message: null,
  isPageLoaderVisible: false,
  hidePageLoader: () => {},
  showPageLoader: () => {},
});

export const PageLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isPageLoaderVisible, setIsPageLoaderVisible] =
    useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const hidePageLoader = () => {
    setIsPageLoaderVisible(false);
    setMessage(null);
  };

  const showPageLoader = (val: string) => {
    setMessage(val ? val : null);
    setIsPageLoaderVisible(true);
  };

  return (
    <PageLoaderContext.Provider
      value={{ message, isPageLoaderVisible, hidePageLoader, showPageLoader }}
    >
      <PageLoader isPageLoaderVisible={isPageLoaderVisible} message={message} />
      {children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => useContext(PageLoaderContext);
