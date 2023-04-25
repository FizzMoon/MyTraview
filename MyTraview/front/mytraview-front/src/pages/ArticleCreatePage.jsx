import React, { useEffect, useRef, useState } from 'react'
import { call } from '../api_config/ApiService';
import { Link } from 'react-router-dom';
import TagList from '../components/article/TagList';
import EditorComponent from '../components/article/EditorComponent';
import curBoardAtom from '../components/atoms/curBoardAtom';
import { useAtom } from 'jotai';
import Nav from '../components/main/Nav';
import NavAfter from '../components/main/NavAfter';

const ArticleCreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [curBoard, setCurBoard] = useAtom(curBoardAtom);
  const [category, setCategory] = useState('');
  const [articleId, setArticleId] = useState('');
  const [address, setAddress] = useState('')
  const [rate, setRate] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [placeName, setPlaceName] = useState('');
  const id = useRef('');

  const searchPlace = (place) => {
    setAddress(place);
  }

  const settingPlaceName = (selected) => {
    setPlaceName(selected);
    console.log("검색된 장소:" + placeName);
  }

  const settingLat = (selected) => {
    setLatitude(selected);
    console.log("선택된 위도: " + latitude);
  }

  const settingLng = (selected) => {
    setLongitude(selected);
    console.log("선택된 경도: " + longitude);
  }

  const settingCategory = (selected) => {
    setCategory(selected);
    console.log("선택된 카테고리: " + category);
  }

  const settingRating = (selected) =>{
    setRate(selected);
    console.log("선택된 별점: " + rate);
  }

  const writeTitle = (event) => {
    setTitle(event.target.value)
  }
  
  function writeContent(value) {
    setContent(value)
  }

  const handleCreate = async () => {
    const articleReq = {
      
      title: title,
      content: content
  
    }

    await call("/article", "POST", articleReq)
    .then( (res) => {id.current=res.id; console.log(articleId); console.log(res); alert("리뷰 남겨주셔서 감사합니다~")})
      .catch((err) => {
        console.log(err);
      });
    setArticleId(id.current)
    
    const placeReq = {
    areaCode: address.split(' ')[0],
    mapX: latitude,
    mapY: longitude,
    placeName: placeName,
    category: category,
    rating: rate,
    article : {
      id: id.current
    }
    }

    call("/place", "POST", placeReq)
    .then((res) => {console.log("플레이스 then 반응");})
    .catch((res) => {console.log("플레이스 catch 반응");})
  }
  
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
  

  return (
    <>
    {accessToken == null ? <Nav /> : <NavAfter />}
      <div className="bg-[url('/public/images/lightHouse.jpg')] opacity-80 bg-cover" style={{height: "170vh"}} >
        <br /><br /><br /><br />
        <div className='max-w-2xl px-6 pt-5 pb-16 m-auto bg-gray-200 rounded-md bg-opacity-20 ml-25 mr-25'>
          <div className="mb-10 text-xl font-bold text-left border-b-2">
              <div className="my-5 text-2xl font-bold text-teal-500 border-none">Write Review</div>
              Title
              <input type="text" name="title" value={title} placeholder="제목을 작성하세요." onChange={writeTitle} className="w-full py-4 pl-0 text-sm text-left placeholder-gray-300 border-none hover:placeholder-transparent"/>
            
          </div>
          <br></br>

            <div className="items-center text-center text-gray-700 bg-gray-100 rounded-md resize-none mb-9 opacity-80">
              <EditorComponent value={content} onChange={writeContent}/>
            </div>
            <div className='text-slate-100 text-start'>
            <div>주소: {address}</div>
            <div>장소명: {placeName}</div>
            <div>카테고리: {category}</div>
            <div>별점: {rate} </div>
            </div>

            <br></br>
            <br></br>

          <TagList 
          propAddress={searchPlace} propCategory={settingCategory} propRate={settingRating}
          propLat={settingLat} propLng={settingLng} propPlaceName={setPlaceName}
          />
          <Link to='/'>
            <button type='create' onClick={() => {handleCreate()}} className='float-right px-5 py-2 font-bold text-blue-500 border-2 rounded-lg bg-sky-300 border-sky-500 hover:bg-sky-300'>Save</button>
          </Link>
        </div>
        </div>
      
    </>
  )
}

export default ArticleCreatePage