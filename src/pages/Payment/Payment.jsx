import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { GET_ORDER_API } from '../../config';
import OrdersInfo from './components/OrdersInfo/OrdersInfo';
import PriceArea from './components/PriceArea/PriceArea';
import './Payment.scss';

const Payment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState([]);
  const [addPoints, setAddPoints] = useState('');

  const admin = process.env.REACT_APP_ADMIN_KEY;
  const pgToken = searchParams.get('pg_token');
  const tid = localStorage.getItem('tid');

  // 유저정보, 주문내역 데이터
  const getUserPaymentData = async () => {
    try {
      const response = await axios.get(GET_ORDER_API);
      return response.data.data;
    } catch (error) {
      console.error('결제 데이터를 가져오는 중 에러가 발생했습니다', error);
      throw error;
    }
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
      })
      .catch(error => {
        console.error('결제 승인 중 오류가 발생했습니다', error);
        throw error;
      });
  };

  // 백엔드 유저 포인트 데이터 전달
  const changePoints = (amount, remainingPoint) => {
    axios
      .put(`${GET_ORDER_API}/pointCharge`, {
        point: amount,
        remainingPoint: remainingPoint,
      })
      .then(() => {
        alert('포인트충전완료');
        getUserPaymentData().then(res => setPaymentData(res.data.data));
      })
      .catch(error => {
        console.error('포인트 충전 중 오류가 발생했습니다', error);
        throw error;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPaymentData();
        if (pgToken) {
          await paymentApprove(data[0].userId, data[0].remainingPoint);
        } else {
          setPaymentData(data);
        }
      } catch (error) {
        console.error('오류가 발생했습니다.', error);
      }
    };
    fetchData();
  }, []);

  // 좌석 정보 배열로 변환
  const seatInfo = {
    totalAmount: 0,
    timeData: '',
    reservationIds: [],
    seatIds: [],
    seatNames: [],
  };

  if (paymentData && paymentData.length > 0) {
    seatInfo.totalAmount = paymentData.reduce((acc, cur) => {
      return acc + parseInt(cur.amount, 10);
    }, 0);

    const hour = paymentData[0].time.slice(0, 2);
    const timeOfDay = seatInfo.hour < 12 ? '오전' : '오후';
    const minute = paymentData[0].time.slice(3, 5);

    seatInfo.timeData = `${timeOfDay} ${hour}시 ${minute}분`;
    seatInfo.reservationIds = paymentData.map(data => data.reservationId);
    seatInfo.seatIds = paymentData.map(data => data.seatId);
    seatInfo.seatNames = paymentData.map(data => data.seatName);
  }

  const { seatNames } = seatInfo;

  return (
    <div className="payment">
      <h2 className="paymentTitle">결제하기</h2>
      <div className="orderListArea">
        <OrdersInfo {...paymentData[0]} seatNames={seatNames} />
      </div>

      <div className="paymentArea">
        <PriceArea
          {...paymentData[0]}
          {...seatInfo}
          addPoints={addPoints}
          setAddPoints={setAddPoints}
        />
      </div>
    </div>
  );
};

export default Payment;
