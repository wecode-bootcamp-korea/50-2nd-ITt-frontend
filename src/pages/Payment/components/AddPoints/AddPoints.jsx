import React from 'react';
import axios from 'axios';
import Button from '../../../../components/Button/Button';
import './AddPoints.scss';

const AddPoints = ({ addPoints, userId }) => {
  const admin = process.env.REACT_APP_ADMIN_KEY;

  const handleAddPoints = () => {
    if (!addPoints) {
      alert('충전할 포인트를 입력해 주세요!');
      return;
    }
    axios
      .post(
        'https://kapi.kakao.com/v1/payment/ready',
        {
          cid: 'TC0ONETIME',
          partner_order_id: 'partner_order_id',
          partner_user_id: userId,
          item_name: '포인트충전',
          quantity: 1,
          total_amount: addPoints,
          tax_free_amount: 0,
          approval_url: 'http://localhost:3000/pay-result',
          cancel_url: 'http://localhost:3000/pay-cancel',
          fail_url: 'http://localhost:3000/pay-cancel',
        },
        {
          headers: {
            Authorization: `KakaoAK ${admin}`,
            'Content-type': `application/x-www-form-urlencoded;charset=utf-8`,
          },
        },
      )
      .then(res => {
        localStorage.setItem('tid', res.data.tid);
        window.open(
          res.data.next_redirect_pc_url,
          'kakaoPay',
          'width=400,height=700,top=500,left=300',
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="addPoints">
      <Button width="150px" height="40px" onClick={handleAddPoints}>
        충전하기
        <img
          src="/images/payment_icon_yellow_small.png"
          alt="카카오페이"
          className="payIcon"
        />
      </Button>
    </div>
  );
};

export default AddPoints;
