import React, { useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import axios from 'axios';
import {
  GET_ADMIN_SELECTORDERLIST_API,
  GET_ADMIN_DELETEORDERLIST_API,
} from '../../../../config';
import './Dashboard.scss';

const Dashboard = () => {
  const [dashList, setDashList] = useState([]);
  const adminToken = localStorage.getItem('adminToken');

  const getDashList = () => {
    axios
      .get(GET_ADMIN_SELECTORDERLIST_API, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: adminToken,
        },
      })
      .then(res => {
        setDashList(res.data.data);
      });
  };

  useEffect(() => {
    getDashList();
  }, []);

  const handleDelectClick = reservationId => {
    axios
      .delete(`${GET_ADMIN_DELETEORDERLIST_API}/${reservationId}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: adminToken,
        },
      })
      .then(res => {
        if (res.data.message === 'cancel_success') {
          alert('예매 취소 성공');
          getDashList();
        } else {
          alert('에러가 발생했습니다.');
        }
      });
  };

  return (
    <div className="dashboard">
      <h3 className="dashboardTitle">대시보드</h3>
      <div className="dashboardArea">
        <ul className="dashboardGroup">
          {dashList.map(dashList => {
            const {
              userId,
              amount,
              eventDate,
              eventTime,
              title,
              userName,
              reservationId,
            } = dashList;
            return (
              <li className="dashboardInfo" key={userId}>
                <div className="infoGroup">
                  <span className="info">
                    가격 : ₩ {amount.toLocaleString('ko-KR')}원
                  </span>
                  <span className="info">날짜 : {eventDate}</span>
                  <span className="info">시간 : {eventTime}</span>
                  <span className="info">제목 : {title}</span>
                  <span className="info">이름 : {userName}</span>
                </div>
                <div className="btnArea">
                  <Button
                    outline
                    width="100px"
                    height="40px"
                    onClick={() => handleDelectClick(reservationId)}
                  >
                    예매 취소
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
