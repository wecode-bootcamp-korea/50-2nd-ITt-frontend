import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_ORDER_API } from '../../config';
import OrdersInfo from './components/OrdersInfo/OrdersInfo';
import './Payment.scss';
import PriceArea from './components/PriceArea/PriceArea';

const Payment = () => {
  const [orderData, setOrderData] = useState({});
  const [userData, setUserData] = useState({});

  // 백엔드 결제정보 api
  // useEffect(() => {
  //   axios
  //     .get(GET_ORDER_API, {
  //       headers: { 'Content-Type': 'application/json;charset=utf-8' },
  //     })
  //     .then(res => {
  //       setOrderData(res.data.data[0]);
  //     });
  // }, []);

  // 결제정보 목데이터
  useEffect(() => {
    axios
      .get(`/data/paymentData.json`, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
      .then(res => {
        setOrderData(res.data.data.orders);
        setUserData(res.data.data.users);
      });
  }, []);

  return (
    <div className="payment">
      <h2 className="paymentTitle">결제하기</h2>
      <OrdersInfo {...orderData} />
      <div className="paymentArea">
        <PriceArea {...userData} amount={orderData.amount} />
      </div>
    </div>
  );
};

export default Payment;
