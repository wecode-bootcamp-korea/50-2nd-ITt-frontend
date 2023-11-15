import React from 'react';
import DetailsInfo from '../../../../components/DetailsInfo/DetailsInfo';
import './UserOrders.scss';

const UserOrders = ({
  eventDate,
  eventTime,
  location,
  seatClass,
  seatNumber,
  ticketImage,
  performanceTitle,
}) => {
  const USERDATA = [
    { id: 1, type: '관람일자', content: eventDate },
    { id: 2, type: '관람시간', content: eventTime },
    { id: 3, type: '위치', content: location },
    { id: 4, type: '좌석', content: `${seatClass} ${seatNumber}` },
  ];

  return (
    <div className="userOrders">
      <div className="imageArea">
        <img src={ticketImage} alt={performanceTitle} className="ticketImage" />
      </div>
      <DetailsInfo detailsLabel={USERDATA} />
    </div>
  );
};

export default UserOrders;
