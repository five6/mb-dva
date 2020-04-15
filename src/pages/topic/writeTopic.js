import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Upload, Icon, Radio, Tabs, Typography, Row, message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import ReactQuill from 'react-quill';
import { uploadFile } from '@/services/users';
import router from 'umi/router';
import Quill from 'quill'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import QuillEmoji from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.css';
import { common_file_url } from '@/utils/api.prefix';
import { getToken } from '@/services/authorityService';
import { getLoginUserInfo } from '@/utils/authority';
import * as _ from 'lodash';

const FormItem = Form.Item;
const { TextArea } = Input;

class WriteTopic extends Component{

  state={
    titleImageUrl: '',
    topicContent: '',
    topicName: '',
    topicType: 'share',
    topicLevel: 'public'
  }

  componentWillMount() {
    const userInfo = getLoginUserInfo();
    if(!userInfo) {
      router.push('/login');
    }
  }

  componentDidMount() {
    Quill.register({
    'modules/emoji-toolbar': QuillEmoji.ToolbarEmoji,
    'modules/emoji-shortname': QuillEmoji.ShortNameEmoji
    })

  }

  getBase64 =(img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = (file) => {
    const isImg = _.startsWith(file.type, 'image/');
    if (! isImg) {
      message.error('你只能够上传图片文件');
    }
    // 文件不超过5M
    const isLt2M = file.size / 1024 / 1024 <= 2;
    if (!isLt2M) {
      message.error('图片不能大于2M');
    }
    return isImg && isLt2M;
  }

  handleTitleImageChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, titleImageUrl =>
        this.setState({
          titleImageUrl,
          loading: false,
        }),
      );
    }
  };

  onSuccess = (ret) => {
    this.setState({
      titleImageUrl: common_file_url.replace('{id}', ret && ret[0] && ret[0].id),
      loading: false,
    })
  }

  onTitleChange = (e) => {
    this.setState({
      topicName: _.trim(e.target.value)
    })
  }

  onContentChange = (content) => {
    this.setState({
      topicContent: content
    })
  }

  onTypeChange = e => {
    this.setState({
      topicType: e.target.value,
    });
  };

  onLevelChange = (e) => {
    this.setState({
      topicLevel: e.target.value,
    });
  }


  onSubmit = () => {
    const { dispatch } = this.props;
    const {topicName, titleImageUrl, topicContent, topicType, topicLevel } = this.state;
    if(!topicName) {
      message.info('请输入标题！');
      return;
    }
    if(!_.trim(topicContent).length) {
      message.info('请输入正文！');
      return;
    }
    dispatch({
      type: 'topic/createTopic',
      payload: {
        title: topicName,
        title_image: titleImageUrl,
        type: topicType,
        content: topicContent,
        level: topicLevel,
      },
      callback(res) {
        router.push('/');
      }
    })
  }


  imageHandler = () => {
      this.quillEditor = this.quillRef.getEditor()
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()
      input.onchange = async () => {
        const file = input.files[0];
        const isLt2M = file.size / 1024 / 1024 <= 2;
        if (!isLt2M) {
          message.error('图片不能大于2M');
          return;
        }
        const formData = new FormData();
        formData.append('file', file);
        const res = await uploadFile(formData);
        const range = this.quillEditor.getSelection();
        const link = common_file_url.replace('{id}', res &&res[0] &&res[0].id);
        // this part the image is inserted
        // by 'image' option below, you just have to put src(link) of img here.
        this.quillEditor.insertEmbed(range.index, 'image', link);
      }
    }

  render() {
    const { titleImageUrl } = this.state;

    const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">{formatMessage({id: 'common.add.title_image'})}</div>
        </div>
      );


    return(
        <div className="WriteIndexLayout">
            <div className="ColumnPageHeader-Wrapper">
                <div>
                    <div className="Sticky ColumnPageHeader">
                        <div className="ColumnPageHeader-content">
                            <a href="/">
                                博客
                            </a>
                            <i className="ColumnPageHeader-Line" />
                            <div className="ColumnPageHeader-Title">
                                <div className="WriteIndex-pageTitleWrapper">
                                    <div className="WriteIndex-pageTitle">
                                        写文章
                                    </div>
                                    <div className="WriteIndex-pageSubTitle"></div>
                                </div>
                            </div>
                            <div className="ColumnPageHeader-Button">
                                <div className="PublishPanel-wrapper">
                                    <button onClick={this.onSubmit} style={{cursor: 'pointer'}} className="Button PublishPanel-triggerButton Button--blue">提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="WriteIndexLayout-main WriteIndex">
                <div style={{
                    lineHeight: '30px',
                    padding:'0 0 15px 0'
                }}>
                  <Radio.Group onChange={this.onLevelChange} value={this.state.topicLevel}>
                    <Radio value={'public'}>公开</Radio>
                    <Radio value={'private'}>隐私</Radio>
                  </Radio.Group>
                </div>
                <div style={{
                    lineHeight: '30px',
                    padding:'0 0 15px 0'
                }}>
                <Radio.Group onChange={this.onTypeChange} value={this.state.topicType}>
                <Radio value={'share'}>分享</Radio>
                <Radio value={'ask'}>问答</Radio>
                <Radio value={'job'}>招聘</Radio>
              </Radio.Group>
                </div>
                <div className="WriteCover-wrapper">
                    <div className="WriteCover-previewWrapper">
                        <Upload
                            method="POST"
                            headers={{
                              Authorization: getToken()
                            }}
                            fileList={[]}
                            supportServerRender
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action='/api/v1/files'
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleTitleImageChange}
                            onSuccess={this.onSuccess}
                        >
                            {titleImageUrl ? <img src={titleImageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </div>
                </div>
                <div>
                    <div className="WriteIndex-titleInput Input-wrapper Input-wrapper--multiline">
                        {/* <label className="WriteIndex-titleInput Input-wrapper Input-wrapper--multiline">
                        </label> */}
                    <TextArea onChange={this.onTitleChange} value={this.state.topicName} allowClear maxLength={50} placeholder="请输入标题，最多50个字" className="Input" autoSize />
                    </div>
                </div>
                <div className="PostEditor-wrapper">
                    <div className="InputLike PostEditor Editable">
                        <ReactQuill
                            ref={ref => this.quillRef = ref}
                            placeholder="请输入正文"
                            modules= {{
                                toolbar: {
                                container: [
                                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                                    [{ 'font': [] }],
                                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                    [{ 'align': [] }],
                                    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                                    [{ 'direction': 'rtl' }],                         // text direction
                                    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                                    ['blockquote', 'code-block'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    [{ 'color': [] }, { 'background': [] }],
                                    ['emoji', 'image', 'link'],
                                    ['clean']
                                ],
                                handlers: {
                                    image: this.imageHandler
                                }
                            },
                            'emoji-toolbar': true,
                            'emoji-shortname': true,
                          }}
                        theme="snow" onChange={this.onContentChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
  }

}



export default connect(state => {
    return {
      typeTopics: state.topic.topicDatas.all,
    }
  })(Form.create()(WriteTopic));


