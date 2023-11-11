import React from 'react';
import './Ordersinfo.scss';

const Ordersinfo = ({
  title,
  image,
  time,
  date,
  locationName,
  seatName,
  amount,
  className,
}) => {
  const ORDERLABEL = [
    { id: 1, type: '관람일자', content: date },
    { id: 2, type: '관람시간', content: time },
    { id: 3, type: '위치', content: locationName },
    { id: 4, type: '좌석', content: `${className}석 ${seatName}` },
  ];
  return (
    <div className="ordersInfo">
      <div className="ordersInfoArea">
        <div className="orderImgArea">
          <img src={image} alt={image} className="orderImage" />
        </div>
        <div className="orderInfo">
          <div className="orderList">
            <h1 className="title">{title}</h1>
            <ul>
              {ORDERLABEL.map(order => (
                <li className="ticketInfo" key={order.type}>
                  <span className="label">{order.type}</span>
                  <span className="content">{order.content}</span>
                </li>
              ))}
            </ul>
            <div className="totalPriceArea">
              <p className="priceTitle">총 결제금액</p>
              <span className="priceContent">
                <span className="totalPrice">{amount}</span>원
              </span>
            </div>
          </div>
          <div className="dashLine" />
        </div>
      </div>
    </div>
  );
};

export default Ordersinfo;
