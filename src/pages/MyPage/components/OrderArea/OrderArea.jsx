import React from 'react';
import UserOrders from '../UserOrders/UserOrders';
import './OrderArea.scss';

const OrderArea = ({
  title,
  image,
  time,
  date,
  locationName,
  qrcode_url,
  seatNames,
}) => {
  return (
    <div className="orderArea">
      <UserOrders
        title={title}
        image={image}
        time={time}
        date={date}
        locationName={locationName}
        qrcode_url={qrcode_url}
        seatNames={seatNames}
      />
    </div>
  );
};

export default OrderArea;
