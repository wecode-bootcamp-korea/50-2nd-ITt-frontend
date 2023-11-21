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

  useEffect(() => {
    axios
      .get(GET_ADMIN_SELECTORDERLIST_API, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjoxLCJpYXQiOjE3MDAxOTk3MjN9.I0EdTx0oWXcykAh9yMoW-lcOrT0hNhmskRxHIne7BZM',
        },
      })
      .then(res => {
        setDashList(res.data.data);
      });
  }, []);

  const setIsDelectClicked = reservationId => {
    axios.delete(`${GET_ADMIN_DELETEORDERLIST_API}/${reservationId}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjoxLCJpYXQiOjE3MDAxOTk3MjN9.I0EdTx0oWXcykAh9yMoW-lcOrT0hNhmskRxHIne7BZM',
      },
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
                <span className="infoTitle">{amount}</span>
                <span className="infoTitle">{eventDate}</span>
                <span className="infoTitle">{eventTime}</span>
                <span className="infoTitle">{title}</span>
                <span className="infoTitle">{userName}</span>
                <div className="btnArea">
                  <Button
                    outline
                    width="100px"
                    height="40px"
                    onClick={() => setIsDelectClicked(reservationId)}
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
