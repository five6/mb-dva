import React, { Component } from 'react';
import { connect } from 'dva';
import { PageHeader, Form, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row, message } from 'antd';

import { StickyContainer, Sticky } from 'react-sticky';
import * as _ from 'lodash';
import router from 'umi/router';
import Moment from 'react-moment';
import moment from 'moment';
import { getLoginUserInfo } from '@/utils/authority';
import Comment from '@/components/shared/Topic/components/Comment';
import {getAvatar} from '@/utils/common.utils';
import { fetchTopicReply, fetchSubReply, fetchTopicDetail } from '@/services/topic';


class OneTopic extends Component{

  constructor(props) {
    super(props);
    moment.locale('zh-cn');
    this.state={
      topicDetail: {
        from_uid: {},
      },
      sort_time: false, // 排序方式
      commentDatas: {
        items: [],
        currentPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      tempCommentContent: '',
    }
  }



  componentDidMount() {
    // const userInfo = getLoginUserInfo();
    // if(!userInfo) {
    //   router.push('/login');
    //   return;
    // }
    const { location } = this.props;
    const self = this;
    fetchTopicDetail(location.pathname.split('/topics/')[1]).then(res => {
      if(res && res.code === 0) {
        self.setState({
          topicDetail: res.datas
        })
        self.fetchComment(1);
      }
    })
  }

  onClickTopicAction = (type, onlySort, sort_time) => {
    const self = this;
    const userInfo = getLoginUserInfo();
    const { showComment, topicDetail } = this.state;
    const {currentPage, pageSize} = self.state.commentDatas;
    const { dispatch } = this.props;
    if('showComment' === type) {
      if(!onlySort)
        this.setState({
          showComment: !showComment
        })
      if(!showComment || onlySort) {
        if(sort_time === undefined)
        sort_time = this.state.sort_time;
        fetchTopicReply({
          topic_id: topicDetail._id,
          sort_time,
        }).then(res => {
          if(!res || res.code !== 0) return;
          const {items, totalCount} = res;
          self.setState({
            commentDatas: {
              items,
              currentPage,
              totalCount,
              pageSize
            }
          })
        })
      }
    } else if(type === 'upvoteCount') {
      if(!userInfo) {
        message.info('您尚未登录！');
        return;
      }
      if((onlySort === 'up' && topicDetail.hasUpvotedCount) || (onlySort === 'down' && ! topicDetail.hasUpvotedCount ) ) return;
      dispatch({
        type: 'topic/upvoteCount',
        payload: {
          id:topicDetail._id,
          type: onlySort
        },
      })
    }
  }

  onClickChangeOrderType = () => {
    const {sort_time} = this.state;
      this.setState({
        sort_time:  ! sort_time
      });
      this.onClickTopicAction('showComment', true, !sort_time);
  }

  onSubContentChange = (e) => {
    this.setState({
      tempCommentContent: _.trim(e.target.innerText)
    })
  }

  fetchComment = (currentPage) => {
    const { topicDetail, sort_time , commentDatas: { pageSize }} = this.state;
    const self = this;
    fetchTopicReply({
      topic_id: topicDetail._id,
      sort_time,
      currentPage,
      pageSize
    }).then(res => {
      if(! res || res.code !== 0) return;
      const {items, totalCount} = res;
      self.setState({
        commentDatas: {
          items,
          currentPage,
          totalCount,
          pageSize
        }
      })
    })
  }


  findMoreReplyComments = (comment, commentIndex, current_id, topic_id, parent_reply_id, next_page) => {
    const self = this;
    const { commentDatas } = this.state;
    fetchSubReply({
      current_id,
      topic_id,
      parent_reply_id,
      next_page
    }).then(res => {
      if(res.code === 0) {
        if(next_page) {
          comment.children = comment.children.concat(res.datas);
        } else {
          comment.children = res.datas.concat(comment.children);
        }
        commentDatas.items[commentIndex] = comment;
        self.setState({
          commentDatas
        })
      }
    }).catch(rr => {
      console.error(rr);
    })
  }

  onFetchMoreSubComment = (comment ) => {
    let { commentDatas } = this.state;
    const index = _.findIndex(commentDatas.items, item => {
      return item._id === comment._id;
    });
    this.findMoreReplyComments(comment, index, comment.children[comment.children.length-1]._id, comment.topic_id,  comment._id, 1);
  }

  submitReply = () => {
    const { dispatch } = this.props;
    const { tempCommentContent, topicDetail } = this.state;
    if(!getLoginUserInfo()){
      message.info('您尚未登录！');
      return;
    }
    if(! tempCommentContent) {
      message.info('请输入内容！');
      return;
    }
    const self = this;
    dispatch({
      type: 'topic/createReply',
      payload: {
        topic_id:topicDetail._id,
        to_uid: topicDetail.from_uid._id,
        reply_level: 1,
        content: tempCommentContent
      },
      callback(res) {
        if(res.code === 0) {
          self.setState({
            tempCommentContent: '',
          })
          self.inputCommentDiv.innerText = '';
          self.fetchComment(1);
          message.success('回复成功');
        } else {
          message.error(res.msg);
        }
      }
    })
  }



  render() {
    const {topicDetail,  sort_time, commentDatas, tempCommentContent } = this.state;
    const content = (
      <div>
        <p>内容</p>
        <p>内容啊</p>
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
                            <div className="ColumnPageHeader-Button">
                                <div className="PublishPanel-wrapper">
                                    <button onClick={() => router.push('/topics/topic-edit')} style={{cursor: 'pointer'}} className="Button PublishPanel-triggerButton Button--blue">
                                      写文章
                                      <Icon type="edit" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
              topicDetail.title_image ?
              <img  alt="title" className="TitleImage" src={topicDetail.title_image} />
              : null
            }
            <article className="Post-Main Post-NormalMain">
              <header className="Post-Header">
                <h1 className="Post-Title">{topicDetail.title}</h1>
                <div className="Post-Author">
                  <div className="AuthorInfo">
                    <span className="UserLink AuthorInfo-avatarWrapper">
                      <div className="Popover">
                        <div>
                          <a className="UserLink-link" href={`/people/${topicDetail.from_uid.username}`}>
                            <img alt="" style={{width: '38px', height: '38px'}} className="Avatar Avatar--round AuthorInfo-avatar" src={getAvatar(topicDetail.from_uid)} />
                          </a>
                        </div>
                      </div>
                    </span>
                    <div className="AuthorInfo-content">
                      <div className="AuthorInfo-head">
                        <span className="UserLink AuthorInfo-name">
                          <div className="Popover">
                            <div className="UserLink-link">
                              <a className="UserLink-link" href={`/people/${topicDetail.from_uid.username}`}>{topicDetail.from_uid.username}</a>
                            </div>
                          </div>
                        </span>
                      </div>
                      <div className="AuthorInfo-detail">
                        <div className="AuthorInfo-badge">
                          <div className="ztext AuthorInfo-badgeText">程序员</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="Button FollowButton Button--primary Button--blue">
                    <span style={{display:'inline-flex', alignItems:'center'}}>
                      <Icon type="plus" />
                      关注他
                    </span>
                  </button>
                </div>
                <div>
                  <div className="Voters">
                    <button onClick={() => alert('显示点赞列表')} className="Button Button--plain" >{topicDetail.upvoteCount}赞同了该文章</button>
                  </div>
                </div>
              </header>
              <div className="Post-RichTextContainer">
                <div className="RichText ztext Post-RichText"
                 dangerouslySetInnerHTML={{ __html: topicDetail.content }}
                >
                </div>
              </div>
              <div className="ContentItem-time">
                {
                  topicDetail.lastUpdateTime ?
                    <div>
                      最后编辑于
                      <Moment
                        local
                        date={topicDetail.lastUpdateTime}
                        fromNow
                      />
                      </div>
                  : ''
                }
              </div>
              <div className="Post-topicsAndReviewer topic-tags-container">
                <div className="TopicList Post-Topics">
                  {
                    (topicDetail.comments || []).map(item => {
                      return(
                        <div key={item} className="Tag Topic">
                          <Popover content={content} title={`标题${item}`} trigger="hover">
                            <div className="Tag-content">
                              <a className="TopicLink" target="_blank">
                                <span className="Popover">
                                  <div>java</div>
                                </span>
                              </a>
                            </div>
                          </Popover>
                      </div>)
                    })
                  }
                </div>
              </div>
            </article>
            <div className="Post-Sub Post-NormalSub">
              <div className="Comments-container">
                <div className="CommentsV2 CommentsV2--withEditor CommentsV2-withPagination">
                    <div className="Topbar CommentTopbar">
                        <div className="Topbar-title">
                          <h2 className="CommentTopbar-title">{commentDatas.totalCount}条评论</h2>
                        </div>
                        <div className="Topbar-options">
                            <button onClick={this.onClickChangeOrderType} className="Button Button--plain Button--withIcon Button--withLabel">
                            <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                <Icon type="swap" />
                                {
                                  sort_time ?  '切换为默认排序': '切换为时间排序'
                                }
                            </span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="CommentListV2">
                            {
                                commentDatas.items.map(item => {
                                    return(
                                        <Comment
                                          topic={topicDetail}
                                          comment={item}
                                          onReplyOneComment={this.onReplyOneComment}
                                          onFetchMoreSubComment = {this.onFetchMoreSubComment}
                                          key={item._id}
                                        />
                                    )
                                })
                            }
                              <Pagination
                                size="small"
                                className="ant-table-pagination"
                                total={commentDatas.totalCount}
                                current={commentDatas.currentPage}
                                pageSize={commentDatas.pageSize}
                                onChange={this.fetchComment}
                              />
                        </div>
                    </div>
                    <div>
                      <div className="CommentsV2-footer CommentEditorV2--normal CommentEditorV2--active">
                        <div className="CommentEditorV2-inputWrap CommentEditorV2-inputWrap--active">
                          <div className="InputLike CommentEditorV2-input Editable">
                            <div ref={(inputCommentDiv) => { this.inputCommentDiv = inputCommentDiv }} onKeyUp={this.onSubContentChange} contentEditable="plaintext-only" className="Dropzone Editable-content RichText RichText--editable RichText--clearBoth ztext">
                            </div>
                          </div>
                        </div>
                        <button onClick={this.submitReply} disabled={!tempCommentContent} className="Button CommentEditorV2-singleButton Button--primary Button--blue">发布</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
    )
  }

}

export default connect()(Form.create()(OneTopic));


