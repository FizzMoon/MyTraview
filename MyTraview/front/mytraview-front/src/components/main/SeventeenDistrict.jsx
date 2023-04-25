import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import PrevArrowImg from '../assets/prev_arrow.png';
import NextArrowImg from '../assets/next_arrow.png';

import seoul from '../assets/서울 남산타워 야경2jpg.jpg'
import pusan from '../assets/감천마을2.jpg'
import daegu from '../assets/대구 성당못.jpg'
import incheon from '../assets/인천송도.jpg'
import gwangju from '../assets/광주.jpg'
import daejeon from '../assets/대전 엑스포 다리.jpg'
import ulsan from '../assets/울산 간절곶2.jpg'
import sejong from '../assets/세종.jpg'
import kyunggi from '../assets/수원화성 성곽.jpg'
import kwangwon from '../assets/양양 낙산사.jpg'
import chungbuk from '../assets/충북 도담상봉.jpg'
import chungnam from '../assets/충남.jpg'
import jeonbuk from '../assets/전주한옥마을 겨울.jpg'
import jeonnam from '../assets/보성 녹차밭.jpg'
import kyungbuk from '../assets/경북 안압지.jpg'
import kyungnam from '../assets/경남 해인사.jpg'
import jeju from '../assets/제주.jpg'


const SeventeenDistrict = () => {
  const data = [
    //서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종특별자치시, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주특별자치도
    { areaCode: "서울", Img: seoul},
    { areaCode: "부산", Img: pusan},
    { areaCode: "대구", Img: daegu},
    { areaCode: "인천", Img: incheon},
    { areaCode: "광주", Img: gwangju},
    { areaCode: "대전", Img: daejeon},
    { areaCode: "울산", Img: ulsan},
    { areaCode: "세종특별자치시", Img: sejong},
    { areaCode: "경기", Img: kyunggi},
    { areaCode: "강원", Img: kwangwon},
    { areaCode: "충북", Img: chungbuk},
    { areaCode: "충남", Img: chungnam},
    { areaCode: "전북", Img: jeonbuk},
    { areaCode: "전남", Img: jeonnam},
    { areaCode: "경북", Img: kyungbuk},
    { areaCode: "경남", Img: kyungnam},
    { areaCode: "제주특별자치도", Img: jeju},
  ];
  // 캐러셀 셋팅함수

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        onClick={onClick}
        style={{ ...style, display: "block", left: '5px', zIndex: '9', before: { content: 'none' } }}
      >
        <img src={PrevArrowImg} alt='PrevArrow'/>
        {/* 기호에 맞게 화살표 색깔 변경가능 */}
      </button>
    );
  }

const StyledSlider = styled(Slider)`
  
  position: relative;
   .slick-prev::before,
   .slick-next::before {
     opacity: 0;
     display: none;
   }
 `;

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        onClick={onClick}
        style={{ ...style, display: "block", right: '5px', zIndex: '9' }} 
      >
        <img src={NextArrowImg} alt='NextArrow'/>
        {/* 기호에 맞게 화살표 색깔 변경가능 */}
      </button>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
    {/* 배경 추가 및 br 태그로 띄어쓰기 추가함 */}
    <div className="bg-[url('/public/images/starSky.jpg')] bg-cover opacity-95" style={{height: "100vh"}}>
      <div className='mx-40 text-center'>
      <br /><br />
      <br /><br />
      <br /><br />
      
        <Link to="/articles">
          <button className="px-5 py-2 font-bold bg-blue-900 border-2 rounded-lg bg-opacity-80 text-slate-200 border-slate-300 hover:bg-slate-600 hover:bg-opacity-95">Read All Reviews</button>
        </Link>
        <br /><br />

        <StyledSlider {...settings}>
          {data.map(({areaCode, Img}) => (
            <div key={areaCode + Img}>
              <div className='ml-10' style={{ width: "80%" }} >
                <Link to={`/articles/area/${areaCode}`} state={{ from: { areaCode } }} >
                  <div
                    style={{backgroundImage: `url("${Img}")`}}
                    className={`box-content bg-cover bg-center bg-blend-hard-light scale-90 hover:scale-100 h-96 border-2 rounded-lg border-slate-400`}>
                    <button className='text-3xl font-extrabold text-center text-white'>{areaCode}</button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </StyledSlider>

        <br /><br />
        
      </div>
      </div>
  
    </>
  )
}

export default SeventeenDistrict