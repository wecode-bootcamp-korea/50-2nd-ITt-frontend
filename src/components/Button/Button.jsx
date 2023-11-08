import React from 'react';
import './Button.scss';

const Button = props => {
  const { btnLine, btnText, disabled, onClick } = props;
  const _btnLine = btnLine ? 'btnLine' : '';
  return (
    <button
      type="button"
      className={`btn ${_btnLine}`}
      disabled={disabled}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
