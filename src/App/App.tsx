import { useContext } from "react";
import { AddAgentForm, AddListingForm, Header, HousePage, MainSection, Navbar } from "../Containers";
import "./App.css";
import { PageContext } from "../Contexts/PageContext";
import { RealEstateContext } from "../Contexts/RealEstateContext";

function App() {
  const { currentPage, isToggledAddAgent, setIsToggledAddAgent } = useContext(PageContext);
  const { currentProperty } = useContext(RealEstateContext);

  return (
    <>
      <Navbar className="px-xxl-5" />
      <section className="px-xxl-5">
        {
          currentPage === "add-listing-page" ?
            <AddListingForm />

          : currentPage === "house" ?
            <HousePage
              className="px-xxl-5 mt-5"
              data={currentProperty!} 
            />
          :
            <>
              <Header className="px-xxl-5 mt-5" />
              <MainSection className="px-xxl-5 mt-1" />
            </>
        }
        {
          isToggledAddAgent ?
            <AddAgentForm hideMenu={() => setIsToggledAddAgent(false)} />
          : 
            null
        }
      </section>
    </>
  )
}

export default App;
