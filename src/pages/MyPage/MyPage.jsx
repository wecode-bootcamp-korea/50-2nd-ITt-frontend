import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { GET_USER_API, GET_USER_ORDER_API } from '../../config';
import ProfileImage from './components/ProfileImage/ProfileImage';
import ProfileEdit from './components/ProfileEdit/ProfileEdit';
import OrderArea from './components/OrderArea/OrderArea';
import './MyPage.scss';

const MyPage = () => {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const [userData, setUserData] = useState({});
  const [userOrderData, setUserOrderData] = useState([]);
  const [isOrder, setIsOrder] = useState(false);

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

  const orderGroup = (arr, key) => {
    return Object.values(
      arr.reduce((acc, obj) => {
        const groupKey = obj[key];
        acc[groupKey] = acc[groupKey] || [];
        acc[groupKey].push(obj);
        return acc;
      }, []),
    );
  };

  const groupedOrder = orderGroup(userOrderData, 'itemOptionId');
  const ordersInfo = Object.values(groupedOrder).map(group => group[0]);
  const seatGroups = Object.values(groupedOrder);

  const seat = [];
  for (let i = 0; i < seatGroups.length; i++) {
    const result = seatGroups[i].map(obj => obj.seatName);
    seat.push(result);
  }
  const reservationIds = [];
  for (let i = 0; i < seatGroups.length; i++) {
    const result = seatGroups[i].map(obj => obj.reservationId);
    reservationIds.push(result);
  }

  const { profileImage, name } = userData;
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
            ordersInfo.map((order, index) => (
              <div key={order.itemOptionId}>
                <OrderArea
                  {...order}
                  seatNames={seat[index]}
                  reservationId={reservationIds[index]}
                />
              </div>
            ))
          ) : (
            <div className="notOrder">결제 내역이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
