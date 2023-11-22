import React from 'react';
import './Location.scss';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const Location = ({ lat, lng }) => {
  return (
    <div className="location">
      <Map
        center={{ lat: 37.582336, lng: 127.001844 }} // 지도의 중심 좌표
        style={{ width: '100%', height: '600px' }} // 지도 크기
        level={3} // 지도 확대 레벨
        draggable={false}
      >
        <MapMarker position={{ lat: lat, lng: lng }} />
      </Map>
    </div>
  );
};

export default Location;
