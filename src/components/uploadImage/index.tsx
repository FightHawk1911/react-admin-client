import React from "react";
import { Upload, Modal, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeletePicture} from "../../api";
import {IMG_URL} from "../../utils/constants";

function getBase64(file:any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends React.Component<any,any> {


    constructor(props:any) {
        super(props);
        let fileList: any = []
        if (this.props.imgs && this.props.imgs.length > 0) {
            fileList = this.props.imgs.map((file: any, index: number) => ({
                name: file,
                uid: -index,
                status: 'done',
                url: IMG_URL + file
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: fileList,
        }
    }




    getImgs =()=>{
        return this.state.fileList.map((file:any)=>file.name)
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file:any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    // @ts-ignore
    handleChange = async ({ file, fileList }) => {
        if (file.status === 'done') {
            //上传完毕
            const result = file.response
            fileList[fileList.length-1].name = result.data.name
            fileList[fileList.length-1].url = result.data.url
            message.success("上传图片成功")
        } else if (file.status === 'removed') {
            //删除图片
            const result = await reqDeletePicture(file.name)
            if (result.data.status === 0){
                message.success("删除图片成功")
            } else {
                message.error("删除图片失败")
            }
        } else if (file.status === 'error') {
            message.error("图片上传失败")
        }
        this.setState({ fileList })
    } ;

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        return (
            <>
                <Upload
                    action="/manage/img/upload"
                    accept="image/*"
                    listType="picture-card"
                    name='image'
                    // @ts-ignore
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
