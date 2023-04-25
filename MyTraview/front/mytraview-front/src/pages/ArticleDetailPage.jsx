import { useAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { call } from '../api_config/ApiService'
import curBoardAtom from '../components/atoms/curBoardAtom'
import Modify from '../components/comment/Modify'
import SubComment from '../components/comment/SubComment'
import CountHeart from '../components/heart/CountHeart'
import Nav from '../components/main/Nav'
import NavAfter from './../components/main/NavAfter';

const ArticleDetailPage = () => {
    const location = useLocation();
    const [article, setArticle] = useState('')
    const [curBoard, setCurBoard] = useAtom(curBoardAtom);
    const [comments, setComments] = useState('');
    const [commentContent, setCommentContent] = useState("")
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const checkUser = useRef('');
    const params = useParams();

    const writeComment = (e) => {
        setCommentContent(e.target.value);
    }

    const flagController = (flag) => {
        setFlag2(flag);
    }

    const commentCreate = () => {
        if (commentContent === '' || commentContent === null) {
            return alert("내용을 입력해주세요.")
        }
        const req = {
            articleId: params.id,
            content: commentContent,
        }

        console.log("댓글을 다는 현재 게시글의 번호:" + curBoard);

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(req)
        };

        fetch('http://localhost:8100/comment', options)
            .then(response => response.json())
            .then((res) => {
                console.log(res);
            })
            .catch(error => console.error('실패', error));
        console.log("handleDetail clicked button")

    } // 댓글 컴포넌트

    useEffect(() => {
        if (location.state) {
            setCurBoard(location.state.id)
            console.log(curBoard);
        }
        fetch(`http://localhost:8100/article/${params.id}`)
            .then(response => response.json())
            .then(response => {
                setArticle(response)
                setComments(response.comments)
                if (flag === false) {
                    setFlag(!flag)
                }
                if (flag2 === false) {
                    setFlag2(!flag2)
                }
            })
            .catch(error => console.error(error))
    }
        , [flag, flag2])


    useEffect(() => {
        const req = {
            id: params.id
        }
        call("/article/writer", "POST", req)
            .then((res) => {
                if (res.flag === true) {
                    checkUser.current = res.flag; console.log(checkUser);
                } else {
                    checkUser.current = res.flag; console.log(checkUser);
                }
            })
            .catch((res) => console.log("체크"))
    }, [])


    let [isOpen, setIsOpen] = useState(false)


    const accessToken = sessionStorage.getItem("ACCESS_TOKEN")


    return (
        <>
            {accessToken == null ? <Nav /> : <NavAfter />}
            <div className="bg-[url('/public/images/lightHouse.jpg')] opacity-80 bg-cover" style={{ height: "100vh" }}>
                <br /><br /><br /><br /><br />
                <div className='max-w-2xl px-6 py-10 m-auto bg-transparent border-2 rounded-md'>

                    <div className="mb-2 text-2xl font-bold text-center text-gray-300 border-4">
                        제목
                        <div className="w-full py-4 text-sm text-left text-gray-300 border-t-4 px-30">
                            {article.title}
                        </div>
                    </div>
                    <div className='font-semibold border- text-amber-700'>
                        작성일자
                        <span className="px-2 py-4 text-sm font-light text-center text-gray-300">{article.uploadDate}</span>
                        조회수
                        <span className='px-2 py-4 text-sm font-light text-center text-gray-300'>{"" + article.viewCount}</span>
                        작성자
                        <span className="px-2 py-4 text-sm font-light text-center text-gray-300">{"" + article.writer}</span>
                    </div>
                    {article.places === null ?
                        <></> :
                        article.places && article.places.map(place => (
                            <div>
                                <div className='font-semibold border- text-amber-700'>
                                    지역:
                                    <span className="px-2 py-4 text-sm font-light text-center text-gray-300">{article.places[0].areaCode}</span>
                                </div>
                                <div className='font-semibold border- text-amber-700'>
                                    장소명:
                                    <span className="px-2 py-4 text-sm font-light text-center text-gray-300">{article.places[0].placeName}</span>
                                </div>
                                <div className='font-semibold border- text-amber-700'>
                                    별점:
                                    <span className="px-2 py-4 text-sm font-light text-center text-gray-300">{article.places[0].rating}</span>
                                </div>

                                <div className='font-semibold border- text-amber-700'>
                                    카테고리:
                                    <span className="px-2 py-4 text-sm font-light text-center text-gray-300">{article.places[0].category}</span>
                                </div>
                            </div>
                        ))
                    }

                    <div className="mb-2 text-2xl font-bold text-center text-gray-300 border-b-4 my-5">
                        내용
                    </div>
                    <div className="items-center w-full h-full bg-gray-100 border-4 rounded-md resize-none mb-9" >

                        {/* html 강제 적용 컴포넌트 */}
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>

                    {/* 좋아요 */}
                    <CountHeart articleId={curBoard} />

                    {/* 댓글창 */}
                    <div className="mb-6">
                        <input name="message" placeholder="댓글입력" onChange={writeComment} className="resize-none focus:outline-none w-full rounded-lg p-2 text-[20px] bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400" />
                        <div className="flex justify-between mt-2">
                            <button type="submit" onClick={() => { commentCreate(); setFlag(!flag); }} className="flex items-center float-right px-4 py-2 text-sm text-white bg-blue-600 rounded-md shadow-lg">댓글 작성
                                <svg className="ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </div>

                    {/* 댓글창 시작*/}
                    <table className="w-full border-collapse table-auto">
                        <thead>
                            <tr>
                                <td className='pl-2 w-1/5 text-center text-gray-600'>작성자</td>
                                <td className='pl-2 w-3/5 text-center text-gray-600'>내용</td>
                                <td className='pl-2 w-1/5 text-center text-gray-600'></td>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-normal text-left text-gray-100">
                            {comments.replyComments === null ?
                                comments && comments.map(comment => (
                                    <tr key={comment.id} className="text-center py-20 border-opacity-10 border-b-2 border-gray-200 bg-gray-100 hover:bg-[#8ab4e97d]">
                                        <td className="pl-2 text-gray-600 text-center">{comment.writer}</td>
                                        <td id={comment.id} className="py-4 pl-2 text-center text-gray-600">{comment.content}</td>
                                        <td>
                                            <td><SubComment isOpen={isOpen} content={comment.content} commentId={comment.id} flagController={flagController} flag={flag2} /></td>
                                            <td><Modify isOpen={isOpen} content={comment.content} commentId={comment.id} flagController={flagController} flag={flag2} /></td>
                                        </td>
                                    </tr>
                                )
                                ) :
                                comments && comments.map(comment => (
                                    <>
                                        <tr key={comment.id} className=" text-center py-20 bg-gray-100 hover:bg-[#8ab4e97d]">
                                            <td className="pl-2 text-gray-600 text-center border-solid border-black border-2">{comment.writer}</td>
                                            <td id={comment.id} className="py-4 pl-2 text-center text-gray-600 border-solid border-black border-2 ">{comment.content}</td>
                                            <td className=' border-solid border-black border-2'>
                                                <SubComment isOpen={isOpen} content={comment.content} commentId={comment.id} flagController={flagController} flag={flag2} />
                                                <Modify isOpen={isOpen} content={comment.content} commentId={comment.id} flagController={flagController} flag={flag2} />
                                            </td>
                                        </tr>
                                        {comment.replyComments && comment.replyComments.map(reply => (
                                            <tr key={reply.id}>
                                                <td className='bg-transparent'>
                                                </td>
                                                <td className='bg-slate-100 hover:bg-[#8ab4e97d] border-solid border-black border-2'>
                                                    <td className="pl-2 text-gray-600 text-start w-2/7"> ↳    {reply.writer}</td>
                                                    <td id={reply.id} className="py-4 pl-2 pr-16 text-right w-5/7 text-gray-600">{reply.content}</td>
                                                    <td className='w-0'></td>
                                                </td>
                                                <td className='bg-slate-100 hover:bg-[#8ab4e97d] border-solid border-black border-2'>
                                                    <td className='w-1/5'></td>
                                                    <td className='w-2/5'><Modify isOpen={isOpen} content={reply.content} commentId={reply.id} flagController={flagController} flag={flag2} /></td>
                                                    <td className='w-1/5'></td>
                                                </td>

                                            </tr>
                                        ))}
                                    </>

                                ))
                            }
                        </tbody>
                    </table>

                    {/* 댓글창 끝 */}
                    {checkUser.current === true ?
                        <div className='mt-5'>
                            <Link to='/article/modify'>
                                <button type='modify'
                                    className='px-5 py-2 mx-3 font-bold border-2 rounded-lg text-neutral-300 hover:bg-neutral-200 '
                                    onClick={() => { setCurBoard(params.id) }}>
                                    수정
                                </button>
                            </Link>
                        </div> :
                        <></>

                    }
                </div>
            </div>

        </>
    )
}

export default ArticleDetailPage