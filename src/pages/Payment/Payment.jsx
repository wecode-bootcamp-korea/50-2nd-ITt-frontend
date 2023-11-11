import React, { useEffect, useState } from 'react';
import Ordersinfo from './components/Ordersinfo';
import './Payment.scss';
import PaymentWidget from './components/PaymentWidget/PaymentWidget';
import axios from 'axios';
import { GET_ORDER_API } from '../../config';

const Payment = () => {
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    axios
      .get(GET_ORDER_API, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
      .then(res => {
        setOrderData(res.data.data[0]);
      });
  }, []);

  return (
    <div className="payment">
      <div className="paymentArea">
        <h2 className="paymentTitle">예매정보</h2>
        <Ordersinfo {...orderData} />
        <div className="paymentWidgetArea">
          <PaymentWidget {...orderData} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
