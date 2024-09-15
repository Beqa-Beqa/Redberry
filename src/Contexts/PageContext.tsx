import { createContext, useState } from "react";

export const PageContext = createContext<PageContext>({ 
  currentPage: "",
  setCurrentPage: () => {}
});

const PageContextProvider = (props: { children: React.ReactNode }) => {
  const cachedPage = sessionStorage.getItem("currentPage") || "";
  
  const [currentPage, setCurrentPage] = useState<Page>(cachedPage as Page);

  return <PageContext.Provider value={{ currentPage, setCurrentPage }}>
    {props.children}
  </PageContext.Provider>
}

export default PageContextProvider;