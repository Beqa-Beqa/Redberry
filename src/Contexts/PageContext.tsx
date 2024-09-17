import { createContext, useState } from "react";

export const PageContext = createContext<PageContext>({ 
  currentPage: "",
  setCurrentPage: () => {},
  isToggledAddAgent: false,
  setIsToggledAddAgent: () => {}
});

const PageContextProvider = (props: { children: React.ReactNode }) => {
  const cachedPage = sessionStorage.getItem("currentPage") || "";
  
  // Page context
  const [currentPage, setCurrentPage] = useState<Page>(cachedPage as Page);
  // Agent add modal context
  const [isToggledAddAgent, setIsToggledAddAgent] = useState<boolean>(false);

  return <PageContext.Provider value={{ currentPage, setCurrentPage, isToggledAddAgent, setIsToggledAddAgent }}>
    {props.children}
  </PageContext.Provider>
}

export default PageContextProvider;