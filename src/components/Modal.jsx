import React from 'react';
import ModalLogo from './ModalLogo.jsx';
import ErrorOutput from './ErrorOutput.jsx';

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
        tabIndex="-1"
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
              <ModalLogo
                logoClass="fb-logo"
                src="https://www.transparentpng.com/thumb/facebook-logo/facebook-icon-transparent-background-20.png"
                loading={loading}
                error={errorFB}
              />
            )}
          </div>
          <div className="layout-column layout-align-center-center">
            {(selectedApp === 'both' || selectedApp === 'cl') && (
              <ModalLogo
                logoClass="cl-logo"
                src="https://play-lh.googleusercontent.com/L2Vc0eKN2ZOcXDiLItPT2orUACTjfcBNNb9X5nY_EuhUlohYXU5adX8GRTjpPiwt2Mnh"
                loading={loading}
                error={errorCL}
              />
            )}
          </div>
        </div>
        {(errorFB || errorCL) && (
          <div className="mt-24 mb-24">
            {errorFB && <ErrorOutput errorMessage={errorFB} />}
            {errorCL && <ErrorOutput errorMessage={errorCL} />}
          </div>
        )}
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
