import { Button } from "../../Components";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import "./Header.css";

const Header = (props: {
  className?: string
}) => {
  return ( 
    <header className={`${props.className} d-flex w-100 gap-5 justify-content-between align-items-start`}>
      <DropdownContainer className="flex-grow-0" />
      <div className="d-flex gap-3 flex-shrink-0">
        <Button type="filled" text="ლისტინგის დამატება" />
        <Button type="bordered" text="აგენტის დამატება" />
      </div>
    </header>
  );
}
 
export default Header;