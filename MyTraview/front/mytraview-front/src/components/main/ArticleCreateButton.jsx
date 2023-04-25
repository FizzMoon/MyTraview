import React from 'react'
import { Link } from 'react-router-dom'

const ArticleCreateButton = () => {
    return (
        <>
            {/* 글쓰기 버튼 */}
            <div className="fixed right-0 flex items-center justify-end hover:bg-opacity-80 bottom-5 mr-28">
                <Link to="/article">
                    <button
                        type="button"
                        className="px-5 py-2 font-bold bg-black border-2 rounded-lg bg-opacity-90 text-slate-200 border-slate-300 hover:bg-slate-600 hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                        Write Review
                    </button>
                </Link>
            </div>
        </>
    )
}

export default ArticleCreateButton