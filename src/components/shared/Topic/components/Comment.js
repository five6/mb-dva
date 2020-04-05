import React, { Component } from 'react';
import { connect } from 'dva';
import Moment from 'react-moment';
import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row, message } from 'antd';
import {getAvatar} from '@/utils/common.utils';
import * as _ from 'lodash';
class Commment extends Component{

  state={
    showExtraButtons: false,
    showReplyInput: false,
    content: ''
  }

  componentDidMount() {
  }

  onButtonMouseEnter = () => {
    this.setState({
      showExtraButtons: true
    })
  }

  onButtonsMouseLeave = () => {
    this.setState({
      showExtraButtons: false
    })
  }

  onClickReply = () => {
    const {showReplyInput} = this.state;
    this.setState({
      showReplyInput: !showReplyInput
    })
  }

  onContentChange = (e) => {
    this.setState({
      content: _.trim(e.target.innerText)
    })
  }

  onSubmit = () => {
    const { topic, comment, dispatch } = this.props;
    const { content } = this.state;
    const self = this;
    dispatch({
      type: 'topic/createReply',
      payload: {
        topic_id:topic._id,
        to_uid: comment.from_uid._id,
        reply_level: 2,
        parent_reply_id:comment._id,
        content
      },
      callback(res) {
        if(res.code === 0) {
          self.setState({
            content: 0,
            showReplyInput: false
          })
          message.success('回复成功');
        } else {
          message.error(res.msg);
        }
      }
    })
  }


  render() {
    const { comment , topic} = this.props;
    const { showExtraButtons, showReplyInput , content} = this.state;
    return(
        <ul className="NestComment">
            <li className="NestComment--rootComment">
                <div className="CommentItemV2">
                    <div>
                        <div className="CommentItemV2-meta">
                            <span className="UserLink CommentItemV2-avatar">
                            <div className="Popover">
                                <div>
                                  <a href="" className="UserLink-link">
                                    <img alt={comment.from_uid.username} style={{width: '24px', height: '24px'}} src={getAvatar(comment.from_uid)} className="Avatar UserLink-avatar"/>
                                </a>
                                </div>
                            </div>
                            </span>
                            <span className="UserLink">
                              <a className="UserLink-link">{comment.from_uid.username}</a>
                            </span>
                            <span className="CommentItemV2-roleInfo">
                              {
                                topic.from_uid._id === comment.from_uid._id ?
                                ('(作者)'): null
                              }
                            </span>
                            <span className="CommentItemV2-time">
                              <Moment date={comment.from_uid.createTime} format="YYYY-MM-DD" />
                            </span>
                        </div>
                        <div className="CommentItemV2-metaSibling">
                            <div className="CommentRichText CommentItemV2-content">
                                <div className="RichText ztext">
                                  {comment.content}
                                </div>
                            </div>
                            <div onMouseEnter={this.onButtonMouseEnter} onMouseLeave={this.onButtonsMouseLeave} className="CommentItemV2-footer">
                                <button className="Button CommentItemV2-likeBtn Button--plain">
                                    <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                    <Icon type="like" />赞
                                    </span>
                                </button>
                                {
                                  showExtraButtons ?
                                  (
                                    <span>
                                        <button onClick={this.onClickReply}  className="Button CommentItemV2-likeBtn Button--plain">
                                        <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                          <Icon type="message" />
                                          {
                                            showReplyInput ? '取消回复': '回复'
                                          }
                                        </span>
                                    </button>
                                    <button className="Button CommentItemV2-likeBtn Button--plain">
                                        <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                        <Icon type="dislike" />踩
                                        </span>
                                    </button>
                                    <button className="Button CommentItemV2-likeBtn Button--plain">
                                        <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                        <Icon type="safety" />举报
                                        </span>
                                    </button>
                                    </span>
                                  ): null
                                }
                            </div>
                            {
                              showReplyInput ?
                              <div>
                                <div className="CommentsV2-footer CommentEditorV2--normal CommentEditorV2--active">
                                  <div className="CommentEditorV2-inputWrap CommentEditorV2-inputWrap--active">
                                    <div className="InputLike CommentEditorV2-input Editable">
                                      <div onKeyUp={this.onContentChange} contentEditable="plaintext-only" className="Dropzone Editable-content RichText RichText--editable RichText--clearBoth ztext">
                                      </div>
                                    </div>
                                  </div>
                                  <button onClick={this.onSubmit} disabled={!content} className="Button CommentEditorV2-singleButton Button--primary Button--blue">发布</button>
                                </div>
                              </div>: null
                            }
                        </div>

                    </div>
                </div>
            </li>
            {
              comment.children && comment.children.length ?
                <li className="NestComment--child">
                  <div className="CommentItemV2">
                    <div>
                        <div className="CommentItemV2-meta">
                          <span className="UserLink CommentItemV2-avatar">
                            <div className="Popover">
                                <div>
                                  <a href="" className="UserLink-link">
                                    <img alt={comment.from_uid.username} style={{width: '24px', height: '24px'}} src={getAvatar(comment.from_uid)} className="Avatar UserLink-avatar"/>
                                  </a>
                                </div>
                            </div>
                          </span>
                          <span className="UserLink">
                                <a href="" className="UserLink-link">
                                  小黑
                                </a>
                          </span>
                          <span className="CommentItemV2-reply">回复</span>
                          <span className="UserLink">
                              <a href="" className="UserLink-link">
                                小白
                              </a>
                          </span>
                          <span className="CommentItemV2-time">
                            <Moment date={comment.from_uid.createTime} format="YYYY-MM-DD" />
                          </span>
                        </div>
                        <div className="CommentItemV2-metaSibling">
                            <div className="CommentRichText CommentItemV2-content">
                                <div className="RichText ztext">
                                  {comment.content}
                                </div>
                            </div>
                            <div onMouseEnter={this.onButtonMouseEnter} onMouseLeave={this.onButtonsMouseLeave} className="CommentItemV2-footer">
                                <button className="Button CommentItemV2-likeBtn Button--plain">
                                    <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                    <Icon type="like" />赞
                                    </span>
                                </button>
                                {
                                  showExtraButtons ?
                                  (
                                    <span>
                                        <button onClick={this.onClickReply}  className="Button CommentItemV2-likeBtn Button--plain">
                                        <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                          <Icon type="message" />
                                          {
                                            showReplyInput ? '取消回复': '回复'
                                          }
                                        </span>
                                    </button>
                                    <button className="Button CommentItemV2-likeBtn Button--plain">
                                        <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                        <Icon type="dislike" />踩
                                        </span>
                                    </button>
                                    <button className="Button CommentItemV2-likeBtn Button--plain">
                                        <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                        <Icon type="safety" />举报
                                        </span>
                                    </button>
                                    </span>
                                  ): null
                                }
                            </div>
                            {
                              showReplyInput ?
                              <div>
                                <div className="CommentsV2-footer CommentEditorV2--normal CommentEditorV2--active">
                                  <div className="CommentEditorV2-inputWrap CommentEditorV2-inputWrap--active">
                                    <div className="InputLike CommentEditorV2-input Editable">
                                      <div onKeyUp={this.onContentChange} contentEditable="plaintext-only" className="Dropzone Editable-content RichText RichText--editable RichText--clearBoth ztext">
                                      </div>
                                    </div>
                                  </div>
                                  <button onClick={this.onSubmit} disabled={!content} className="Button CommentEditorV2-singleButton Button--primary Button--blue">发布</button>
                                </div>
                              </div>: null
                            }
                        </div>
                    </div>
                  </div>
                </li>: null
            }
        </ul>
    )
  }

}

export default connect()(Commment);;
