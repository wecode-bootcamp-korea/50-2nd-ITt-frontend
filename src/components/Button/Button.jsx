import React from 'react';
import './Button.scss';

const Button = props => {
  const { width, height, outline, disabled, onClick, children } = props;
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
