import "./RadioButton.css"

const RadioButton = (props: {
  label: string
  className?: string,
  onChange?: () => void,
  checked?: boolean
}) => {
  const { className, label, onChange, checked } = props;

  return (
    <label className={`${className || ""} d-inline-flex align-items-center`}>
      <input className="custom-radio-button p-3" onChange={onChange} checked={checked} type="radio" />
      <small className="ms-1">{label}</small>
    </label>
  );
}
 
export default RadioButton;