import React, { Component } from 'react';

import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';

import { connect } from 'dva';
class Commment extends Component{

  state={
  }

  componentDidMount() {
  }

  

  render() {
    return(
        <ul className="NestComment">
            <li className="NestComment--rootCommentNoChild">
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
  }

}

export default connect()(Commment);;
