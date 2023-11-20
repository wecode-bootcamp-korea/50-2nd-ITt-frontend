import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useHistory, Navigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { GET_ITEM_API } from '../../config';
import {
  MAIN_SLIDE,
  BANNER_SLIDE,
  RECOMMANDATION,
  ONSALE,
  UPCOMING_EVENT,
} from './MainData/data';
import './Main.scss';

const Main = () => {
  const [bannerSlideIdx, setBannerSlideIdx] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const slideToLeft = () => {
    if (bannerSlideIdx === 0) {
      setBannerSlideIdx(mainSlide?.length - 1);
    } else {
      setBannerSlideIdx(prev => prev - 1);
    }
  };

  const slideToRight = () => {
    if (bannerSlideIdx === mainSlide?.length - 1) {
      setBannerSlideIdx(0);
    } else {
      setBannerSlideIdx(prev => prev + 1);
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setBannerSlideIdx(prevIdx =>
        prevIdx === mainSlide?.length - 1 ? 0 : prevIdx + 1,
      );
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  const carouselToLeft = () => {
    setCarouselIdx(prev =>
      prev === 0 ? categoryItemList.length - SLIDE_TO_SHOW : prev - 1,
    );
  };

  const carouselToRight = () => {
    setCarouselIdx(prev =>
      prev === categoryItemList.length - SLIDE_TO_SHOW ? 0 : prev + 1,
    );
  };

  const SLIDE_TO_SHOW = 4;

  const [categoryId, setcategoryId] = useState(1);
  const [productsData, setProductsData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetch(`${GET_ITEM_API}?category=${categoryId}&search=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        setProductsData(data.data);
      });
  }, [searchTerm, categoryId]);

  const mainSlide = productsData.mainSlide;
  const categoryItemList = productsData.categoryItemList;
  const newItems = productsData.newItems;
  const bestitems = productsData.bestItems;
  const mdItemsLists = productsData.mdItemsList;
  console.log(mainSlide);
  console.log(categoryItemList);
  console.log(newItems);
  console.log(bestitems);
  console.log(categoryItemList);

  const handleCategoryClick = id => {
    setcategoryId(id);
  };

  return (
    <div className="main">
      <div className="slideBox">
        <ul
          className="slideList"
          style={{
            transform: `translateX(calc(-100% * ${bannerSlideIdx}))`,
          }}
        >
          {mainSlide?.map(slide => (
            <li className="slideItem" key={slide.id}>
              <Link to={`/detail/${slide.id}`}>
                <img className="slideImg" src={slide.image} />
              </Link>
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
        {mdItemsLists?.map((Recomm, idx) =>
          idx === 0 ? (
            <div className="RecommendationLeft" key={idx}>
              <img
                className="RecommendationLeftimg"
                alt="img"
                src={Recomm.image}
              />
            </div>
          ) : (
            <div className="RecommendationRight" key={idx}>
              <div className="imgWrapper">
                <img
                  className="RecommendationRightimg"
                  alt="img"
                  src={Recomm.image}
                />
                <div className="info">
                  <p className="infoTitle">{Recomm.title}</p>
                  <p className="infoDate">{Recomm.price} 원</p>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="compTitle"> CATEGORY</div>

      <div className="searchContainer">
        <input
          type="text"
          className="searchBox"
          placeholder="검색..."
          onChange={handleSearchChange}
        />
      </div>

      <div className="categoryLinks">
        <p className="categoryText" onClick={() => handleCategoryClick(1)}>
          #콘서트
        </p>
        <p className="categoryText" onClick={() => handleCategoryClick(2)}>
          #뮤지컬
        </p>
        <p className="categoryText" onClick={() => handleCategoryClick(3)}>
          #연극
        </p>
        <p className="categoryText" onClick={() => handleCategoryClick(4)}>
          #전시
        </p>
      </div>

      <div className="categoryList">
        <ul
          style={{
            transform: `translateX(calc(-100% * ${
              carouselIdx / categoryItemList?.length
            }))`,
          }}
        >
          {categoryItemList?.map(
            (
              categ, //
            ) => (
              <li
                key={categ.id}
                style={{ width: `calc(100vw / ${SLIDE_TO_SHOW})` }}
              >
                <Link to={`/detail/${categ.id}`}>
                  <div className="categoryItem">
                    <img src={categ.image} />

                    <div className="detail">
                      <div className="categTitle">{categ.title}</div>
                      <div className="categprice">{categ.price}</div>
                    </div>
                  </div>
                </Link>
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
          {bestitems?.map((discount, idx) => (
            <div className="onSaleFrame" key={idx}>
              <div className="onSaleWrapper">
                <img className="onSaleImg" alt="img" src={discount.image} />

                <div className="onSaleInfo">
                  <p className="onSaleInfoDiscount">{discount.discount}</p>
                  <p className="onSaleInfoTitle">{discount.title}</p>
                  <p className="onSaleInfoDate">{discount.price} 원</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="compTitle"> UPCOMING EVENT </div>

      <div className="upComingEvent">
        {newItems?.map((event, idx) => (
          <div className="upComingEventContent" key={idx}>
            <img className="upComingEventImg" alt="img" src={event.image} />
            <div className="upComingEventInfo">
              <p className="upComingEventTitle">{event.title}</p>
              <p className="upComingEventPrice">{event.price} 원</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
