import React, { Component } from 'react';

import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';
import { connect } from 'dva';

class Recommend extends Component{

  state={
    blogInfo: {
      name: '日志详情'
    }
  }

  fetchRecommendData = (currentPage) => {
    const { dispatch, recommendData: { pageSize } } = this.props;
    dispatch({
      type: 'topic/fetchRecommendData',
      payload: {
        currentPage,
        pageSize
      }
    })
  }

  render() {
    const { recommendData } = this.props;  
    return(
        <div className="TopstoryContent">
            <div className="ListShortcut">
                <div className="Topstory-follow">
                    <div>
                        {
                            [1,2,3].map((item, index) => {
                                return(
                                    <div key={item} className="Card TopstoryItem TopstoryItem-isRecommend">
                                        <h2 className="ContentItem-title">
                                            <div>
                                                <a target="_blank" data-za-detail-view-element_name="Title" data-za-detail-view-id="2812" href="/question/27145069/answer/678977385">程序员们平时都喜欢逛什么论坛呢？</a>
                                            </div>
                                        </h2>
                                        <div className="RichContent is-collapsed">
                                            <div className="RichContent-cover">
                                                <div className="RichContent-cover-inner">
                                                    <img src="https://pic2.zhimg.com/50/v2-1bdf7ca65cacd6044c6ec0c76d698935_400x224.jpg" alt="cover" />
                                                </div>
                                            </div>
                                            <div className="RichContent-inner">
                                                <span className="RichText ztext CopyrightRichText-richText">
                                                熠杰： 3月7日，隶属最高检察院的《检查日报》用了整整三个版面痛批孙杨和孙母，第一版标题为："无视规则将会承担相应后果“，第二版标题为：”商业比赛不能与国家荣誉捆绑“，第三版标题为：”观察孙杨事…
                                                </span>
                                                <button type="button" className="Button ContentItem-more Button--plain">阅读全文
                                                    <span style={{display: 'inline-flex', alignItems: 'center'}}>&#8203;
                                                        <svg className="Zi Zi--ArrowDown ContentItem-arrowIcon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                                                        <path d="M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z" fillRule="evenodd"></path></svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="ContentItem-actions">
                                            <div className="ContentItem-actions ZVideoToolbar ContentItem-action ZVideoItem-toolbar">
                                                <span >
                                                    <button className="Button VoteButton VoteButton--up" type="button">
                                                        <Icon type="caret-up" />
                                                        赞同 3961 
                                                    </button>
                                                    {/* <button className="Button VoteButton VoteButton--up is-active" type="button">
                                                        <Icon type="caret-up" />
                                                        已赞同 3962
                                                    </button> */}
                                                    <button className="Button VoteButton VoteButton--down" type="button">
                                                        <Icon type="caret-down" />
                                                    </button>
                                                </span>
                                                <button className="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
                                                    <Icon type="message" theme="filled"/>
                                                    613 条评论
                                                </button>
                                                <button className="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
                                                    <Icon type="star"  theme="filled"/>
                                                    收藏
                                                </button>
                                                <button className="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
                                                    <Icon type="heart" theme="filled" />
                                                    喜欢
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <Pagination
                        className="ant-table-pagination"
                        total={recommendData.totalCount}
                        current={recommendData.currentPage}
                        pageSize={recommendData.pageSize}
                        onChange={this.fetchRecommendData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
  }

}

export default connect()(Recommend);;
