import { Button } from "../../Components";
import DropdownContainer from "../DropdownContainer/DropdownContainer";
import "./Header.css";

const Header = (props: {
  className?: string
}) => {
  return ( 
    <header className={`${props.className} d-flex w-100 justify-content-between`}>
      <DropdownContainer />
      <div className="d-flex gap-3">
        <Button type="filled" text="ლისტინგის დამატება" />
        <Button type="bordered" text="აგენტის დამატება" />
      </div>
    </header>
  );
}
 
export default Header;