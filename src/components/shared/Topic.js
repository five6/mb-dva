import React, { Component } from 'react';

import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';
import { connect } from 'dva';
import TopicBottomActions from './TopicBottomActions';
class Topic extends Component{

  state={
      // 展开的topic
    expandings: {}
  }

  componentDidMount() {
      this.fetchTopicData(1);
  }

  fetchTopicData = (currentPage) => {
    const {dispatch, topicType} = this.props;
    const { typeTopics: { pageSize } } = this.props;
    this.setState({
        expandings: {}
    })
    dispatch({
      type: 'topic/fetchTopics',
      payload: {
        type: topicType,
        currentPage,
        pageSize
      }
    })
  }

  expandTopic = (id) => {
    const { expandings } = this.state;
    expandings[id] = true;
    this.setState({
        expandings
    })
  }

  collapsedopic = (id) => {
    const { expandings } = this.state;
    expandings[id] = false;
    this.setState({
        expandings
    })
  }

  render() {
    const { typeTopics: { items =[], totalCount = 0, pageSize = 10, currentPage = 1}} = this.props; 
    const { expandings } = this.state;
    return(
        <div className="TopstoryContent">
            <div className="ListShortcut">
                <div className="Topstory-follow">
                    <div>
                        {
                            items.map((item, index) => {
                                item.author = {avatarUrl: 'http://localhost:7000/api/v1/files/5e822fa21df4ad4da5839d91'};
                                return(
                                    <div key={item._id} className="Card TopstoryItem TopstoryItem-isRecommend">
                                        <h2 className="ContentItem-title">
                                            <div>
                                                <a href={`/topics/${item._id}`}>{item.title}</a>
                                            </div>
                                        </h2>
                                        {
                                        expandings[item._id] ?
                                        <div className="ContentItem-meta">
                                            <div className="AuthorInfo ArticleItem-authorInfo AuthorInfo--plain">
                                                <span children="UserLink AuthorInfo-avatarWrapper">
                                                    <div className="Popover">
                                                       <div>
                                                            <a className="UserLink-link" href={`/people/${item.author.username}`} >
                                                                <img alt="avatarUrl" src={item.author.avatarUrl} style={{with: '24px', height: '24px'}} className="Avatar AuthorInfo-avatar" />
                                                            </a>
                                                                
                                                        </div> 
                                                    </div>
                                                </span>
                                                <div className="AuthorInfo-content">
                                                    <div className="AuthorInfo-head">
                                                        <span className="UserLink AuthorInfo-name">
                                                            <div className="Popover">
                                                                <div>
                                                                    <a className="UserLink-link" href={`/people/${item.author.username}`}>烟雨江南</a>
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
                                            expandings[item._id] ? 
                                            <div className="RichContent">
                                                <div>
                                                   <div className="ArticleItem-extraInfo">
                                                        <span className="Voters">
                                                            <button type="button" className="Button Button--plain">9 人赞同了该文章</button>
                                                        </span>
                                                    </div>
                                                    {
                                                        item.title_image ?
                                                        <img className="ArticleItem-image" src={item.title_image} alt="Event loop"></img>
                                                        :  null
                                                    }
                                                </div>
                                                <div className="RichContent-inner">
                                                    <span  
                                                        className="RichText ztext CopyrightRichText-richText"
                                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                                    />
                                                </div>
                                            </div>
                                            : 
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
                                                <button onClick={() => this.expandTopic(item._id)} type="button" className="Button ContentItem-more Button--plain">阅读全文
                                                    <span style={{display: 'inline-flex', alignItems: 'center'}}>&#8203;
                                                        <Icon type="down" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        }
                                        <TopicBottomActions isCollapsed={expandings[item._id]} collapsedopic={this.collapsedopic} topic={item} />
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
