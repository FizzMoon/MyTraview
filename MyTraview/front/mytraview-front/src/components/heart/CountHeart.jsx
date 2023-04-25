import React, { useEffect, useState } from 'react'
import ColouredHeartImg from "../assets/coloured_heart.png"
import VacantHeartImg from "../assets/empty_heart.png"
import { call } from '../../api_config/ApiService'
import { useParams } from 'react-router-dom';


const CountHeart = (props) => {

    const [heartCount, setHeartCount] = useState("")
    const [curBoard, setCurBoard] = useState(props.articleId)
    const [heartFlag, setHeartFlag] = useState(false)
    const params = useParams();

    const flagHandler = () => {
        setHeartFlag(!heartFlag);
    }

    const heartHandler = () => {

        if (heartFlag === true) {
            setHeartCount((res) => res - 1)
            flagHandler()
            const req = {
                articleId: curBoard
            }
            call(`/heart`, 'DELETE', req)
                .then((res) => {
                    { console.log("좋아요 취소"); }
                })
                .then((res) => {
                    console.log(res);
                })
        } else {
            setHeartCount((res) => res + 1)
            flagHandler()
            const req = {
                articleId: curBoard,
                flag: true
            }
            call("/heart", "POST", req)
                .then((res) => { setHeartFlag(res.flag); console.log("현재 heartFlag 값" + heartFlag); })
                .catch((res) => { console.log(res); })
        }
    }

    useEffect(() => {
        call(`/heart/article=${params.id}`, 'GET')
            .then((res) => { setHeartFlag(res.flag); console.log(res) })
            .catch((res) => { console.log(res); })
    }, [])

    useEffect(() => {
        call(`/heart/count/article=${curBoard}`, 'GET')
            .then((res) => { setHeartCount(res.articleId); console.log(res) })
            .catch((res) => { console.log(res); })
    }, [])

    return (

        <div className='flex'>
            <button onClick={heartHandler} className='object-scale-down w-4 h-4 pt-[5px] mx-2 my-2'>
                <img src={heartFlag === true ? ColouredHeartImg : VacantHeartImg} />
            </button>
            <div className='my-2 mr-2 text-gray-300'>({heartCount})</div>
        </div>

    )
}

export default CountHeart
