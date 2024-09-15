import { Header, MainSection, Navbar } from "../Containers";
import "./App.css";

function App() {
  return (
    <section>
      <Navbar className="px-xxl-5" />
      <Header className="px-xxl-5 mt-5" />
      <MainSection className="px-xxl-5 mt-1" />
    </section>
  )
}

export default App;
