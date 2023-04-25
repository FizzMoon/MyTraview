import { BorderAllRounded } from '@mui/icons-material';
import { blue, yellow } from '@mui/material/colors';
import ImageResize from 'quill-image-resize';
import ImageUploader from "quill-image-uploader";
import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

Quill.register("modules/ImageUploader", ImageUploader);
Quill.register("modules/ImageResize", ImageResize);

const requirementAnnouncement =
`공지사항
1. 태그는 '먹거리, 숙박, 교통, 레저, 관광지, 테마별 코스' 6가지 중에 선택해야 합니다.

2. 한 게시글에서 리뷰한 장소가 여러 곳일 경우, 리뷰한 장소 수 만큼 태그를 추가해야 합니다.
    예) '서울 신촌닭발 구로점, 서울 신라호텔 강남점, 서울 스타벅스 강남점' 에 대해 리뷰를 올렸다면,
        태그는 3개가 됩니다.

위 사항들은 다른 분들이 각 장소별로 리뷰를 찾아보기 쉽게 하기 위함이므로,
많은 협조 부탁드립니다. ^^ `;

class EditorComponent extends Component{
    constructor(props){
        super(props);
    }

    modules = {
        toolbar: [
          //[{ 'font': [] }],
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['clean']
        ],

        ImageResize: { // 이미지 사이즈 조절 모듈
          parchment: Quill.import('parchment')
        },
    
        ImageUploader: { // 이미지 업로더 모듈
          upload: (file) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("image", file);
    
              fetch(
                "https://api.imgbb.com/1/upload?key=e7c6109cd7eeeac12792bb7386960ec6",
                {
                  method: "POST",
                  body: formData,
                }
              )
                .then((response) => response.json())
                .then((result) => {
                  console.log(result);
                  resolve(result.data.url);
                })
                .catch((error) => {
                  reject("Upload failed");
                  console.error("Error:", error);
                });
            });
          },
        },
      }
    
      formats = [
        'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',        
      ]

    render(){
        const { value, onChange } = this.props;
        return(
            <div style={{height: "650px"}}>
                <ReactQuill
                    style={{height: "581px"}} 
                    theme="snow" 
                    modules={this.modules} 
                    formats={this.formats} 
                    value={value || ''}
                    placeholder={requirementAnnouncement}
                    onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
            </div>
        )
    }
}
export default EditorComponent