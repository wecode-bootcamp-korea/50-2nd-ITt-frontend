import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import {
  GET_USER_API,
  GET_USER_ORDER_API,
  POST_CANCEL_API,
} from '../../config';
import ProfileImage from './components/ProfileImage/ProfileImage';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';
import OrderArea from './components/OrderArea/OrderArea';
import Button from '../../components/Button/Button';
import './MyPage.scss';

const MyPage = () => {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const [userData, setUserData] = useState({});
  const [userOrderData, setUserOrderData] = useState([]);
  const [isOrder, setIsOrder] = useState(true);

  // 유저정보 api
  const getUserData = () => {
    axios
      .get(GET_USER_API)
      .then(res => {
        setUserData(res.data.data[0]);
      })
      .catch(error => console.error(error));
  };

  // 유저 결제내역 api
  const getOrderData = () => {
    if (queryString) {
      axios
        .get(`${GET_USER_ORDER_API}?${queryString}`)
        .then(res => {
          setIsOrder(true);
          setUserOrderData(res.data.data);
        })
        .catch(error => console.error(error));
    } else {
      setIsOrder(false);
    }
  };

  // 유저정보 api
  useEffect(() => {
    getUserData();
  }, []);

  // 결제내역 api
  useEffect(() => {
    getOrderData();
  }, []);

  const seatInfo = {
    totalAmount: 0,
    reservationIds: [],
    seatNames: [],
  };

  if (userOrderData && userOrderData.length > 0) {
    seatInfo.totalAmount = userOrderData.reduce((acc, cur) => {
      return acc + parseInt(cur.amount, 10);
    }, 0);
    seatInfo.reservationIds = userOrderData.map(data => data.reservationId);
    seatInfo.seatNames = userOrderData.map(data => data.seatName);
  }

  const { reservationIds, totalAmount, seatNames } = seatInfo;

  const { profileImage, name } = userData;

  const body = reservationIds.map(data => ({
    reservationId: data,
    totalAmount: totalAmount,
  }));

  // 결제취소 api
  const handleCancelOrder = () => {
    if (window.confirm('예매 취소하시겠습니까?')) {
      axios
        .post(
          POST_CANCEL_API,
          {
            data: body,
          },
          {
            headers: {
              Authorization:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJwYzBidW1AZ21haWwuY29tIiwibmFtZSI6Iuq5gOyYgeuylCIsImlhdCI6MTcwMDExNDU4Nn0.GbMPNLlMF27ThioX5DnQUqLMcQNVl58Ux4Ww_IuGmTc',
            },
          },
        )
        .then(res => {
          if (res.data.message === 'cancel_success') {
            alert('결제취소완료');
          } else {
            alert('결제취소실패');
          }
        })
        .error(error => console.error(error));
    }
  };

  return (
    <div className="myPage">
      <div className="menuArea">
        <div className="myPageArea">
          <ProfileImage src={profileImage} name={name} />
          <p>{name}</p>
        </div>
      </div>
      <div className="userPage">
        <h2 className="title">프로필변경</h2>
        <div className="userArea">
          <ProfileEdit name={name} profileImage={profileImage} />
        </div>
        <h2 className="title">결제내역</h2>
        <div className="orderList">
          {isOrder ? (
            <OrderArea {...userOrderData[0]} seatNames={seatNames} />
          ) : (
            <div className="notOrder">결제 내역이 없습니다.</div>
          )}
          <div className="cancelBtn">
            {isOrder && (
              <Button width="200px" onClick={handleCancelOrder}>
                결제취소
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
