import React from 'react';

const Modal = ({ selectedTab, selectedApp }) => {

  return (
    <div className="overlay">
      <div
        className="modal layout-column layout-align-center-center"
        tabindex="-1"
        role="dialog"
      >
        <h2 className="mb-32 text-align-center loading">
          Hang tight while we {selectedTab} your post
          {selectedTab === 'create' ? '' : 's'}
        </h2>
        <div className="layout-row layout-align-center-center">
          {(selectedApp === 'both' || selectedApp === 'fbm') && (
            <img
              src="https://www.transparentpng.com/thumb/facebook-logo/facebook-icon-transparent-background-20.png"
              alt="facebook icon"
              className="logo fb-logo"
            />
          )}
          {(selectedApp === 'both' || selectedApp === 'cl') && (
            <img
              src="https://play-lh.googleusercontent.com/L2Vc0eKN2ZOcXDiLItPT2orUACTjfcBNNb9X5nY_EuhUlohYXU5adX8GRTjpPiwt2Mnh"
              alt="craigslist logo"
              className="logo cl-logo"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
