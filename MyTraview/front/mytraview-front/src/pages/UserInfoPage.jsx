
import { useEffect, useState } from 'react';

const UserInfoPage = () => {
  const [user, setUser] = useState("");
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
  console.log("이메일 " + accessToken);

  const secessionFun = () => {
    window.location.href = "/user/modify";
  }

  useEffect(() => {
    fetch(`http://localhost:8100/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      }
    })
      .then((res) => res.json())
      .then((res) => setUser(res))
  },

    [])

  return (
    <div className='ml-10'>
      <div className='rounded-lg'>
        <div className="px-4 py-2 bg-[#F8F8F8] text-center ">
          이메일
        </div>
        <div className='px-4 py-2 bg-[#F8F8F8] text-center '>

          <input type="text" name="pw" placeholder={user.email} className='h-16 text-center border w-80' />
        </div>
      
      
        <div className="px-4 py-2 bg-[#F8F8F8] text-center ">
          이름
        </div>
        <div className='px-4 py-2 bg-[#F8F8F8] text-center '>
          <input type="text" name="name" placeholder={user.name} className='h-16 text-center border w-80' />
        </div>
      
      
        <div className="px-4 py-2 bg-[#F8F8F8] text-center ">
          핸드폰
        </div>
        <div className="px-4 py-2 bg-[#F8F8F8] text-center ">
          <input type="text" name="phone" placeholder={user.phone} className='h-16 text-center border w-80' />
        </div>
      </div>

      <div className='mt-14 ml-16'>

        <button type='modify' onClick={secessionFun} className='mx-5 px-5 py-2 font-bold text-gray-800 border-2 rounded-lg hover:bg-sky-300'>회원정보 수정</button>
      </div>



    </div>

  )
}

export default UserInfoPage
