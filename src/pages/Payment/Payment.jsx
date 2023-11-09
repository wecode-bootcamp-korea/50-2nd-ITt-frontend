import React from 'react';
import Button from '../../components/Button/Button';
import OrdersInfo from './components/OrdersInfo';
import './Payment.scss';

const Payment = () => {
  const orderInfo = {
    title: '뮤지컬 고양이',
    imgUrl: '/images/visual_01.png',
    time: '150분',
    date: '2023년 5월 5일 오후 2시',
    location: '수원아트센터',
    seatNumber: 'R열 35번',
    totalPrice: '70,000',
  };
  return (
    <div className="payment">
      <div className="paymentArea">
        <h2 className="paymentTitle">예매정보</h2>
        <OrdersInfo {...orderInfo} />
        <div className="tossArea">toss API</div>
        <Button>결제완료</Button>
      </div>
    </div>
  );
};

export default Payment;
