import "./TextareaField.css";
import { FaCheck } from "react-icons/fa";

const TextareaField = (props: {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  tag: string,
  className?: string,
  required?: boolean,
  validations?: { isValid: boolean | "init", text: string } []
}) => {
  const { value, onChange, tag, required, validations, className } = props;

  const failedValidation = validations?.some((validation) => !validation.isValid);

  return (
    <div className={`${className || ""} custom-textarea-input w-100 d-flex flex-column gap-2 mt-3`}>
      <div>
        <span className="fw-bold">{tag}</span>
        {required ? <small className="fw-bold ms-1">*</small> : null}
      </div>
      <textarea className={`${failedValidation ? "border-error" : ""} w-100 rounded-2 p-2`} value={value} onChange={onChange} />
      {
        validations && validations.map((validation, index) => {
          return (  
            <div key={index} className={`d-flex align-item-scenter gap-2 ${validation.isValid === "init" ? "" : validation.isValid ? "text-success" : "text-error"}`}>
              <FaCheck />
              <span className="text-subtext">{validation.text}</span>
            </div>
          )
        })
      }
    </div>
  );
}
 
export default TextareaField;