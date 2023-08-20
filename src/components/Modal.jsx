import React from 'react';

const Modal = ({
  selectedTab,
  selectedApp,
  setIsModalOpen,
  loading,
  errorCL,
  errorFB,
  setErrorCL,
  setErrorFB,
}) => {
  const closeModal = () => {
    setErrorFB(false);
    setErrorCL(false);
    setIsModalOpen(false);
  };
  console.log(errorCL);

  return (
    <div className="overlay">
      <div
        className={`modal layout-column layout-align-space-between ${
          loading ? '' : 'can-close'
        }`}
        tabindex="-1"
        role="dialog"
      >
        {!loading && (
          <button
            className="modal-close fa fa-close"
            onClick={closeModal}
          ></button>
        )}
        {loading ? (
          <h2 className="mt-32 mb-32 text-align-center loading">
            Hang tight while we {selectedTab} your post
            {selectedTab === 'create' ? '' : 's'}
          </h2>
        ) : (
          <h2 className="mt-32 mb-32 text-align-center">
            {errorCL || errorFB
              ? `Encountered ${
                  errorCL && errorFB ? 'some errors' : 'an error'
                }. Please check the log output below:`
              : ''}
          </h2>
        )}
        <div className="layout-row layout-align-center-center">
          <div className="layout-column layout-align-center-center">
            {(selectedApp === 'both' || selectedApp === 'fbm') && (
              <div>
                <div className="logo-container layout-row layout-align-center-center">
                  <img
                    src="https://www.transparentpng.com/thumb/facebook-logo/facebook-icon-transparent-background-20.png"
                    alt="facebook icon"
                    className={`logo fb-logo ${loading ? 'animate' : ''}`}
                  />
                </div>
                <div className={`mt-24 ${loading ? 'spinner' : ''}`}>
                  {!loading && (
                    <span
                      className={`fa fa-${
                        errorFB ? 'close red' : 'check green'
                      }`}
                    ></span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="layout-column layout-align-center-center">
            {(selectedApp === 'both' || selectedApp === 'cl') && (
              <div>
                <div className="logo-container layout-row layout-align-center-center">
                  <img
                    src="https://play-lh.googleusercontent.com/L2Vc0eKN2ZOcXDiLItPT2orUACTjfcBNNb9X5nY_EuhUlohYXU5adX8GRTjpPiwt2Mnh"
                    alt="craigslist logo"
                    className={`logo cl-logo ${loading ? 'animate' : ''}`}
                  />
                </div>
                <div className={`mt-24 ${loading ? 'spinner' : ''}`}>
                  {!loading && (
                    <span
                      className={`fa fa-${
                        errorCL ? 'close red' : 'check green'
                      }`}
                    ></span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-12 mr-12 layout-row layout-align-end-center">
          {!loading && (
            <button className="button-primary" onClick={closeModal}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
