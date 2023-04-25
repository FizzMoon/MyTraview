import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import UserMypage from "./UserInfoPage";
import ReactDOM from 'react-dom/client';
import WrittenArticle from "./WrittenArticle";
import { BsPen } from "react-icons/bs";
import { BiUserCircle, BiLogIn } from "react-icons/bi"
import { AiOutlineHeart } from "react-icons/ai";
import HeartArticle from "./HeartArticle";
import { useAtom } from 'jotai';
import curBoardAtom from './../components/atoms/curBoardAtom';
import NavMyPage from './../components/main/NavMyPage';


const MyPage = () => {

  const [render, setRender] = useState('')
  const [curboard, setCurBoard] = useAtom(curBoardAtom);

  const logOut = () => {
    if(window.confirm("로그아웃 하시겠습니까?")){
    sessionStorage.removeItem("ACCESS_TOKEN")
    window.location.href ="/"
    alert("홈으로 이동합니다.")
    }else{
      alert("취소 되었습니다.")
    }
  }

  const homeFunc = () => {
    window.location.href = "/";
  }

  const menus = [
    { name: "Home", icon: BiUserCircle, margin: true },
    { name: "User-Info", icon: BiUserCircle, margin: true, component: <UserMypage /> },
    { name: "Written", icon: BsPen, margin: true, component: <WrittenArticle /> },
    { name: "Hearts", icon: AiOutlineHeart, margin: true, component: <HeartArticle /> },
    { name: "LogOut", icon: BiLogIn, margin: true }
  ]

  const [open, setOpen] = useState(true)

  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")

  console.log("이메일 " + accessToken);
  useEffect(() => {

    const com = ReactDOM.createRoot(document.getElementById('com'))

    com.render(render)

  }, [render])


  return (
    <>
      {/* {accessToken == null ? <Nav /> : <NavAfter />} */}
      <NavMyPage/>
      <div className="bg-[url('/public/images/sky.jpg')] opacity-80 bg-cover" style={{ height: "100%" }} >
        <br /><br /><br />
        <section className="flex gap-6">
          <div
            className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"
              } duration-500 text-gray-100 px-4`}
          >
            <div className="flex justify-end py-3">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => { setOpen(!open); console.log("테스트"); }}
              />
            </div>
            <div className="relative flex flex-col gap-4 mt-4">
              {menus.map((menu, i) => {
                if(i == 0){
                  return <button
                  onClick={() => { console.log("테스트"); homeFunc() }}
                  key={i}
                  className={` ${menu?.margin && "mt-5"
                    } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${open && "hidden"
                      } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </button>

                }
                //else if(0<i<4)
                else if (i>0&&i<4) {
                  return <button
                    onClick={() => { console.log(i); setRender(menu.component) }}
                    key={i}
                    className={` ${menu?.margin && "mt-5"
                      } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                    >
                      {menu?.name}
                    </h2>
                    <h2
                      className={`${open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      {menu?.name}
                    </h2>
                  </button>
                } else{
                  return <button
                    onClick={() => { logOut() }}
                    key={i}
                    className={` ${menu?.margin && "mt-5"
                      } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                  >
                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                    >
                      {menu?.name}
                    </h2>
                    <h2
                      className={`${open && "hidden"
                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                    >
                      {menu?.name}
                    </h2>
                  </button>
                }
              })}
            </div>
          </div>
          <div className="m-3 text-xl font-semibold text-gray-900">
            <div id="com" className="my-64 ml-80">
            </div>
          </div>

        </section>
      </div>
    </>
  )
}

export default MyPage