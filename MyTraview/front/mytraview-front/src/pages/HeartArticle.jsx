import React, { useEffect, useState } from 'react'
import { call } from '../api_config/ApiService'
import Pagination from '../components/article/Pagination'
import { useAtom } from 'jotai';
import curBoardAtom from '../components/atoms/curBoardAtom';

const HeartArticle = () => {

  const [articles, setArticles] = useState("")
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [curboard, setCurBoard] = useAtom(curBoardAtom);

  const offset = (page - 1) * limit;
  let [postNum, setPostNum] = useState(1)

  useEffect(() => {
    call(`/user/hearts`, 'GET')
      .then((res) => { setArticles(res); console.log(res); })
      .catch((res) => { console.log(res); })
  }, [])
  return (
    <div className="mx-20 mt-6 overflow-x-auto w-[600px]">
      
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
        <tbody className="text-sm font-normal text-gray-700">
          {articles && articles.slice(offset, offset + limit).map(article => (
            <tr key={article.id} className="py-10 border-b border-gray-200 hover:bg-gray-100 bg-slate-100" >
              <td className="px-4 py-2 text-center border">{postNum++}</td>
              <td className="px-4 py-2 text-center border" >{article.title}</td>
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
    </div>
  )
}

export default HeartArticle