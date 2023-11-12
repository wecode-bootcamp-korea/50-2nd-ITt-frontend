import React from 'react';
import './OrdersInfo.scss';
import DetailsInfo from '../../../../components/DetailsInfo/DetailsInfo';

const OrdersInfo = ({
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
            <DetailsInfo detailsLabel={ORDERLABEL} />
          </div>
          <div className="dashLine" />
        </div>
      </div>
    </div>
  );
};

export default OrdersInfo;
