import { useContext } from "react";
import { AddAgentForm, AddListingForm, Header, MainSection, Navbar } from "../Containers";
import "./App.css";
import { PageContext } from "../Contexts/PageContext";

function App() {
  const { currentPage, isToggledAddAgent, setIsToggledAddAgent } = useContext(PageContext);

  return (
    <section>
      <Navbar className="px-xxl-5" />
      {
        currentPage === "add-listing-page" ?
          <AddListingForm />
        :
          <>
            <Header className="px-xxl-5 mt-5" />
            <MainSection className="px-xxl-5 mt-1" />
            {
              isToggledAddAgent ?
                <AddAgentForm hideMenu={() => setIsToggledAddAgent(false)} />
              : 
                null
            }
          </>
      }
    </section>
  )
}

export default App;
