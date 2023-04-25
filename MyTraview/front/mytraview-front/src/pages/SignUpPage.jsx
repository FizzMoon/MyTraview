import React, { useState } from 'react'
import Nav from '../components/main/Nav'
import NavAfter from './../components/main/NavAfter';

const SignUpPage = () => {
  const [email, setEmail] = useState()
  const [name, setName] = useState("")
  const [pw, setPw] = useState("")
  const [confirmpw, setConfirmPw] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState()
  const [emailMessage,setEmailMessage] = useState("")
  const [pwMessage,setPwMessage] = useState("")
  const [confirmpwMessage,setConfirmPwMessage] = useState("")
  const [phoneMessage, setPhoneMessage] = useState("")
  const [joinFlag, setJoinFlag] = useState(true)
  const [duplicateFlag, setDuplicateFlag] = useState(false)

  const onChangeName = (e) => {
    const currentName = e.target.value;
   setName(currentName);
  }


  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail)
    const emailRegex =  /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    
    if(!emailRegex.test(currentEmail)) {
      setEmailMessage('이메일이 형식이 올바르지 않습니다.')
      setJoinFlag(false)
    } else {
      setEmailMessage('사용가능한 이메일입니다.')
      setEmail(currentEmail)
      setJoinFlag(true)
    }
  }

  const onChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw)
    const pwRegex = /^[A-Za-z0-9]{4,12}$/;

    if(!pwRegex.test(currentPw)){
      setPwMessage('비밀번호 형식이 올바르지 않습니다.')
      setJoinFlag(false)
    } else {
      setPwMessage('사용가능한 비밀번호입니다.')
      setPw(currentPw)
      setJoinFlag(true)
    }
  }
  

  const onChangePwConfirm = (e) => {
    const currentPwConfirm = e.target.value;
    if (pw !== currentPwConfirm) {
      setConfirmPwMessage("땡!~ 비밀번호가 일치하지 않습니다.");
      setJoinFlag(false)
    } else {
      setConfirmPwMessage("똑같은 비밀번호를 입력했습니다.");
      setConfirmPw(currentPwConfirm)
      setJoinFlag(true)
    }
  }

  const onChangePhone = (e) => {
    const currentPhone = e.target.value;
    setPhone(currentPhone);
    const phoneRegExp = /^01([0])-?([0-9]{4})-?([0-9]{4})$/;
 
    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다!");
      setJoinFlag(false)

    } else {
      setPhoneMessage("사용 가능한 번호입니다:-)");
      setPhone(currentPhone)
      setJoinFlag(true)
    }
  }

  const checkEmailDuplicate = () => {
    fetch(`http://localhost:8100/user/duplicate?email=${email}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
    .then((res) => {alert(res.resMessage);
      console.log(res);
      if(res.resMessage === "해당 이메일은 사용 가능합니다."){
        setDuplicateFlag(true)
      }else{
        setDuplicateFlag(false)
      }
    })
    .catch((res)=>{
      alert(res.resMessage);
      setDuplicateFlag(false)
    })
  }

  const join = () => {
    if(duplicateFlag&&email&&name&&pw&&confirmpw&&phone&&joinFlag){
      fetch('http://localhost:8100/user/join', {
      
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        email: email,
        pw: pw,
        name: name,
        phone: phone
      })
      
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        alert("회원가입을 환영합니다. 로그인 페이지로 이동합니다~")
        window.location.href = "/sign-in"
      })
      
    }else{
      alert("입력하신 내용을 확인 후 다시 시도해주세요.")
    }
  }


  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")

  return (
    <>
    {accessToken == null ? <Nav /> : <NavAfter />}
    <div className="flex items-center justify-center w-full h-screen p-4 overflow-scroll bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
    <div className="w-full h-auto px-10 py-6 bg-white rounded-3xl sm:max-w-fit">
      <div className="mt-2 mb-12 text-2xl font-semibold text-center sm:text-3xl text-sky-600">
        Welcome to MyTraview
      </div>
      <div className="">
        <div className='flex'>
          <input
            className="w-4/5 pb-1 mt-4 placeholder-gray-400 border-b focus:placeholder-purple-300 focus:outline-none border-sky-400 focus:border-purple-300"
            type="text"
            placeholder="Email"
            onChange={onChangeEmail}
            
          />
          
          {/* 버튼에 투명도 적용 방법?? */}
          <button className="w-1/5 p-1 text-base font-semibold text-white rounded-full bg-opacity-30 bg-gradient-to-r from-sky-600 to-teal-300"
            onClick={checkEmailDuplicate}>
            Check
          </button>

        </div>

        <p className="message"> {emailMessage} </p>

        {/* 간격 띄우는 것 패딩?? 마진?? */}
        {/* 밑줄은 hover focus 둘다 적용은 되는데 둘다 hover효과로 됨 */}
        <div className="">
        <input
            type="text"
            className="w-full pb-1 mt-4 placeholder-gray-400 border-b focus:placeholder-purple-300 focus:outline-none border-sky-400 focus:border-purple-300"
            placeholder="Name"
            onChange={onChangeName}
          />
          <input
            type="password"
            className="w-full pb-1 mt-4 placeholder-gray-400 border-b focus:placeholder-purple-300 border-sky-400 focus:outline-none hover:border-purple-300 "
            placeholder="Password "
            onChange={onChangePw}
          // focus:border-purple-300 밑줄 클릭 시 색 변화
          // focus:outline-purple-300 클릭 시 네모칸의 컬러
          />
          <p className="message"> {pwMessage} </p>
          <input
            type="password"
            className="w-full pb-1 mt-4 placeholder-gray-400 border-b focus:placeholder-purple-300 focus:outline-none border-sky-400 focus:border-purple-300"
            placeholder="Confirm Password "
            onChange={onChangePwConfirm}
          />
          <p className="message"> {confirmpwMessage} </p>
          <input
            type="text"
            className="w-full pb-1 mt-4 placeholder-gray-400 border-b focus:placeholder-purple-300 focus:outline-none border-sky-400 focus:border-purple-300"
            placeholder="Phone "
            onChange={onChangePhone}
          />
          <p className="message"> {phoneMessage} </p>
          <div className='flex my-3'>
          
        
        </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button className="w-full p-3 text-lg font-semibold text-white rounded-full sm:w-56 bg-gradient-to-r from-sky-600 to-teal-300"
            onClick={join}>
            Create Account
          </button>
        </div>

      </div>
    </div>
  </div>
</>
  )
}

export default SignUpPage