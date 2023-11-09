import React from 'react';
import './MyPage.scss';
import ProfileEdit from './components/ProfileEdit';
import ProfileImage from './components/ProfileImage';
import OrdersInfo from '../Payment/components/OrdersInfo';
import UserQr from './components/UserQr';
import Button from '../../components/Button/Button';

const MyPage = () => {
  const userInfo = {
    userId: 1,
    name: '김코드',
    src: '/images/visual_01.png',
    alt: '유저프로필이미지',
  };

  const orderInfo = {
    orderId: 1,
    title: '뮤지컬 고양이',
    imgUrl: '/images/visual_01.png',
    time: '150분',
    date: '2023년 5월 5일 오후 2시',
    location: '수원아트센터',
    seatNumber: 'R열 35번',
    totalPrice: '70,000',
  };

  return (
    <div className="myPage">
      <div className="menuArea">
        <div className="userArea">
          <ProfileImage src={userInfo.src} alt={userInfo.alt} />
          <p>{userInfo.name}</p>
        </div>
      </div>
      <div className="userPage">
        <div className="myPageArea">
          <ProfileEdit {...userInfo} />
        </div>
        <div className="userOrders">
          <OrdersInfo {...orderInfo} />
          <div className="qrArea">
            <UserQr />
            <UserQr />
          </div>
          <div className="cancelBtn">
            <Button>결제취소</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
