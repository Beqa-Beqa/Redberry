import { useContext } from "react";
import { AddListingForm, Header, MainSection, Navbar } from "../Containers";
import "./App.css";
import { PageContext } from "../Contexts/PageContext";

function App() {
  const { currentPage } = useContext(PageContext);

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
          </>
      }
    </section>
  )
}

export default App;
