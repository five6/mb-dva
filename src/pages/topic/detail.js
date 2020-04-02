import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Popover, Button, Icon, Tag, Tabs, Typography, Row, message } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';

import router from 'umi/router';
import Moment from 'react-moment';
import moment from 'moment';
import { getLoginUserInfo } from '@/utils/authority';
import Comment from '@/components/shared/Topic/components/Comment';
import {getAvatar} from '@/utils/common.utils';


class OneTopic extends Component{

  state={
  }

  componentDidMount() {
    const userInfo = getLoginUserInfo();
    if(!userInfo) {
      router.push('/login');
      return;
    }
    const { dispatch, location } = this.props;
    dispatch({
      type: 'topic/fetchTopicDetail',
      payload: location.pathname.split('/topics/')[1]
    })


  }




  render() {

    let { topicDetail } = this.props;
    topicDetail = topicDetail && topicDetail.author ? topicDetail:  {author: {}, replies: []};

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
                          <a className="UserLink-link" href={`/people/${topicDetail.author.username}`}>
                            <img alt="" style={{width: '38px', height: '38px'}} className="Avatar Avatar--round AuthorInfo-avatar" src={getAvatar(topicDetail.author)} />
                          </a>
                        </div>
                      </div>
                    </span>
                    <div className="AuthorInfo-content">
                      <div className="AuthorInfo-head">
                        <span className="UserLink AuthorInfo-name">
                          <div className="Popover">
                            <div className="UserLink-link">
                              <a className="UserLink-link" href={`/people/${topicDetail.author.username}`}>{topicDetail.author.username}</a>
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
                    <button onClick={() => alert('显示点赞列表')} className="Button Button--plain" >{`12人 `}赞同了该文章</button>
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
                      编辑于<Moment local="zh-CN" date={topicDetail.lastUpdateTime} format="llll" />
                      </div>
                  : ''
                }
              </div>
              <div className="Post-topicsAndReviewer topic-tags-container">
                <div className="TopicList Post-Topics">
                  {
                    [1,2,3].map(item => {
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
              <div>
                <StickyContainer>
                    <Sticky bottomOffset={0}>
                    {({style}) => {
                        return(
                          <div style={style}>
                            sfsfsf
                            sdfsdfsdf
                            sfsdfsfsdfsd

                            十分舒服
                            <button>sdfsdfsf</button>
                          </div>
                        )

                    }}
                  </Sticky>
                </StickyContainer>
              </div>
            </article>
            <div className="Post-Sub Post-NormalSub">
              <div className="Comments-container">
                <div className="CommentsV2 CommentsV2--withEditor CommentsV2-withPagination">
                    <div className="Topbar CommentTopbar">
                      <div className="Topbar-title">
                        <h2 className="CommentTopbar-title">2 条评论</h2>
                      </div>
                      <div className="Topbar-options">
                        <button className="Button Button--plain Button--withIcon Button--withLabel">
                          <span style={{display: 'inline-flex', alignItems: 'center'}}>
                            <Icon type="swap" />切换为时间排序
                          </span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="CommentsV2-footer CommentEditorV2--normal CommentEditorV2--active">
                        <div className="CommentEditorV2-inputWrap CommentEditorV2-inputWrap--active">
                          <div className="InputLike CommentEditorV2-input Editable">
                            <div contentEditable="plaintext-only" className="Dropzone Editable-content RichText RichText--editable RichText--clearBoth ztext">

                            </div>
                          </div>
                        </div>
                        <button className="Button CommentEditorV2-singleButton Button--primary Button--blue">发布</button>
                      </div>
                    </div>
                    <div>
                      <div className="CommentListV2">
                          {
                            [1,2,3].map(item => {
                              return(
                                <Comment key={item} />
                              )
                            })
                          }

                      </div>
                    </div>
                </div>
              </div>

            </div>
        </div>
    )
  }

}

export default connect(state => {
    return {
      topicDetail: state.topic.topicDetail,
    }
  })(Form.create()(OneTopic));


