import { useEffect, useState } from "react";
import "./ImageField.css";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";

const ImageField = (props: {
  tag: string,
  setImage: React.Dispatch<React.SetStateAction<File | null>>,
  required?: boolean
  className?: string
}) => {
  const { className, tag, required, setImage } = props;

  const [imageURL, setImageURL] = useState<string>("")

  // Revoke url to prevent memory leaks
  useEffect(() => {
    return () => {
      imageURL && URL.revokeObjectURL(imageURL);
    }
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const imageTypes = ["image/jpeg", "image/png", "image/webp"]
    const isImage = imageTypes.includes(file.type);
    if(isImage) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
      setImage(file);
    }
  };

  const handleImageDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setImage(null);
    setImageURL("");
  }

  return (
    <div className={`${className || ""} w-100`}>
      <div className="mb-2">
        <span className="fw-bold">{tag}</span>
        {required ? <small className="fw-bold ms-1">*</small> : null}
      </div>
      <label role="button" className="w-100 custom-file-input rouned-2 d-flex align-items-center justify-content-center">
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