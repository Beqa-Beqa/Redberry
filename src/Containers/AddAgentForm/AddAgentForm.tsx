import { useState } from "react";
import { Button, ImageField, InputField, Loading } from "../../Components";
import "./AddAgentForm.css";
import { makeRequest } from "../../Utilities/functions";

const AddAgentForm = (props: {
  hideMenu: () => void,
  refetchAgents?: () => void,
}) => {
  const { hideMenu, refetchAgents } = props;

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Value holder states
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("5");
  const [image, setImage] = useState<File | null>(null);

  // Error states
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isNumberValid, setIsNumberValid] = useState<boolean | null>(null);

  // Submit button state
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // Regular expressions
  const atLeast2SymbolRegex = /^.{2,}$/;
  const digitsRegex = /^[0-9]*$/;
  const emailRegex = /^[\w-\.]+@redberry.ge\s*$/g;

  // Change handlers
  const handleNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if(atLeast2SymbolRegex.test(val)) setIsNameValid(true);
    else setIsNameValid(false);

    setName(val);
    if(isButtonDisabled) setIsButtonDisabled(false);
  }

  const handleLastNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if(atLeast2SymbolRegex.test(val)) setIsLastNameValid(true);
    else setIsLastNameValid(false);

    setLastName(val);
    if(isButtonDisabled) setIsButtonDisabled(false);
  }

  const handleEmailFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if(emailRegex.test(val)) setIsEmailValid(true);
    else setIsEmailValid(false);

    setEmail(val);
    if(isButtonDisabled) setIsButtonDisabled(false);
  }

  const handleNumberFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if(parseInt(val) && digitsRegex.test(val)) setIsNumberValid(true);
    else setIsNumberValid(false);

    if( val[0] === "5") setNumber(val);
    else setNumber("5");

    if(isButtonDisabled) setIsButtonDisabled(false);
  }

  // Button click handlers
  // Cancel
  const handleCancel = () => hideMenu();
  // Submit
  const handleSubmit = async () => {
    if(isNameValid && isLastNameValid && isEmailValid && isNumberValid && image) {
      // Start loading
      setIsLoading(true);

      try {
        const body: AgentPostRequestBody = {
          name: name.trim(),
          phone: number.trim(),
          email: email.trim(),
          surname: lastName.trim(),
          avatar: image
        }
  
        const result = await makeRequest("POST", "agents", true, "multipart/form-data", body);
        if(result && refetchAgents) refetchAgents();

        hideMenu();

      } catch (err) {
        console.log(err);
      }

      // End loading
      setIsLoading(false);
    } else {
      setIsButtonDisabled(true);
    }
  }

  return (
    <section className="add-agent-modal-background position-fixed start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center">
      <div onClick={() => {}} className="add-agent-modal position-relative p-5 rounded-2 w-100">
        <h2 className="text-dark fs-4 text-center">აგენტის დამატება</h2>

        {/* Filters */}

        <div className="mt-5 d-flex gap-4 w-100">

        {/* Name */}

          <InputField
            value={name}
            setValue={setName}
            onChange={handleNameFieldChange}
            required
            className="w-100"
            type="text"
            tag="სახელი"
            validations={[
              {
                isValid: isNameValid === null ? "init" : isNameValid,
                text: "მინიმუმ ორი სიმბოლო"
              }
            ]}
          />

        {/* Last name */}

          <InputField
            value={lastName}
            setValue={setLastName}
            onChange={handleLastNameFieldChange}
            className="w-100"
            type="text"
            tag="გვარი"
            validations={[
              {
                isValid: isLastNameValid === null ? "init" : isLastNameValid,
                text: "მინიმუმ ორი სიმბოლო"
              }
            ]}
          />
        </div>

        <div className="mt-2 d-flex gap-4 w-100">

        {/* Email */}

          <InputField
            value={email}
            setValue={setEmail}
            onChange={handleEmailFieldChange}
            className="w-100"
            required
            type="text"
            tag="ელ-ფოსტა"
            validations={[
              {
                isValid: isEmailValid === null ? "init" : isEmailValid,
                text: "გამოიყენეთ @redberry.ge ფოსტა"
              }
            ]}
          />

        {/* Phone number */}

          <InputField
            value={number}
            setValue={setNumber}
            onChange={handleNumberFieldChange}
            className="w-100"
            type="text"
            tag="ტელეფონის ნომერი"
            validations={[
              {
                isValid: isNumberValid === null ? "init" : isNumberValid,
                text: "მხოლოდ რიცხვები"
              }
            ]}
          />
        </div>

        {/* Image */}

        <ImageField
          tag="ატვირთეთ ფოტო"
          required
          setImage={setImage}
          className="mt-4"
        />

        {/* Buttons */}

        <div className="d-flex align-items-cente justify-content-end mt-5 gap-2">
          <Button type="bordered" text="გაუქმება" noIcon onClick={handleCancel} />
          <Button disabled={isButtonDisabled} type="filled" text="დაამატე აგენტი" noIcon onClick={handleSubmit} />
        </div>
      </div>

      {/* Loader if loading state is true */}
      
      { isLoading ?
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <Loading className="rounded-2 agent-save-loading" /> 
        </div>
      : 
        null 
      }
    </section>
  );
}
 
export default AddAgentForm;