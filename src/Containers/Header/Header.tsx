import { useContext } from "react";
import { Button } from "../../Components";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import "./Header.css";
import { PageContext } from "../../Contexts/PageContext";
import { changePage } from "../../Utilities/functions";

const Header = (props: {
  className?: string
}) => {
  // Context provider
  const { setCurrentPage } = useContext(PageContext);

  const addListingHandler = () => changePage(setCurrentPage, "add-listing-page");
  const addAgentHandler = () => {}

  return ( 
    <header className={`${props.className} d-flex w-100 gap-5 justify-content-between align-items-start`}>
      <DropdownContainer className="flex-grow-0" />
      <div className="d-flex gap-3 flex-shrink-0">
        <Button onClick={addListingHandler} type="filled" text="ლისტინგის დამატება" />
        <Button onClick={addAgentHandler} type="bordered" text="აგენტის დამატება" />
      </div>
    </header>
  );
}
 
export default Header;