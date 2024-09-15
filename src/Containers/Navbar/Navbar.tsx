import { useContext } from "react";
import { LogoIcon } from "../../Assets";
import "./Navbar.css";
import { PageContext } from "../../Contexts/PageContext";
import { changePage } from "../../Utilities/functions";

const Navbar = (props: {
  className?: string
}) => {
  const { setCurrentPage } = useContext(PageContext);
  const handleReturnToHomePage = () => changePage(setCurrentPage, "");

  return (
    <nav className={`rb-navbar d-flex align-items-center ${props.className}`}>
      <img role="button" onClick={handleReturnToHomePage} src={LogoIcon} alt="logo icon" /> 
    </nav>
  );
}
 
export default Navbar;