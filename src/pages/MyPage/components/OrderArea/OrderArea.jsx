import React from 'react';
import UserOrders from '../UserOrders/UserOrders';
import './OrderArea.scss';

const OrderArea = ({
  title,
  image,
  time,
  date,
  locationName,
  qrcodeUrl,
  seatNames,
  amount,
  reservationId,
}) => {
  const hour = time.slice(0, 2);
  const timeOfDay = hour < 12 ? '오전' : '오후';
  const minute = time.slice(3, 5);

  const timeData = `${timeOfDay} ${hour}시 ${minute}분`;

  return (
    <div className="orderArea">
      <UserOrders
        title={title}
        image={image}
        timeData={timeData}
        date={date}
        locationName={locationName}
        qrcode_url={qrcodeUrl}
        seatNames={seatNames}
        amount={amount}
        reservationId={reservationId}
      />
    </div>
  );
};

export default OrderArea;
