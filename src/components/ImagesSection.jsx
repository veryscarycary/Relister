import React from 'react';

const ImagesSection = ({ imageDataUris }) => {
  return (
    <div className="layout-row flex-wrap">
      {imageDataUris.map((uri) => (
        <img className="uploaded-img mr-8 mb-8" src={uri} />
      ))}
    </div>
  );
};

export default ImagesSection;