import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Fail = () => {
  const [searchParams] = useSearchParams();

  return (
    <div>
      <h1>결제실패페이지</h1>
      <div>{`message = ${searchParams.get('message')}`}</div>
    </div>
  );
};

export default Fail;
