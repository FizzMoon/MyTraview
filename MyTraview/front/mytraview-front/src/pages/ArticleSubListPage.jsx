import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { call } from '../api_config/ApiService';
import curBoardAtom from '../components/atoms/curBoardAtom';
import Pagination from '../components/article/Pagination';
import ArticleCreateButton from '../components/main/ArticleCreateButton';
import Nav from './../components/main/Nav';
import NavAfter from './../components/main/NavAfter';


const ArticleSubListPage = () => {

  const [articles, setArticles] = useState([]);
  const [_, setCurBoard] = useAtom(curBoardAtom);
  // const [auth, setAuth] = useAtom(authAtom); 
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  let [postNum, setPostNum] = useState(1)

  const viewCountIncrease = (id) => {
    call(`/article/viewCount?articleId=${id}`, "GET")
      .then((res) => {
        console.log(res);
      })
  } // 조회수 증가함수

  useEffect(() => {
    fetch('http://localhost:8100/article')
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setArticles(response);
      })
      .catch(error => console.error(error))
  }, [])

  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")

  return (
    <>
      {accessToken == null ? <Nav /> : <NavAfter />}
      <div className="bg-[url('/public/images/Palace.jpg')] opacity-80 bg-cover" style={{ height: "100vh" }}>
        <br /><br /><br /><br /><br />
        <div className='px-96'>
          <div className="box-content h-10 py-5 mb-2 ml-4 text-4xl font-bold text-center text-gray-200 border-4 w-60 border-x-transparent">
            Place Name
          </div>

          <div className="box-content h-5 py-5 mb-2 ml-4 text-2xl font-bold text-center text-gray-200 border-4 border-x-transparent w-96">
            Some description of the place
          </div>

          <label className='mx-10 font-extrabold text-gray-300'>
            {/* 페이지 당 표시할 게시물 수 :&nbsp; */}
            <select
              type="number"
              value={limit}
              style={{ font: "bold", color: "white", background: "transparent", position: "end" }}
              onChange={({ target: { value } }) => setLimit(Number(value))}
            >
              <option value="5" className="text-sm font-bold text-right text-neutral-600">5개씩</option>
            </select>
          </label>

          <div className="mt-6 overflow-x-auto">
            <div onClick={() => { console.log(articles) }}></div>
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="rounded-lg text-sm font-medium text-gray-700 text-left text-[0.9674rem]">
                  <th className="px-4 py-2 bg-[#F8F8F8] text-center border">No.</th>
                  <th className="px-4 py-2 bg-[#F8F8F8] text-center border">Title</th>
                  <th className="px-4 py-2 bg-[#F8F8F8] text-center border">Writer</th>
                  <th className="px-4 py-2 bg-[#F8F8F8] text-center border">UploadDate</th>
                  <th className="px-4 py-2 bg-[#F8F8F8] text-center border">Views</th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700 bg-white">
                {articles && articles.slice(offset, offset + limit).map(article => (
                  <tr key={article.id} className="py-10 border-b border-gray-200 hover:bg-gray-100" >

                    <td className="px-4 py-2 text-center border">{postNum++}</td>

                    <td className="px-4 py-2 text-left text-gray-700 border">
                      <Link to="article/:id">
                        <button onClick={() => {
                          setCurBoard(article.id);
                          viewCountIncrease(article.id)
                        }}>{article.title}</button>
                      </Link>
                    </td>

                    <td className="px-4 py-2 text-center border">{article.writer}</td>

                    <td className="px-2 py-2 text-center border">{article.uploadDate}</td>

                    <td className="px-1 py-2 text-center border">{article.viewCount}</td>

                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              total={articles.length}
              limit={limit}
              page={page}
              setPage={setPage}
              className={{ color: "white" }}
            />
            <ArticleCreateButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleSubListPage