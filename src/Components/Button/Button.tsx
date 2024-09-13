import "./Button.css";
import { FaPlus } from "react-icons/fa";

const Button = (props: {
  type: "filled" | "bordered",
  text: string
}) => {
  const { type, text } = props;

  return (
    <button 
      className={`${type === "filled" ? "btn-primary border-0" : "btn-primary-outline"} rounded py-2 px-3`}
    > <FaPlus /> {text}
    </button>
  );
}
 
export default Button;