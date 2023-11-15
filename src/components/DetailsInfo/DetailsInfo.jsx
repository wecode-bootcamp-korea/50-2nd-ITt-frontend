import React from 'react';
import './DetailsInfo.scss';

const DetailsInfo = ({ detailsLabel }) => {
  return (
    <div className="detailsInfo">
      <ul>
        {detailsLabel.map(order => (
          <li className="info" key={order.type}>
            <span className="label">{order.type}</span>
            <span className="content">{order.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsInfo;
