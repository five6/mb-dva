import React, { Component } from 'react';

import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';
import { connect } from 'dva';
import StrSubstringPipe from './pipes/StrSubstringPipe';
class Topic extends Component{

  state={
    topicData: {
        totalCount: 0,
        pageSize: 10,
        currentPage: 1,
        items: []
    }
  }

  componentDidMount() {
      this.fetchTopicData(1);
  }

  fetchTopicData = (currentPage) => {
    const {dispatch, topicType} = this.props;
    const { typeTopics: { pageSize } } = this.props;
    dispatch({
      type: 'topic/fetchTopics',
      payload: {
        type: topicType,
        currentPage,
        pageSize
      }
    })
  }

  render() {
    const { typeTopics: { items =[], totalCount = 0, pageSize = 10, currentPage = 1}} = this.props;  
    return(
        <div className="TopstoryContent">
            <div className="ListShortcut">
                <div className="Topstory-follow">
                    <div>
                        {
                            items.map((item, index) => {
                                return(
                                    <div key={item._id} className="Card TopstoryItem TopstoryItem-isRecommend">
                                        <h2 className="ContentItem-title">
                                            <div>
                                                <a target="_blank" data-za-detail-view-element_name="Title" data-za-detail-view-id="2812" href="/question/27145069/answer/678977385">{item.title}</a>
                                            </div>
                                        </h2>
                                        <div className="RichContent is-collapsed">
                                            {
                                                item.title_image ? 
                                                    <div className="RichContent-cover">
                                                        <div className="RichContent-cover-inner">
                                                            <img src={item.title_image} alt="cover" />
                                                        </div>
                                                    </div>
                                            : null
                                            }
                                            <div className="RichContent-inner">
                                                <div 
                                                className="RichText ztext CopyrightRichText-richText"
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                                  />
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
                        total={totalCount}
                        current={currentPage}
                        pageSize={pageSize}
                        onChange={this.fetchTopicData}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
  }

}

export default connect()(Topic);;
