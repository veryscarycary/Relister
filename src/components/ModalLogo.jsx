import React from 'react';

const ModalLogo = ({ logoClass, src, loading, error }) => {
  return (
    <div>
      <div className="logo-container layout-row layout-align-center-center">
        <img
          src={src}
          alt={logoClass}
          className={`logo ${logoClass} ${loading ? 'animate' : ''}`}
        />
      </div>
      <div className="layout-row layout-align-center-center">
        {loading && <div className="mt-24 spinner"></div>}
        {!loading && (
          <div
            className={`mt-24 fa fa-${error ? 'close red' : 'check green'}`}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ModalLogo;