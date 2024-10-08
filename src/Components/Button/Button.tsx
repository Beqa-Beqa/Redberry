import "./Button.css";
import { FaPlus } from "react-icons/fa";

const Button = (props: {
  type: "filled" | "bordered" | "secondary" | "",
  text: string,
  noIcon?: boolean,
  disabled?: boolean
  onClick?: () => void
}) => {
  const { type, text, onClick, noIcon, disabled} = props;

  return (
    <button
      role={`${disabled ? "" : "button"}`}
      className={`${type === "filled" ? "btn-primary border-0" : type === "bordered" ? "btn-primary-outline" : "btn-secondary"} rounded py-2 px-3`}
      onClick={() => !disabled && onClick && onClick()}
      disabled={disabled}
    > { noIcon ? null : <FaPlus /> } {text}
    </button>
  );
}
 
export default Button;