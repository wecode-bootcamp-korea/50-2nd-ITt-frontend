import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { GET_ORDER_API, MY_ORDER_API } from '../../config';
import OrdersInfo from './components/OrdersInfo/OrdersInfo';
import PriceArea from './components/PriceArea/PriceArea';
import './Payment.scss';

const Payment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const admin = process.env.REACT_APP_ADMIN_KEY;

  const tid = localStorage.getItem('tid');

  const [paymentData, setPaymentData] = useState([]);
  const [addPoints, setAddPoints] = useState('');

  const pgToken = searchParams.get('pg_token');

  // 유저정보, 주문내역 데이터
  const getUserPaymentData = () => {
    // return axios.get(`/data/paymentData.json`, {
    //   headers: { 'Content-Type': 'application/json;charset=utf-8' },
    // });
    return axios.get(GET_ORDER_API, {
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
  };

  // 결제 승인 요청
  const paymentApprove = (userId, remainingPoint) => {
    axios
      .post(
        'https://kapi.kakao.com/v1/payment/approve',
        {
          cid: 'TC0ONETIME',
          tid: tid,
          partner_order_id: 'partner_order_id',
          partner_user_id: userId,
          pg_token: pgToken,
        },
        {
          headers: {
            Authorization: `KakaoAK ${admin}`,
            'Content-type': `application/x-www-form-urlencoded;charset=utf-8`,
          },
        },
      )
      .then(res => {
        searchParams.delete('pg_token');
        setSearchParams(searchParams);
        changePoints(res.data.amount.total, remainingPoint);
      });
  };

  // 백엔드로 데이터 전달
  const changePoints = (amount, remainingPoint) => {
    axios
      .put(
        `${GET_ORDER_API}/pointCharge`,
        {
          point: amount,
          remainingPoint: remainingPoint,
        },
        {
          headers: {
            'Content-type': 'application/json;charset=utf-8',
          },
        },
      )
      .then(() => {
        alert('데이터 전달완료');
        getUserPaymentData().then(res => setPaymentData(res.data.data));
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      getUserPaymentData().then(res => {
        if (pgToken) {
          paymentApprove(
            res.data.data[0].userId,
            res.data.data[0].remainingPoint,
          );
        } else {
          setPaymentData(res.data.data);
        }
      });
    };
    fetchData();
  }, []);

  const totalAmount = paymentData.reduce((acc, cur) => {
    return acc + parseInt(cur.amount, 10);
  }, 0);

  return (
    <div className="payment">
      <h2 className="paymentTitle">결제하기</h2>
      <div className="orderListArea">
        {paymentData.map((data, value) => (
          <OrdersInfo {...data} key={value} />
        ))}
      </div>

      <div className="paymentArea">
        <PriceArea
          {...paymentData[0]}
          amount={totalAmount}
          addPoints={addPoints}
          setAddPoints={setAddPoints}
        />
      </div>
    </div>
  );
};

export default Payment;
