import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
// @ts-ignore
import { Editor } from 'react-draft-wysiwyg';
import './index.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


export default class RichTextEditor extends Component<any, any> {

    constructor(props:any) {
        super(props);
        const detail = this.props.detail
        if (detail){
            const contentBlock = htmlToDraft(detail);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(),
            }
        }
    }

    //获取富文本编辑器里面的内容父组件调用
    getDetail = ()=>{
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }


    onEditorStateChange = (editorState:any) => {
        this.setState({
            editorState,
        });
    };

    uploadCallback = (file:string)=>{
        return new Promise(
            (resolve, reject) => {
                let formData = new FormData()
                formData.append('image', file)
                fetch(`/manage/img/upload`, {
                    method: 'POST',
                    body: formData,
                }).then(res => {
                    return res.json()
                }).then(res => {
                    if (res.status !== 0) {
                        console.log("富文本编辑器中图片上传失败")
                        reject(res)
                    } else {
                        resolve({data: {link: res.data.url}})
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        )
    }

    render() {
        const { editorState } = this.state;
        return (
                <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    editorState={editorState}
                    editorStyle={{minHeight: '200px', border: '1px solid black', paddingLeft: '15px'}}
                    toolbar={{
                        image: {uploadEnabled: true, uploadCallback: this.uploadCallback, urlEnabled: true}
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                />
        );
    }
}