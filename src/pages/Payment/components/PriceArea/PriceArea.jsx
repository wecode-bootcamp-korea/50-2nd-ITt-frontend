import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DetailsInfo from '../../../../components/DetailsInfo/DetailsInfo';
import AddPoints from '../AddPoints/AddPoints';
import Button from '../../../../components/Button/Button';
import './PriceArea.scss';

const PriceArea = ({
  remainingPoint,
  userId,
  addPoints,
  setAddPoints,
  amount,
  date,
  time,
  locationName,
  title,
}) => {
  const navigate = useNavigate();

  const PAYMENTLABEL = [
    { id: 1, type: '주문금액', content: amount },
    { id: 2, type: '결제방법', content: '포인트사용' },
    { id: 3, type: '보유포인트', content: remainingPoint },
  ];

  const ORDERLABEL = [
    { id: 1, type: '공연명', content: title },
    { id: 2, type: '관람일자', content: date },
    { id: 3, type: '관람시간', content: time },
    { id: 3, type: '위치', content: locationName },
  ];

  const handlePayment = () => {
    axios
      .post(
        '백엔드결제api주소',
        { amount, remainingPoint },
        {
          headers: {
            // Authorization: `token`,
            'Content-type': `application/json`,
          },
        },
      )
      .then(res => {
        if (res.data.message === 'success') {
          alert('결제 성공!');
          navigate('/mypage');
        } else {
          alert('결제 실패');
          return;
        }
      });
  };

  const isBuyAble = remainingPoint >= amount;

  return (
    <div className="priceArea">
      <div className="priceInfo">
        <div className="orderInfoArea">
          <DetailsInfo detailsLabel={ORDERLABEL} />
        </div>
        <DetailsInfo detailsLabel={PAYMENTLABEL} />
        {!isBuyAble && <p className="isOrder">포인트가 부족합니다.</p>}
        <div className="addPointsArea">
          <input
            type="number"
            value={addPoints}
            onChange={e => setAddPoints(e.target.value)}
            className="pointsInput"
            placeholder="충전할 포인트를 입력해주세요."
          />
          <AddPoints
            addPoints={addPoints}
            setAddPoints={setAddPoints}
            remainingPoint={remainingPoint}
            userId={userId}
          />
        </div>
      </div>
      <div className="totalPriceArea">
        <p className="label">총 결제금액</p>
        <span className="priceContent">
          <span className="totalPrice">{amount}</span>원
        </span>
        <Button onClick={handlePayment} disabled={!isBuyAble}>
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default PriceArea;
