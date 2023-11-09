import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Main_Slide } from './MainData/data.js';
import './Main.scss';

const Main = () => {
  //   const [carouselIdx, setCarouselIdx] = useState(0);
  //   const [bannerSlideIdx, setBannerSlideIdx] = useState(0);
  //   const slideToLeft = () => {
  //     if (bannerSlideIdx === 0) {
  //       setBannerSlideIdx(Main_Slide.length - 1);
  //     } else {
  //       setBannerSlideIdx(prev => prev - 1);
  //     }
  //   };
  //   const slideToRight = () => {
  //     if (bannerSlideIdx === Main_Slide.length - 1) {
  //       setBannerSlideIdx(0);
  //     } else {
  //       setBannerSlideIdx(prev => prev + 1);
  //     }
  //   };
  //   return (
  //     <div className="main">
  //       {Main_Slide.length !== 0 && (
  //         <div className="slidebox">
  //           <ul
  //             className="slidelist"
  //             style={{
  //               transform: `translateX(calc(-100% * ${bannerSlideIdx}))`,
  //             }}
  //           >
  //             {Main_Slide.map((slide, id) => (
  //               <li className="slideitem" key={id}>
  //                 <img src={slide.image_source} />
  //               </li>
  //             ))}
  //           </ul>
  //           <div className="arrowContainer">
  //             <img
  //               className="arrow"
  //               src="/images/left_arrow.png"
  //               alt="left arrow"
  //               onClick={slideToLeft}
  //             />
  //             <img
  //               className="arrow"
  //               src="/images/right_arrow.png"
  //               alt="right arrow"
  //               onClick={slideToRight}
  //             />
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default Main;
