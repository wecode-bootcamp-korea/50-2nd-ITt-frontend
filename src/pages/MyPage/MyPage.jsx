import React, { useEffect, useState } from 'react';
import ProfileImage from './components/ProfileImage/ProfileImage';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';
import UserQr from './components/UserQr/UserQr';
import Button from '../../components/Button/Button';
import './MyPage.scss';
import { EDIT_USER_API, GET_USER_API } from '../../config';
import axios from 'axios';
import User from './components/UserOrders/UserOrders';

const MyPage = () => {
  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   axios
  //     .get(GET_USER_API, {
  //       headers: { 'Content-Type': 'application/json;charset=utf-8' },
  //     })
  //     .then(res => {
  //       setUserData(res.data.message);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get('/data/mypageData.json', {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      })
      .then(res => {
        setUserData(res.data.data);
      });
  }, []);

  const { profileImage, userName, seatClass, seatNumber } = userData;

  const handleCancel = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .post(
          'http://13.209.21.84:8000/users/mypage/cancel',
          {
            reservationId: 21,
            totalAmount: 10000000,
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              // token : 'token'
            },
          },
        )
        .then(res => {
          if (res.data.message === 'cancel_success') {
            alert('삭제완료');
          } else {
            alert('삭제실패');
          }
        });
    } else {
      alert('삭제 취소!');
    }
  };

  return (
    <div className="myPage">
      <div className="menuArea">
        <div className="myPageArea">
          <ProfileImage src={profileImage} alt={userName} />
          <p>{userName}</p>
        </div>
      </div>
      <div className="userPage">
        <h2 className="title">프로필변경</h2>
        <div className="userArea">
          <ProfileEdit userName={userName} profileImage={profileImage} />
        </div>
        <h2 className="title">결제내역</h2>
        <div className="orderArea">
          <User {...userData} />
          <div className="qrArea">
            <UserQr seatClass={seatClass} seatNumber={seatNumber} />
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
