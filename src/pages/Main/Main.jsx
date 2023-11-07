import React from 'react';
import './Main.scss';

const Main = () => {
  return (
    <div className="main">
      <h2 className="mainTitle">안녕</h2>
      <h2 className="mainSubTitle">안녕</h2>
      <p className="mainText"></p>
      <p className="mainSubText"></p>
      <div className="mainArea">
        <div className="siperArea"></div>
        <div className="listArea">
          <div className="listGroup vertical"></div>
          <div className="listGroup"></div>
        </div>
        <div className="mainGroup"></div>
        <div className="mainBox"></div>
      </div>
    </div>
  );
};

export default Main;
