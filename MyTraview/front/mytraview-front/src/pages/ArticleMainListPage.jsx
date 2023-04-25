
import { useLocation } from 'react-router-dom'
import MapList from '../components/map/MapList'
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import curBoardAtom from '../components/atoms/curBoardAtom';
import Nav from './../components/main/Nav';
import NavAfter from './../components/main/NavAfter';

const ArticleMainListPage = (props) => {
  const location = useLocation()
  const { from } = location.state
  const areaCode = from.areaCode;
  const [articles, setArticles] = useState([]);
  const [_, setCurBoard] = useAtom(curBoardAtom);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  let [postNum, setPostNum] = useState(1)
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")

  return (
    <>
      {accessToken == null ? <Nav /> : <NavAfter />}
      <div className="bg-[url('/public/images/starSky.jpg')] bg-cover opacity-95" style={{ height: "120vh" }}>
        <br /><br /><br /><br />
        {window.scrollTo(0, 0)}
        <div className='mx-72'>
          <MapList areaCode={areaCode} />
          <div onClick={() => console.log(areaCode)}></div>
        </div>
      </div>
    </>
  )
}

export default ArticleMainListPage