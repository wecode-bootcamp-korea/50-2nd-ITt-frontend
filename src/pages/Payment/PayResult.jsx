import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PayResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pgToken = searchParams.get('pg_token');
  const tid = localStorage.getItem('tid');
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    axios
      .post(
        'https://kapi.kakao.com/v1/payment/approve',
        {
          cid: 'TC0ONETIME',
          tid: tid,
          partner_order_id: 'partner_order_id',
          partner_user_id: 'partner_user_id',
          pg_token: pgToken,
        },
        {
          headers: {
            Authorization: `KakaoAK 113d9cc469ff0446db8b9446101f9f7c`,
            'Content-type': `application/x-www-form-urlencoded;charset=utf-8`,
          },
        },
      )
      .then(res => setPaymentData(res.data));
  }, []);
  return (
    <div>
      <p>충전완료페이지</p>
    </div>
  );
};

export default PayResult;
