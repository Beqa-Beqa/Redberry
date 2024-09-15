import { useState } from "react";
import { imageToBase64 } from "../../../Utilities/functions";
import "./ImageField.css";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

const ImageField = (props: {
  tag: string,
  setImage: React.Dispatch<React.SetStateAction<string>>,
  required?: boolean
  className?: string
}) => {
  const { className, tag, required, setImage } = props;

  const [imageURL, setImageURL] = useState<string>("")

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];
    const url = URL.createObjectURL(image);
    setImageURL(url);

    try {
      const imageToString = (await imageToBase64(image) as string);
      if(imageToString) setImage(imageToString);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setImage("");
    setImageURL("");
  }

  return (
    <div className={`${className || ""} w-100`}>
      <div>
        <span className="fw-bold">{tag}</span>
        {required ? <small className="fw-bold ms-1">*</small> : null}
      </div>
      <label role="button" className={`${className || ""} w-100 custom-file-input rouned-2 d-flex align-items-center justify-content-center`}>
          { 
            imageURL ? 
              <div className="position-relative" style={{ height: 82 }}>
                <img className="w-100 h-100 rounded-2" src={imageURL} alt="uploaded" />
                <div 
                  style={{bottom: -9, right: -4, zIndex: 20}}
                  className="position-absolute delete-icon-container p-1 rounded-circle d-flex align-items-center border-bold"
                  onClick={(e) => handleImageDelete(e)}
                >
                  <FaRegTrashAlt />
                </div>
              </div>
            : 
              <div style={{width: 24, height: 24}} className="border-bold p-1 rounded-circle d-flex align-items-center justify-content-center">
                <FaPlus /> 
              </div>
          }
        <input onChange={handleImageChange} type="file" hidden />
      </label>
    </div>
  );
}
 
export default ImageField;