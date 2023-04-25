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

const SubComment = (props) => {

  const [content, setContent] = useState(props.content);
  const [commentId, setCommentId] = useState(props.commentId);

  function closeModal() {
    setIsOpen(false)
    props.flagController(!props.flag)
  }

  function openModal() {
    setIsOpen(true)
  }

  let [isOpen, setIsOpen] = useState(props.isOpen)

  const createReplyComment = () => {
    
    const req = {
      parentId: commentId,
      content: content
    }

    call("/comment/reply", "POST",req)
    .then((res) => {console.log(res);})
    .catch((res) => {console.log(res)})

  }

  const updateContent = () => {
    
    const req = {
      parentId: commentId,
      content: content
    }
    
    call("/comment", "PUT", req)
    .then((res)=>{
      console.log(res);
    })
    .catch((res)=>
    {
      console.log(res);
    })
  }

  const deleteContent = (idOfComment) => {
    const req = {
      id: idOfComment,
      writer: "Alex"
    }

    call("/comment","DELETE", req)
    .then((res)=>{
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    })

  }

  return (
    <>
        <button
          type="button"
          onClick={openModal}
          className="px-2 py-2 text-sm font-medium text-white bg-black border-2 rounded-md bg-opacity-80 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          답글
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
                    답글 달기
                  </Dialog.Title>
                  <div className="mt-2">
                    <input type="text" onChange={(e)=>{setContent(e.target.value)}}/>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {createReplyComment(); closeModal()}}
                    >
                      작성
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {deleteContent(commentId);  closeModal()}}
                    >
                      취소
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SubComment