import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GET_ITEM_API } from '../../config';
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
    const slideInterval = setInterval(() => slideToRight(), 3000);
    return () => clearInterval(slideInterval);
  }, [bannerSlideIdx]);

  const carouselToLeft = () => {
    setCarouselIdx(prev =>
      prev === 0 ? categoryItemList.length - SLIDE_TO_SHOW : prev - 1,
    );
  };

  const carouselToRight = () => {
    setCarouselIdx(prev =>
      prev === categoryItemList.length - 7 ? 0 : prev + 1,
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
    axios
      // .get('/data/itemList.json', {
      .get(GET_ITEM_API, {
        params: {
          category: categoryId,
          search: searchTerm,
        },
      })
      .then(response => {
        setProductsData(response.data.data);
      })
      .catch(error => {
        console.error('에러 발생!', error);
      });
  }, [searchTerm, categoryId]);

  const { mainSlide, categoryItemList, newItems, bestItems, mdItemsList } =
    productsData;

  const handleCategoryClick = id => {
    setcategoryId(id);
  };

  return (
    <div className="mainPage">
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

      <div className="compTitle">- Recommandation -</div>

      <div className="recommendation">
        {mdItemsList?.map((recomm, idx) =>
          idx === 0 ? (
            <div className="recommendationLeft" key={idx}>
              <Link to={`/detail/${recomm.id}`}>
                <img
                  className="recommendationLeftimg"
                  alt="img"
                  src={recomm.image}
                />
              </Link>
            </div>
          ) : (
            <div className="recommendationRight" key={idx}>
              <div className="imgWrapper">
                <img
                  className="recommendationRightimg"
                  alt="recommendationImg"
                  src={recomm.image}
                />
                <div className="info">
                  <Link to={`/detail/${recomm.id}`}>
                    <p className="infoTitle">{recomm.title}</p>
                    <p className="infoDate">{recomm.price} 원</p>
                  </Link>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="compTitle">- CATEGORY -</div>

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
          #로맨스
        </p>
        <p className="categoryText" onClick={() => handleCategoryClick(2)}>
          #코미디
        </p>
        <p className="categoryText" onClick={() => handleCategoryClick(3)}>
          #뮤지컬
        </p>
        <p className="categoryText" onClick={() => handleCategoryClick(4)}>
          #공포
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
          {categoryItemList?.map((categ, idx) => (
            <li
              key={categ.id}
              style={{ width: `calc(100vw / ${SLIDE_TO_SHOW})` }}
            >
              <Link to={`/detail/${categ.id}`}>
                <div className="categoryItem">
                  <div className="imgWrapper">
                    <div className="imgNumber">{idx - 2}</div>
                    <img src={categ.image} alt="categoryimg" />
                  </div>

                  <div className="detail">
                    <div className="categTitle">{categ.title}</div>
                    <div className="categprice">{categ.price} 원</div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
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

      <div className="compTitle"> - BEST ITEMS -</div>

      <div className="onSale">
        <div className="sectionContainer">
          {bestItems?.map((discount, idx) => (
            <div className="onSaleFrame" key={idx}>
              <Link to={`/detail/${discount.id}`}>
                <div className="onSaleWrapper">
                  <img className="onSaleImg" alt="img" src={discount.image} />

                  <div className="onSaleInfo">
                    <p className="onSaleInfoDiscount">{discount.discount}</p>
                    <p className="onSaleInfoTitle">{discount.title}</p>
                    <p className="onSaleInfoDate">{discount.price} 원</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="compTitle">- UPCOMING EVENT -</div>

      <div className="upComingEvent">
        {newItems?.map((event, idx) => (
          <div className="upComingEventContent" key={idx}>
            <Link to={`/detail/${event.id}`}>
              <img className="upComingEventImg" alt="img" src={event.image} />
              <div className="upComingEventInfo">
                <p className="upComingEventTitle">{event.title}</p>
                <p className="upComingEventPrice">{event.price} 원</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
