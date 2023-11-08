import React from 'react';
import Button from '../../components/Button/Button';
import Ordersinfo from './components/Ordersinfo';
import './Payment.scss';

const Payment = () => {
  return (
    <div className="payment">
      <div className="paymentArea">
        <h1 className="paymentTitle">예매정보</h1>
        <Ordersinfo
          title="뮤지컬 고양이"
          imgUrl="/images/visual_01.png"
          time="150분"
          date="2023년 5월 5일 오후 2시"
          location="수원아트센터"
          seatNumber="R열 35번"
          totalPrice="70,000"
        />
        <div className="tossArea">toss API</div>
        <Button btnText="결제완료" />
      </div>
    </div>
  );
};

export default Payment;
