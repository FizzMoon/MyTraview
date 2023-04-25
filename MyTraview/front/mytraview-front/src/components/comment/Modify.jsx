import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Fragment, useState } from "react";
import Map from '../map/Map';
import { Dialog, Transition } from '@headlessui/react';
import LandingPage from '../map/LandingPage';
import { call } from '../../api_config/ApiService';
// import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Modify = (props) => {

  const [content, setContent] = useState(props.content);
  const [commentId, setCommentId] = useState(props.commentId);
  // const [flag, setFlag] = useState(false);
  

  // const [size, setSize] = useState(null);
  // const [rows, setRows] = useState([]);
  // const handleOpen = (value) => setSize(value);

  // function handleTagAdd() {
  //   setRows(...rows, createData('Eclair', 262, 16.0, 24, 6.0))
  // }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  let [isOpen, setIsOpen] = useState(props.isOpen)

  const updateContent = (idOfComment) => {
    if(window.confirm("정말로 수정하시겠습니까?")){
    const req = {
      id: idOfComment,
      content: content
    }
    
    call("/comment", "PUT", req)
    .then((res)=>{
      console.log(res); alert(res.resMessage)
    })
    .catch((res)=>
    {
      console.log(res); alert(res.resMessage)
    })
  }else{
    alert("내용을 다시 한 번 확인해주세요.")
  }
  }

  const deleteContent = (idOfComment) => {
    if(window.confirm("정말로 삭제하시겠습니까?")){
    const req = {
      id: idOfComment,
    }

    call("/comment","DELETE", req)
    .then((res)=>{
      console.log(res); alert(res.resMessage)
    })
    .catch((res) => {
      console.log(res); alert(res.resMessage)
    })
  }else{
    alert("취소되었습니다.")
  }
  }

  return (
    <>
      
        <button
          type="button"
          onClick={openModal}
          className="px-2 py-2 text-sm font-medium text-white bg-black border-2 rounded-md bg-opacity-80 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          수정
        </button>
  

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-full p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    댓글 수정
                  </Dialog.Title>
                  <div className="mt-2">
                    <input type="text" value={content} onChange={(e)=>{setContent(e.target.value)}}/>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {updateContent(commentId); closeModal()}}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {deleteContent(commentId);  closeModal()}}
                    >
                      삭제
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>주소</TableCell>
              <TableCell align="right">업체명</TableCell>
              <TableCell align="right">별점</TableCell>
              <TableCell align="right">카테고리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      {/* <Fragment>

        <div className="flex justify-center gap-3">
          <button onClick={() => handleOpen("xl")} variant="gradient">
            태그 추가하기
          </button>
        </div>
        <Dialog

          open={
            size === "xs" ||
            size === "sm" ||
            size === "md" ||
            size === "lg" ||
            size === "xl" ||
            size === "xxl"
          }
          size={size || "md"}
          handler={handleOpen}
        >
          <DialogTitle>장소 찾기?</DialogTitle>
          <div>검색</div>
          <DialogContent>
            <div style={{ margin: "0 auto" }}>
              <Map />
            </div>
          </DialogContent>
          <DialogActions>
            <button
              variant="text"
              color="red"
              onClick={() => handleOpen(null)}
              className="mr-1"
            >
              <span>Cancel</span>
            </button>
            <button
              variant="gradient"
              color="green"
              onClick={() => handleTagAdd()}
            >
              <span>Confirm</span>
            </button>
          </DialogActions>
        </Dialog>
      </Fragment> */}
    </>
  );
}

export default Modify