import React, { Component } from 'react';
import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';

import TopicBottomActions from './TopicBottomActions';

class Topic extends Component{

  state={

  }

  expandTopic = (id) => {
    const {expandTopic} = this.props;
    expandTopic(id);
  }

  collapseTopic = (id) => {
    const {collapseTopic} = this.props;
    collapseTopic(id);
  }

  render() {
    const { topic = {}, expanded, noCollapseAction } = this.props;
    return(
        <div className="Card TopstoryItem TopstoryItem-isRecommend">
            <h2 className="ContentItem-title">
                <div>
                    <a href={`/topics/${topic._id}`}>{topic.title}</a>
                </div>
            </h2>
            {
            expanded ?
            <div className="ContentItem-meta">
                <div className="AuthorInfo ArticleItem-authorInfo AuthorInfo--plain">
                    <span children="UserLink AuthorInfo-avatarWrapper">
                        <div className="Popover">
                            <div>
                                <a className="UserLink-link" href={`/people/${topic.author.username}`} >
                                    <img alt="avatarUrl" src={topic.author.avatarUrl} style={{with: '24px', height: '24px'}} className="Avatar AuthorInfo-avatar" />
                                </a>
                                    
                            </div> 
                        </div>
                    </span>
                    <div className="AuthorInfo-content">
                        <div className="AuthorInfo-head">
                            <span className="UserLink AuthorInfo-name">
                                <div className="Popover">
                                    <div>
                                        <a className="UserLink-link" href={`/people/${topic.author.username}`}>烟雨江南</a>
                                    </div>
                                </div>
                            </span>
                        </div>
                        <div className="AuthorInfo-detail">
                            <div className="AuthorInfo-badge">
                                <div className="ztext AuthorInfo-badgeText">
                                    程序员
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>: null
            }
            
            {
                expanded ? 
                <div className="RichContent">
                    <div>
                        <div className="ArticleItem-extraInfo">
                            <span className="Voters">
                                <button type="button" className="Button Button--plain">9 人赞同了该文章</button>
                            </span>
                        </div>
                        {
                            topic.title_image ?
                            <img className="ArticleItem-image" src={topic.title_image} alt="Event loop"></img>
                            :  null
                        }
                    </div>
                    <div className="RichContent-inner">
                        <span  
                            className="RichText ztext CopyrightRichText-richText"
                            dangerouslySetInnerHTML={{ __html: topic.content }}
                        />
                    </div>
                </div>
                : 
                <div className="RichContent is-collapsed">
                {
                    topic.title_image ? 
                        <div className="RichContent-cover">
                            <div className="RichContent-cover-inner">
                                <img src={topic.title_image} alt="cover" />
                            </div>
                        </div>
                : null
                }
                <div className="RichContent-inner">
                    <div 
                        className="RichText ztext CopyrightRichText-richText"
                        dangerouslySetInnerHTML={{ __html: topic.content }}
                        />
                    <button onClick={() => this.expandTopic(topic._id)} type="button" className="Button ContentItem-more Button--plain">阅读全文
                        <span style={{display: 'inline-flex', alignItems: 'center'}}>&#8203;
                            <Icon type="down" />
                        </span>
                    </button>
                </div>
            </div>
            }
            <TopicBottomActions noCollapseAction={noCollapseAction} isCollapsed={expanded} collapseTopic={this.collapseTopic} topic={topic} />
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
                        <div className="CommentListV2">
                            {
                                [1,2,3].map(item => {
                                    return(
                                        <ul key={item} className="NestComment">
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
                                        </ul>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                      <div className="CommentsV2-footer CommentEditorV2--normal CommentEditorV2--active">
                        <div className="CommentEditorV2-inputWrap CommentEditorV2-inputWrap--active">
                          <div className="InputLike CommentEditorV2-input Editable">
                            <div contentEditable className="Dropzone Editable-content RichText RichText--editable RichText--clearBoth ztext">

                            </div>
                          </div>
                        </div>
                        <button className="Button CommentEditorV2-singleButton Button--primary Button--blue">发布</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }

}

export default Topic;
