import './index.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticleCreatePage from './pages/ArticleCreatePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ArticleUpdatePage from './pages/ArticleUpdatePage';
import ArticleMainListPage from './pages/ArticleMainListPage';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import ViewAllArticles from './pages/ViewAllArticles';
import UserUpdateMyPage from './pages/UserUpdateMyPage';
import SignInPage from './pages/SignInPage';
import MyPage from './pages/MyPage';
import UserInfoPage from './pages/UserInfoPage';



function App() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
        
          {/* 유저 관련 */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/user/info" element={<UserInfoPage />} />
          <Route path="/user/modify" element={<UserUpdateMyPage />} />

          {/* 게시판 확인용 */}
          <Route path="/article/:id" element={<ArticleDetailPage />} />

          {/* 게시판 관련 */}
          <Route path="/articles" element={<ViewAllArticles />} />
          <Route path="/articles/area/:areaCode" element={<ArticleMainListPage />} />
          <Route path="/article" element={<ArticleCreatePage />} />
          <Route path="/article/modify" element={<ArticleUpdatePage />} />
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
