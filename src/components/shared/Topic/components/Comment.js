import React, { Component } from 'react';
import { connect } from 'dva';
import Moment from 'react-moment';
import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row, message } from 'antd';
import {getAvatar} from '@/utils/common.utils';
import * as _ from 'lodash';
import { getLoginUserInfo } from '@/utils/authority';
class Commment extends Component{

  state={
    showExtraButtons: false,
    showReplyInput: false,
    subContent: '',
    content: '',
    childrenHover: {
      showInput: false,
      id: false
    }
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

  onSubReplyButtonMouseEnter = (_id) => {
    const {childrenHover } = this.state;
    this.setState({
      childrenHover: {
        showInput: childrenHover.showInput,
        id: _id
      }
    })
  }

  onSubReplyButtonsMouseLeave = () => {
    this.setState({
      childrenHover: {
        showInput: false,
        id: false
      }
    })
  }

  onClickReply = () => {
    const {showReplyInput} = this.state;
    this.setState({
      showReplyInput: !showReplyInput
    })
  }

  onClickSubReply = () => {
    const {childrenHover} = this.state;
    if(childrenHover.id) {
      this.setState({
        childrenHover: {
          id: childrenHover.id,
          showInput: !childrenHover.showInput
        }
      })
      return;
    }
    this.setState({
      childrenHover: {
        id: !childrenHover.id,
        showInput: !childrenHover.showInput
      }
    })
  }

  onContentChange = (e) => {
    this.setState({
      content: _.trim(e.target.innerText)
    })
  }

  onSubContentChange = (e) => {
    this.setState({
      subContent: _.trim(e.target.innerText)
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
            content: '',
            showReplyInput: false
          })
          message.success('回复成功');
        } else {
          message.error(res.msg);
        }
      }
    })
  }

  onSubReplySubmit = (reply) => {
    const { topic, dispatch, comment, onReplyOneComment } = this.props;
    const { subContent } = this.state;
    const self = this;
    dispatch({
      type: 'topic/createReply',
      payload: {
        topic_id:topic._id,
        to_uid: reply.from_uid._id,
        reply_level: 2,
        parent_reply_id:comment._id,
        content: subContent
      },
      callback(res) {
        if(res.code === 0) {
          self.setState({
            subContent: '',
            childrenHover: {
              id: false,
              showInput: false
            }
          })
          const userInfo = getLoginUserInfo();
          const newComment = res.datas;
          newComment.from_uid  = {
            useDefaultAvatarUrl: userInfo.useDefaultAvatarUrl,
            _id: userInfo.id,
            avatarUrl: userInfo.avatarUrl,
            username: userInfo.username,
          }
          newComment.to_uid = comment.from_uid;
          onReplyOneComment(comment._id, newComment);
          message.success('回复成功');
        } else {
          message.error(res.msg);
        }
      }
    })
  }

  onFetchMoreSubComment = (reply) => {
    const { onFetchMoreSubComment } = this.props;
    onFetchMoreSubComment(reply);
  }

  render() {
    const { comment , topic} = this.props;
    const { showExtraButtons, showReplyInput , content, subContent, childrenHover} = this.state;
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
              comment.children.map((reply, index) => {
                return  <li key={reply._id}  onMouseLeave={this.onSubReplyButtonsMouseLeave} className="NestComment--child">
                  <div className="CommentItemV2">
                    <div>
                        <div className="CommentItemV2-meta">
                          <span className="UserLink CommentItemV2-avatar">
                            <div className="Popover">
                                <div>
                                  <a href="" className="UserLink-link">
                                    <img alt={comment.from_uid.username} style={{width: '24px', height: '24px'}} src={getAvatar(reply.from_uid)} className="Avatar UserLink-avatar"/>
                                  </a>
                                </div>
                            </div>
                          </span>
                          <span className="UserLink">
                                <a href="" className="UserLink-link">
                                  {reply.from_uid.username}
                                </a>
                          </span>
                          <span className="CommentItemV2-reply">回复</span>
                          <span className="UserLink">
                              <a href="" className="UserLink-link">
                                {reply.to_uid.username}
                              </a>
                          </span>
                          <span className="CommentItemV2-time">
                            <Moment date={reply.from_uid.createTime} format="YYYY-MM-DD" />
                          </span>
                        </div>
                        <div className="CommentItemV2-metaSibling">
                            <div className="CommentRichText CommentItemV2-content">
                                <div className="RichText ztext">
                                  {reply.content}
                                </div>
                            </div>
                            <div onMouseEnter={e => this.onSubReplyButtonMouseEnter(reply._id)} className="CommentItemV2-footer">
                                <button className="Button CommentItemV2-likeBtn Button--plain">
                                    <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                    <Icon type="like" />赞
                                    </span>
                                </button>
                                {
                                  childrenHover.id === reply._id ?
                                  (
                                    <span>
                                        <button onClick={this.onClickSubReply}  className="Button CommentItemV2-likeBtn Button--plain">
                                        <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                          <Icon type="message" />
                                          {
                                            childrenHover.id === reply._id && childrenHover.showInput ? '取消回复': '回复'
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
                              childrenHover.id === reply._id && childrenHover.showInput ?
                              <div>
                                <div className="CommentsV2-footer CommentEditorV2--normal CommentEditorV2--active">
                                  <div className="CommentEditorV2-inputWrap CommentEditorV2-inputWrap--active">
                                    <div className="InputLike CommentEditorV2-input Editable">
                                      <div onKeyUp={this.onSubContentChange} contentEditable="plaintext-only" className="Dropzone Editable-content RichText RichText--editable RichText--clearBoth ztext">
                                      </div>
                                    </div>
                                  </div>
                                  <button onClick={e => this.onSubReplySubmit(reply)} disabled={!subContent} className="Button CommentEditorV2-singleButton Button--primary Button--blue">发布</button>
                                </div>
                              </div>: null
                            }
                        </div>
                    </div>
                    {
                    comment.children.length >= 10 && index === comment.children.length -1 ?
                      <div onClick={e => this.onFetchMoreSubComment(comment)} className="more-sub-comment">更多回复</div>: null
                    }
                  </div>
                </li>
              })
                : null
            }
        </ul>
    )
  }

}

export default connect()(Commment);;
