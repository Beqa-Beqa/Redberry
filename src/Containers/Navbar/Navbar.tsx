import { useContext } from "react";
import { LogoIcon } from "../../Assets";
import "./Navbar.css";
import { PageContext } from "../../Contexts/PageContext";
import { changePage } from "../../Utilities/functions";
import { RealEstateContext } from "../../Contexts/RealEstateContext";

const Navbar = (props: {
  className?: string
}) => {
  const { setCurrentPage } = useContext(PageContext);
  const { triggerPropertyFetch } = useContext(RealEstateContext);

  const handleReturnToHomePage = () => {
    changePage(setCurrentPage, "");
    triggerPropertyFetch();
  }

  return (
    <nav className={`rb-navbar d-flex align-items-center ${props.className}`}>
      <img className="ps-xxl-5" role="button" onClick={handleReturnToHomePage} src={LogoIcon} alt="logo icon" />
    </nav>
  );
}
 
export default Navbar;