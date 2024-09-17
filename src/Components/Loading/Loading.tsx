import "./Loading.css";

const Loading = (props: {
  style?: React.CSSProperties,
  className?: string
}) => {
  const { className, style } = props;

  return (
    <div style={style} className={`${className || ""} custom-loader d-flex justify-content-center align-items-center`}>
      <div className="loader" />
    </div>
  );
}
 
export default Loading;