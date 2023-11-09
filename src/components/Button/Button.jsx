import React from 'react';
import './Button.scss';

const Button = props => {
  const { width, height, outline, btnText, disabled, onClick } = props;
  const _outline = outline ? 'btnLine' : '';

  return (
    <button
      type="button"
      className={`btn ${_outline}`}
      disabled={disabled}
      style={{ width, height }}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
