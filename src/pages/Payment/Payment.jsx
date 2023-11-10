import React from 'react';
import Button from '../../components/Button/Button';
import Ordersinfo from './components/Ordersinfo';
import './Payment.scss';
import PaymentWidget from './components/PaymentWidget/PaymentWidget';

const Payment = () => {
  const orderInfo = {
    title: '뮤지컬 고양이',
    imgUrl: '/images/visual_01.png',
    time: '150분',
    date: '2023년 5월 5일 오후 2시',
    location: '수원아트센터',
    seatNumber: 'R열 35번',
    totalPrice: 70000,
  };
  return (
    <div className="payment">
      <div className="paymentArea">
        <h2 className="paymentTitle">예매정보</h2>
        <Ordersinfo {...orderInfo} />
        <div className="paymentWidgetArea">
          <PaymentWidget {...orderInfo} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
