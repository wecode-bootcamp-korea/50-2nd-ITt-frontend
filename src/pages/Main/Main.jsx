import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useHistory, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {
  MAIN_SLIDE,
  BANNER_SLIDE,
  RECOMMANDATION,
  ONSALE,
  UPCOMING_EVENT,
} from './MainData/data';
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
    setCarouselIdx(prev =>
      prev === 0 ? BANNER_SLIDE.length - SLIDE_TO_SHOW : prev - 1,
    );
  };

  const carouselToRight = () => {
    setCarouselIdx(prev =>
      prev === BANNER_SLIDE.length - SLIDE_TO_SHOW ? 0 : prev + 1,
    );
  };

  const SLIDE_TO_SHOW = 4;

  const [wholeData, setwholeData] = useState({});
  const [categoryId, setcategoryId] = useState({});

  useEffect(() => {
    fetch('http://10.58.52.217:8000/itemList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        setwholeData(data);
      });
  }, []);

  const { sildeItem, recommandation, categotItem, onSale, newItem } = wholeData;

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
        {RECOMMANDATION.map((Recomm, idx) =>
          idx === 0 ? (
            <div className="RecommendationLeft" key={idx}>
              <img
                className="RecommendationLeftimg"
                alt="img"
                src={Recomm.image_source}
              />
            </div>
          ) : (
            <div className="RecommendationRight" key={idx}>
              <div className="imgWrapper">
                <img
                  className="RecommendationRightimg"
                  alt="img"
                  src={Recomm.image_source}
                />
                <div className="info">
                  <p className="infoTitle">{Recomm.title}</p>
                  <p className="infoDate">{Recomm.date}</p>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="compTitle"> CATEGORY</div>

      <div className="searchContainer">
        <input type="text" className="searchBox" placeholder="검색..." />
        <button className="searchButton">🔍</button>
      </div>

      <div className="categoryLinks">
        <p className="categoryText">#콘서트</p>
        <p className="categoryText">#뮤지컬</p>
        <p className="categoryText">#연극</p>
        <p className="categoryText">#전시</p>
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
          {ONSALE.map((discount, idx) => (
            <div className="onSaleFrame" key={idx}>
              <div className="onSaleWrapper">
                <img
                  className="onSaleImg"
                  alt="img"
                  src={discount.image_source}
                />

                <div className="onSaleInfo">
                  <p className="onSaleInfoDiscount">{discount.discount}</p>
                  <p className="onSaleInfoDate">{discount.date}</p>
                  <p className="onSaleInfoTitle">{discount.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="compTitle"> UPCOMING EVENT </div>

      <div className="upComingEvent">
        {UPCOMING_EVENT.map((event, idx) => (
          <div className="upComingEventContent" key={idx}>
            <img
              className="upComingEventImg"
              alt="img"
              src={event.image_source}
            />
            <div>
              <p className="upComingEventTitle">{event.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
