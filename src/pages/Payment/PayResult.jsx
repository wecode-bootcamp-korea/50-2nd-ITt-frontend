import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PayResult = () => {
  const location = useLocation();
  const queryString = location.search;

  useEffect(() => {
    window.opener.location.href = `http://localhost:3000/payment${queryString}`;
    window.close();
  }, []);

  return (
    <div>
      <p>결제완료페이지</p>
    </div>
  );
};

export default PayResult;
