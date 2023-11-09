import React from 'react';
import './Button.scss';

const Button = props => {
<<<<<<< HEAD
  const { width, height, outline, btnText, disabled, onClick } = props;
=======
  const { width, height, outline, btnText, disabled, onClick } = props;
>>>>>>> main
  const _outline = outline ? 'btnLine' : '';

  return (
    <button
      type="button"
      className={`btn ${_outline}`}
      disabled={disabled}
      style={{ width, height }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
