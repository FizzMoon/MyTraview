import React from 'react'
import ArticleCreateButton from '../components/main/ArticleCreateButton';
import SinglePage from '../components/main/SinglePage';
import NavMainPage from './../components/main/NavMainPage';
import NavMainPageAfter from './../components/main/NavMainPageAfter';


const MainPage = () => {

  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")

  
  return (
    <>
  {accessToken === null ? <NavMainPage /> : <NavMainPageAfter />}
    <SinglePage />
    {accessToken === null ? <></> : <ArticleCreateButton />}
    </>
  )
}

export default MainPage