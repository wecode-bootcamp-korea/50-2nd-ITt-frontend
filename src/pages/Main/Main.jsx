import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MAIN_SLIDE,
  BANNER_SLIDE,
  RECOMMANDATION,
  ONSALE,
  UPCOMING_EVENT,
} from './MainData/data.js';
import './Main.scss';

const Main = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [bannerSlideIdx, setBannerSlideIdx] = useState(0);
  const slideToLeft = () => {
    if (bannerSlideIdx === 0) {
      setBannerSlideIdx(MAIN_SLIDE.length - 1);
    } else {
      setBannerSlideIdx(prev => prev - 1);
    }
  };

  const slideToRight = () => {
    if (bannerSlideIdx === MAIN_SLIDE.length - 1) {
      setBannerSlideIdx(0);
    } else {
      setBannerSlideIdx(prev => prev + 1);
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setBannerSlideIdx(prevIdx =>
        prevIdx === MAIN_SLIDE.length - 1 ? 0 : prevIdx + 1,
      );
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  const carouselToLeft = () => {
    if (carouselIdx === 0) return;

    setCarouselIdx(prev => prev - 1);
  };

  const carouselToRight = () => {
    if (carouselIdx === BANNER_SLIDE.length - SLIDE_TO_SHOW) return;

    setCarouselIdx(prev => prev + 1);
  };

  const SLIDE_TO_SHOW = 4;

  return (
    <div className="main">
      <div className="slideBox">
        <ul
          className="slideList"
          style={{
            transform: `translateX(calc(-100% * ${bannerSlideIdx}))`,
          }}
        >
          {MAIN_SLIDE.map((slide, id) => (
            <li className="slideItem" key={id}>
              <img className="slideImg" src={slide.image_source} />
            </li>
          ))}
        </ul>
        <div className="arrowContainer">
          <img
            className="arrow"
            src="/images/left_arrow.png"
            alt="left arrow"
            onClick={slideToLeft}
          />
          <img
            className="arrow"
            src="/images/right_arrow.png"
            alt="right arrow"
            onClick={slideToRight}
          />
        </div>
      </div>

      <div className="compTitle"> Recommandation</div>

      <div className="Recommendation">
        <div className="RecommendationLeft">
          <img
            className="RecommendationLeftimg"
            alt="img"
            src="https://cdn.pixabay.com/photo/2020/07/05/18/57/woman-5374127_1280.jpg"
          ></img>
        </div>

        <div className="imgContainer">
          {RECOMMANDATION.map((comp1, id) => (
            <div className="RecommendationRight" key={id}>
              <div className="imgWrapper">
                <img
                  className="RecommendationRightimg"
                  alt="img"
                  src={comp1.image_source}
                />
                <div className="info">
                  <p className="infoTitle">{comp1.title}</p>
                  <p className="infoDate">{comp1.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="compTitle"> CATEGORY</div>

      <div className="categoryLinks">
        <a className="categoryText" href="/concerts">
          #콘서트
        </a>
        <a className="categoryText" href="/musicals">
          #뮤지컬
        </a>
        <a className="categoryText" href="/theatre">
          #연극
        </a>
        <a className="categoryText" href="/exhibitions">
          #전시
        </a>
      </div>

      <div className="categoryList">
        <ul
          style={{
            transform: `translateX(calc(-100% * ${
              carouselIdx / BANNER_SLIDE.length
            }))`,
          }}
        >
          {BANNER_SLIDE.map(
            (
              categ, //
            ) => (
              <li
                key={categ.id}
                style={{ width: `calc(100vw / ${SLIDE_TO_SHOW})` }}
              >
                <div className="categoryItem">
                  <img src={categ.image_source} />

                  <div className="detail">
                    <div className="categDate">{categ.date}</div>
                    <div className="categTitle">{categ.title}</div>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
        <div className="arrowContainer">
          <img
            className="arrow"
            src="/images/left_arrow.png"
            alt="left arrow"
            onClick={carouselToLeft}
          />
          <img
            className="arrow"
            src="/images/right_arrow.png"
            alt="right arrow"
            onClick={carouselToRight}
          />
        </div>
      </div>

      <div className="compTitle"> ON SALE </div>

      <div className="onSale">
        <div className="sectionContainer">
          {ONSALE.map((comp2, id) => (
            <div className="onSaleFrame" key={id}>
              <div className="onSaleWrapper">
                <img className="onSaleImg" alt="img" src={comp2.image_source} />

                <div className="onSaleInfo">
                  <p className="onSaleInfoDiscount">{comp2.discount}</p>
                  <p className="onSaleInfoDate">{comp2.date}</p>
                  <p className="onSaleInfoTitle">{comp2.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="compTitle"> UPCOMING EVENT </div>

      <div className="upComingEvent">
        <div className="upComingEventContainer">
          {UPCOMING_EVENT.map((comp4, id) => (
            <div key={id}>
              <div className="upComingEventContent">
                <img
                  className="upComingEventImg"
                  alt="img"
                  src={comp4.image_source}
                />
                <div>
                  <p className="upComingEventTitle">{comp4.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
