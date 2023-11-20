import React from 'react';
import './DetailsInfo.scss';

const DetailsInfo = ({ detailsLabel }) => {
  return (
    <ul className="detailsInfo">
      {detailsLabel.map(order => (
        <li className="info" key={order.type}>
          <span className="label">{order.type}</span>
          <span className="content">{order.content}</span>
        </li>
      ))}
    </ul>
  );
};

export default DetailsInfo;
