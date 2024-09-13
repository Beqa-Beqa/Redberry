import { LogoIcon } from "../../Assets";
import "./Navbar.css";

const Navbar = (props: {
  className?: string
}) => {
  return (
    <nav className={`rb-navbar d-flex align-items-center ${props.className}`}>
      <img src={LogoIcon} alt="logo icon" /> 
    </nav>
  );
}
 
export default Navbar;