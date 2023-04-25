
import { atom } from 'jotai'

// const authAtom = atom(기본값);
const authAtom = atom({ // atom 생성
    token: null, // 토큰을 보관할 프로퍼티
    phone: null,
    name :null,
    email :null,
    role :null,
}); //기본값으로 객체를 작성

export default authAtom;