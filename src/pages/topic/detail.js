import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Popover, Button, Icon, Tag, Tabs, Typography, Row, message } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';

import router from 'umi/router';
import Moment from 'react-moment';
import moment from 'moment';
import { getLoginUserInfo } from '@/utils/authority';


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

    const { topicDetail = {author: {username: '烟雨江南'}, replies: []} } = this.props;

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
                          <a className="UserLink-link" href={`/people/${topicDetail.autho}`}>
                            <img alt="" style={{width: '38px', height: '38px'}} className="Avatar Avatar--round AuthorInfo-avatar" src="https://pic1.zhimg.com/bae97d0aa88ce01f4daa45e97af7d49e_im.jpg" />
                          </a>
                        </div>
                      </div>
                    </span>
                    <div className="AuthorInfo-content">
                      <div className="AuthorInfo-head">
                        <span className="UserLink AuthorInfo-name">
                          <div className="Popover">
                            <div className="UserLink-link">
                              <a className="UserLink-link" href={`/people/${topicDetail.auth}`}>烟雨江南</a>
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
                      <div className="CommentsV2-footer CommentEditorV2--normal">
                        <div className="CommentEditorV2-inputWrap">
                          <div className="InputLike CommentEditorV2-input Editable">
                            <div contentEditable className="Dropzone Editable-content RichText RichText--editable RichText--clearBoth ztext">

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="CommentListV2">
                        <ul className="NestComment">
                          {
                            [1,2,3].map(item => {
                              return(
                                <li key={item} className="NestComment--rootCommentNoChild">
                                  <div className="CommentItemV2">
                                    <div>
                                      <div className="CommentItemV2-meta">
                                        <span className="UserLink CommentItemV2-avatar">
                                          <div className="Popover">
                                            <div>
                                              <a href="" className="UserLink-link">
                                                <img alt="烟雨江南" style={{width: '24px', height: '24px'}} src="https://pic1.zhimg.com/bae97d0aa88ce01f4daa45e97af7d49e_im.jpg" className="Avatar UserLink-avatar"/>
                                              </a>
                                            </div>
                                          </div>
                                        </span>
                                        <span className="UserLink">
                                          <a className="UserLink-link">昨夜星辰</a>
                                        </span>
                                        <span className="CommentItemV2-roleInfo">
                                          (作者) 
                                        </span>
                                        <span className="CommentItemV2-time">
                                          2019-01-02
                                        </span>
                                      </div>
                                      <div className="CommentItemV2-metaSibling">
                                        <div className="CommentRichText CommentItemV2-content">
                                          <div className="RichText ztext">
                                          官方介绍到，Microsoft 365 消费者订阅将包含两种版本——个人版和家庭版。已有的 Office 365 订阅用户将免费升级迁移至 Microsoft 365，订阅价格不变，中国大陆个人版每年 398 元，家庭版每年 498 元（最多包含 6 名用户）
                                          </div>
                                        </div>
                                        <div className="CommentItemV2-footer">
                                          <button className="Button CommentItemV2-likeBtn Button--plain">
                                            <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                              <Icon type="like" />赞
                                            </span>
                                          </button>
                                          <button className="Button CommentItemV2-likeBtn Button--plain">
                                            <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                              <Icon type="like" />回复
                                            </span>
                                          </button>
                                          <button className="Button CommentItemV2-likeBtn Button--plain">
                                            <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                              <Icon type="like" />踩
                                            </span>
                                          </button>
                                          <button className="Button CommentItemV2-likeBtn Button--plain">
                                            <span style={{display: 'inline-flex', alignItems: 'center'}}>
                                              <Icon type="like" />举报
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              )
                            })
                          } 
                        </ul>
                        
                      </div>
                    </div>
                </div>
              </div>
            
            </div>           
            <div style={{margin: '30px auto 30px auto'}}>
                bottom
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
  

