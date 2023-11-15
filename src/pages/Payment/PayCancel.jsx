import React, { useEffect } from 'react';

const PayCancel = () => {
  useEffect(() => {
    window.close();
  }, []);
  return <div>결제취소</div>;
};

export default PayCancel;
