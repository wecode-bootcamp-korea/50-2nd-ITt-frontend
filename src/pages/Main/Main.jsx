import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Main_Slide,
  BANNER_SLIDE,
  COMPONENT_1,
  COMPONENT_2,
} from './MainData/data.js';
import './Main.scss';

const Main = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [bannerSlideIdx, setBannerSlideIdx] = useState(0);
  const slideToLeft = () => {
    if (bannerSlideIdx === 0) {
      setBannerSlideIdx(Main_Slide.length - 1);
    } else {
      setBannerSlideIdx(prev => prev - 1);
    }
  };

  const slideToRight = () => {
    if (bannerSlideIdx === Main_Slide.length - 1) {
      setBannerSlideIdx(0);
    } else {
      setBannerSlideIdx(prev => prev + 1);
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setBannerSlideIdx(prevIdx =>
        prevIdx === Main_Slide.length - 1 ? 0 : prevIdx + 1,
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
      {Main_Slide.length !== 0 && (
        <div className="slidebox">
          <ul
            className="slidelist"
            style={{
              transform: `translateX(calc(-100% * ${bannerSlideIdx}))`,
            }}
          >
            {Main_Slide.map((slide, id) => (
              <li className="slideitem" key={id}>
                <img className="slideimg" src={slide.image_source} />
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
      )}
      <div className="compTitle"> Recommandation</div>

      <div className="comp_one">
        <div className="comp_one_left">
          <img
            className="comp_one_leftimg"
            alt="img"
            src="/images/comp1_1.png"
          ></img>
        </div>

        <div className="img_container">
          {COMPONENT_1.map((comp1, id) => (
            <div className="comp_one_right" key={id}>
              <div className="img_wrapper">
                <img
                  className="comp_one_rightimg"
                  alt="img"
                  src={comp1.image_source}
                />
                <div className="info">
                  <p className="info_title">{comp1.title}</p>
                  <p className="info_date">{comp1.date}</p>
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
                <img src={categ.image_source} />

                <div className="detail">
                  <div className="categDate">{categ.date}</div>
                  <div className="categTitle">{categ.title}</div>
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

      <div className="comp_two">
        <div className="section_container">
          {COMPONENT_2.map((comp2, id) => (
            <div className="comp_two_frame" key={id}>
              <div className="comp_two_wrapper">
                <img
                  className="comp_two_img"
                  alt="img"
                  src={comp2.image_source}
                />

                <div className="comp_two_info">
                  <p className="comp_two_info_discount">{comp2.discount}</p>
                  <p className="comp_two_info_date">{comp2.date}</p>
                  <p className="comp_two_info_title">{comp2.title}</p>
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
