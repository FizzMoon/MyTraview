import { useAtom } from 'jotai'
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import authAtom from '../stores/authAtom';
import Nav from '../components/main/Nav';
import NavAfter from './../components/main/NavAfter';

const eye = <FontAwesomeIcon icon={faEye} />
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />


const SignInPage = () => {
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [auth,setAuth] = useAtom(authAtom)
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity1 = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const ChangeEmail = e => {
    setEmail(e.target.value)
  }

  const ChangePw = e => {
    setPw(e.target.value)
  }

  const goToHome =  () => {

    if (email === "" && pw === "") {
        alert("이메일과 패스워드를 꼭 입력해주세요.")
    } else if (email === "") {
        alert("이메일을 입력해주세요.")
    } else if (pw === "") {
        alert("비밀번호 확인을 입력해주세요.")
    }  
    else {

    fetch('http://localhost:8100/user/login', {

      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        pw: pw,
      }),
    })
      .then(res => res.json())
      .then((res) => {

        if(res.status===500){
          alert("이메일 및 패스워드를 다시 확인해주세요.")
        }
        if(res.token) {
            sessionStorage.setItem("ACCESS_TOKEN", res.token)
            setAuth({token : sessionStorage.getItem("ACCESS-TOKEN"), 
            email: res.email,
            name : res.name,
            phone: res.phone,
            role: res.role
         });
         alert("환영합니다.")
         window.location.href = "/";
        }
        console.log(res);
      })
      .catch((err) => {
        console.log("login() error");
        console.log(err);

        alert(err);

        const res = err.response;
        if(res.status == 500 || res.status == 400) {
            alert(" 이메일 및 비밀번호를 다시 확인해주세요.");
        }
      });

    }
  }


  const accessToken = sessionStorage.getItem("ACCESS_TOKEN")

  return (
    <>
    {accessToken == null ? <Nav /> : <NavAfter />}
    <div className="flex items-center justify-center w-full h-screen p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <div className="w-full my-2 md:w-3/5 lg:w-2/5">
                <div className="flex items-center justify-center mt-10 mb-20">
                    <svg version="1.1" id="Capa_2" width="100px" height="100px" stroke="red" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 480 480" style={{ enableBackground: 'new 0 0 480 480' }} xmlSpace="preserve">
                        <path d="M240,0C107.664,0,0,107.664,0,240c0,57.96,20.656,111.184,54.992,152.704c0.088,0.12,0.096,0.272,0.192,0.384
        c24.792,29.896,55.928,52.816,90.624,67.624c0.4,0.168,0.792,0.352,1.192,0.52c2.808,1.184,5.648,2.28,8.496,3.352
        c1.12,0.424,2.24,0.856,3.376,1.264c2.456,0.88,4.928,1.712,7.416,2.512c1.592,0.512,3.184,1.016,4.792,1.496
        c2.2,0.656,4.408,1.288,6.632,1.888c1.952,0.528,3.92,1.016,5.888,1.488c1.992,0.48,3.992,0.96,6,1.384
        c2.24,0.48,4.504,0.904,6.776,1.32c1.824,0.336,3.64,0.688,5.48,0.984c2.52,0.408,5.056,0.728,7.6,1.056
        c1.64,0.208,3.272,0.448,4.92,0.624c2.88,0.304,5.784,0.52,8.696,0.72c1.352,0.096,2.696,0.24,4.056,0.312
        c4.248,0.24,8.544,0.368,12.872,0.368s8.624-0.128,12.888-0.352c1.36-0.072,2.704-0.216,4.056-0.312
        c2.912-0.208,5.816-0.416,8.696-0.72c1.648-0.176,3.28-0.416,4.92-0.624c2.544-0.328,5.08-0.648,7.6-1.056
        c1.832-0.296,3.656-0.648,5.48-0.984c2.264-0.416,4.528-0.84,6.776-1.32c2.008-0.432,4-0.904,6-1.384
        c1.968-0.48,3.936-0.968,5.888-1.488c2.224-0.592,4.432-1.232,6.632-1.888c1.608-0.48,3.2-0.984,4.792-1.496
        c2.488-0.8,4.96-1.632,7.416-2.512c1.128-0.408,2.248-0.84,3.376-1.264c2.856-1.072,5.688-2.176,8.496-3.352
        c0.4-0.168,0.792-0.352,1.192-0.52c34.688-14.808,65.832-37.728,90.624-67.624c0.096-0.112,0.104-0.272,0.192-0.384
        C459.344,351.184,480,297.96,480,240C480,107.664,372.336,0,240,0z M337.256,441.76c-0.12,0.056-0.232,0.12-0.352,0.176
        c-2.856,1.376-5.76,2.672-8.688,3.936c-0.664,0.28-1.32,0.568-1.984,0.848c-2.56,1.072-5.152,2.088-7.76,3.064
        c-1.088,0.408-2.176,0.808-3.272,1.192c-2.312,0.824-4.632,1.616-6.976,2.368c-1.456,0.464-2.92,0.904-4.384,1.336
        c-2.08,0.624-4.168,1.224-6.28,1.784c-1.776,0.472-3.568,0.904-5.36,1.328c-1.88,0.448-3.752,0.904-5.648,1.304
        c-2.072,0.44-4.16,0.816-6.24,1.192c-1.688,0.312-3.368,0.64-5.072,0.912c-2.344,0.368-4.712,0.664-7.072,0.96
        c-1.496,0.192-2.984,0.416-4.496,0.576c-2.696,0.288-5.416,0.472-8.128,0.664c-1.208,0.08-2.408,0.216-3.632,0.28
        c-3.96,0.208-7.928,0.32-11.912,0.32s-7.952-0.112-11.904-0.32c-1.216-0.064-2.416-0.192-3.632-0.28
        c-2.72-0.184-5.432-0.376-8.128-0.664c-1.512-0.16-3-0.384-4.496-0.576c-2.36-0.296-4.728-0.592-7.072-0.96
        c-1.704-0.272-3.384-0.6-5.072-0.912c-2.088-0.376-4.176-0.76-6.24-1.192c-1.896-0.4-3.776-0.856-5.648-1.304
        c-1.792-0.432-3.584-0.856-5.36-1.328c-2.104-0.56-4.2-1.168-6.28-1.784c-1.464-0.432-2.928-0.872-4.384-1.336
        c-2.344-0.752-4.672-1.544-6.976-2.368c-1.096-0.392-2.184-0.792-3.272-1.192c-2.608-0.976-5.2-1.992-7.76-3.064
        c-0.664-0.272-1.312-0.56-1.976-0.84c-2.928-1.256-5.832-2.56-8.696-3.936c-0.12-0.056-0.232-0.112-0.352-0.176
        c-27.912-13.504-52.568-32.672-72.576-55.952c15.464-56.944,59.24-102.848,115.56-121.112c1.112,0.68,2.272,1.288,3.416,1.928
        c0.672,0.376,1.336,0.776,2.016,1.136c2.384,1.264,4.8,2.448,7.272,3.512c1.896,0.832,3.856,1.536,5.808,2.256
        c0.384,0.136,0.768,0.288,1.152,0.424c10.848,3.84,22.456,6.04,34.6,6.04s23.752-2.2,34.592-6.04
        c0.384-0.136,0.768-0.288,1.152-0.424c1.952-0.72,3.912-1.424,5.808-2.256c2.472-1.064,4.888-2.248,7.272-3.512
        c0.68-0.368,1.344-0.76,2.016-1.136c1.144-0.64,2.312-1.248,3.432-1.936c56.32,18.272,100.088,64.176,115.56,121.112
        C389.824,409.08,365.168,428.248,337.256,441.76z M152,176c0-48.52,39.48-88,88-88s88,39.48,88,88
        c0,30.864-16.008,58.024-40.128,73.736c-3.152,2.048-6.432,3.88-9.8,5.48c-0.4,0.192-0.792,0.392-1.192,0.576
        c-23.168,10.536-50.592,10.536-73.76,0c-0.4-0.184-0.8-0.384-1.192-0.576c-3.376-1.6-6.648-3.432-9.8-5.48
        C168.008,234.024,152,206.864,152,176z M421.832,370.584c-18.136-53.552-59.512-96.832-112.376-117.392
        C330.6,234.144,344,206.64,344,176c0-57.344-46.656-104-104-104s-104,46.656-104,104c0,30.64,13.4,58.144,34.552,77.192
        c-52.864,20.568-94.24,63.84-112.376,117.392C31.672,333.792,16,288.704,16,240C16,116.488,116.488,16,240,16s224,100.488,224,224
        C464,288.704,448.328,333.792,421.832,370.584z" />
                    </svg>
                </div>

                <div className="px-10 py-6 bg-opacity-0 md:pl-8 rounded-2xl">
                    <div className="flex mx-1 my-8 border-b-2 border-sky-400 md:mx-2 hover:border-purple-300">
                        <label className="self-center text-gray-700 w-28" >Email :</label>
                        <input className="w-full py-3 pl-2 bg-transparent border-0 placeholder-slate-400 focus:placeholder-transparent md:pl-6 focus:outline-none" type="text" name="email" placeholder="이메일을 입력하세요" onChange={ChangeEmail} autoComplete="on" required />
                    </div>

                    <div className="flex mx-4 my-8 border-b-2 border-sky-400 md:mx-2 hover:border-purple-300">
                        <label className="self-center text-gray-700 w-28">Password :</label>
                        <input className="w-full py-3 pl-2 bg-transparent border-0 placeholder-slate-400 focus:placeholder-transparent md:pl-6 focus:outline-none" input type={passwordShown ? "text" : "password"}  name="pw" placeholder="비밀번호를 재입력하세요" onChange={ChangePw} required />
                        <i onClick={togglePasswordVisiblity1}>{passwordShown===true ? eye : eyeSlash }</i>
                    </div>
                </div>
                
                <div className='pt-[13px]'>
                    <button className='w-full p-2 text-lg font-semibold text-white rounded-full md:pl-8 border-y-4 focus:outline-none bg-gradient-to-r from-sky-600 to-teal-300'
                        type="submit"
                        onClick={goToHome}>
                        Login
                    </button>
                </div>

            </div>
        </div>
        </>
        )
}
export default SignInPage