import React, { useEffect, useState } from 'react';
import ProfileImage from './components/ProfileImage';
import ProfileEdit from './components/ProfileEdit';
import OrdersInfo from '../Payment/components/OrdersInfo';
import UserQr from './components/UserQr';
import Button from '../../components/Button/Button';
import './MyPage.scss';
import { EDIT_USER_API, GET_USER_API } from '../../config';
import axios from 'axios';

const MyPage = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(GET_USER_API, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
      .then(res => {
        setUserData(res.data.message);
      });
  }, []);

  const { profileImage, userName } = userData;

  // const mockData = {
  //   userName: '테스트이름',
  //   profileImage:
  //     'https://itcatbucket.s3.ap-northeast-2.amazonaws.com/images/1699592531697_2.jpg',
  //   performanceTitle: '어벤져스',
  //   ticketImage: 'image_url_here',
  //   eventDate: '2023-12-24T15:00:00.000Z',
  //   eventTime: '18:00:00',
  //   location: '서울 월드컵 경기장',
  //   seatNumber: 1,
  //   seatClass: '일반석',
  //   seatPrice: '10000.00',
  //   totalAmount: '250000.00',
  // };

  const handleCancel = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .post(
          EDIT_USER_API,
          {
            id: 2,
          },
          {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
          },
        )
        .then(res => {
          if (res.data.message === 'cancel_success') {
            alert('삭제완료');
          } else {
            alert('다시 시도해주세요');
          }
        });
    } else {
      alert('삭제 취소!');
    }
  };

  return (
    <div className="myPage">
      <div className="menuArea">
        <div className="userArea">
          <ProfileImage src={profileImage} alt={userName} />
          <p>{userName}</p>
        </div>
      </div>
      <div className="userPage">
        <h2 className="title">프로필변경</h2>
        <div className="myPageArea">
          <ProfileEdit userName={userName} profileImage={profileImage} />
        </div>
        <h2 className="title">결제내역</h2>
        <div className="userOrders">
          <OrdersInfo {...userData} />
          <div className="qrArea">
            <UserQr />
            <UserQr />
          </div>
          <div className="cancelBtn">
            <Button width="200px" onClick={handleCancel}>
              결제취소
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
