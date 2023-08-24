import React from 'react';

const ErrorOutput = ({ errorMessage }) => {
  return (
    <div className="error-output">
      {errorMessage}
    </div>
  );
};

export default ErrorOutput;