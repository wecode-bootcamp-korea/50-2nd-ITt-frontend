import React from 'react';
import './OrdersInfo.scss';

const OrdersInfo = ({
  performanceTitle,
  ticketImage,
  eventTime,
  eventDate,
  location,
  seatNumber,
  seatClass,
  totalAmount,
}) => {
  const ORDERLABEL = [
    { id: 1, type: '관람일자', content: eventDate },
    { id: 2, type: '관람시간', content: eventTime },
    { id: 3, type: '위치', content: location },
    { id: 4, type: '좌석', content: `${seatClass} ${seatNumber}번` },
  ];

  return (
    <div className="ordersInfo">
      <div className="ordersInfoArea">
        <div className="orderImgArea">
          <img
            src={ticketImage}
            alt={performanceTitle}
            className="orderImage"
          />
        </div>
        <div className="orderInfo">
          <div className="orderList">
            <h1 className="title">{performanceTitle}</h1>
            <ul>
              {ORDERLABEL.map(order => (
                <li className="ticketInfo" key={order.type}>
                  <span className="label">{order.type}</span>
                  <span className="content">{order.content}</span>
                </li>
              ))}
            </ul>
            <div className="totalPriceArea">
              <p className="priceContent">총 결제금액</p>
              <span className="priceContent">
                <span className="totalPrice">{totalAmount}</span>원
              </span>
            </div>
          </div>
          <div className="dashLine" />
        </div>
      </div>
    </div>
  );
};

export default OrdersInfo;
