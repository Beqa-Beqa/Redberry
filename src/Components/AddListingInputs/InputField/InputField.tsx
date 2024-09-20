import { useContext } from "react";
import "./InputField.css";
import { FaCheck } from "react-icons/fa";
import { PageContext } from "../../../Contexts/PageContext";

const InputField = (props: {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSelectChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  type: string,
  className?: string,
  tag: string,
  required?: boolean,
  validations?: { isValid: boolean | "init", text: string } [],
  values?: Region[] | City[] | Agent[]
}) => {
  const {value, setValue, onChange, onSelectChange, type, className, tag, required, validations, values } = props;

  const { setIsToggledAddAgent } = useContext(PageContext);

  const handleListingSelectFieldValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => setValue(e.target.value);

  const failsValidation = validations?.some((validation) => !validation.isValid);

  const handleAddAgentClick = () => setIsToggledAddAgent(true);

  return (
    <div className={`${className || ""} mt-3 d-flex flex-column align-items-start gap-2`}>
      <div className="w-100 fw-bold">
        <span>{tag}</span>
        {required ? <span className="ms-1">*</span> : ""}
      </div>
      { 
        type === "select" ?
          <select 
            onChange={(e) => {
              handleListingSelectFieldValueChange(e);
              if(onSelectChange) onSelectChange(e);
            }}
            value={value ? value : tag} 
            className={`${failsValidation ? "border-error" : ""} custom-input-field rounded-2 w-100 px-2 bg-transparent`}
          >
            <option hidden disabled>{tag}</option>
            { tag === "აგენტი" ? <option onClick={handleAddAgentClick}>დაამატე აგენტი</option> : null }
            {
              values ?
                values.map((value) => {
                  return (
                    <option key={value.id} value={value.id}>
                      {/* @ts-expect-error value.surname isn't accessible in all values provided by parent component */}
                      {value.name} {Object.prototype.hasOwnProperty.call(value, "surname") ? value.surname : ""}
                    </option>
                  );
                })
              : null
            }
          </select>
        :
          <input 
            onChange={(e) => onChange && onChange(e)} 
            value={value} 
            className={`${failsValidation ? "border-error" : ""} custom-input-field rounded-2 w-100 px-2`}
            type="text" 
          />
      }
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
 
export default InputField;