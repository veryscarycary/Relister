import React from 'react';

import { useRef } from 'react';

const FileUploadField = ({
  id,
  label,
  style,
  className,
  imagePaths,
  setImagePaths,
  imageDataUris,
  setImageDataUris,
}) => {
  const handleUploadFiles = (e) => {
    const chosenFilePaths = Array.prototype.map.call(
      e.target.files,
      (file) => file.path
    );
    Array.prototype.forEach.call(e.target.files, (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageDataUris([...imageDataUris, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
    const newPaths = chosenFilePaths.filter(
      (chosenPath) => !imagePaths.includes(chosenPath)
    );
    const totalPaths = [...imagePaths, ...newPaths];
    setImagePaths(totalPaths);
  };
  const resetFiles = () => {
    setImagePaths([]);
    setImageDataUris([]);
    ref.current.value = '';
  };
  const ref = useRef(null);

  return (
    <div className={`layout-column ${className}`} style={style}>
      <label className="mb-4" htmlFor={id}>
        {label}
      </label>
      <div>
        <input
          ref={ref}
          id={id}
          type="file"
          multiple
          accept="image/*"
          onChange={handleUploadFiles}
        />
        <button onClick={resetFiles}>Clear</button>
      </div>
    </div>
  );
};

export default FileUploadField;