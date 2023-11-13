import React from 'react';
import ProfileImage from './components/ProfileImage';
import ProfileEdit from './components/ProfileEdit';
import OrdersInfo from '../Payment/components/OrdersInfo';
import UserQr from './components/UserQr';
import Button from '../../components/Button/Button';
import './MyPage.scss';

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
        <h2 className="title">프로필변경</h2>
        <div className="myPageArea">
          <ProfileEdit {...userInfo} />
        </div>
        <h2 className="title">결제내역</h2>
        <div className="userOrders">
          <OrdersInfo {...orderInfo} />
          <div className="qrArea">
            <UserQr />
            <UserQr />
          </div>
          <div className="cancelBtn">
            <Button width="200px">결제취소</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;