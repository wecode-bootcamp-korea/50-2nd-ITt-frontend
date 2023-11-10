import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Success.scss';
import axios from 'axios';
import { GET_MOCK_API } from '../../config.js';

const Success = () => {
  const [searchParams] = useSearchParams();
  // const clientKey = process.env.toss_payments_client_key;
  const secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6'; // 테스트키
  const encryptedSecretKey = `Basic ${btoa(secretKey + ':')}`;

  const body = {
    orderId: searchParams.get('orderId'),
    paymentKey: searchParams.get('paymentKey'),
    amount: searchParams.get('amount'),
  };

  useEffect(() => {
    axios
      .post(GET_MOCK_API, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: encryptedSecretKey,
        },
      })
      .then(res => {
        const resMsg = res.data.message;
        console.log(resMsg);
      });
  }, []);

  return (
    <div className="success">
      <h1>결제성공페이지</h1>
      <div>
        (post요청할때) body : PAYMENT_KEY, ORDER_ID, amount header : 시크릿키
      </div>
      <p>{`paymentKey = ${searchParams.get('paymentKey')}`}</p>
      <p>{`orderId = ${searchParams.get('orderId')}`}</p>
      <p>{`amount = ${searchParams.get('amount')}`}</p>

      <div className="linkArea">
        <Link to="/mypage">마이페이지</Link>
        <Link to="/">메인으로</Link>
      </div>
    </div>
  );
};

export default Success;
