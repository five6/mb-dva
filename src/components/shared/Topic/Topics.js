import React, { Component } from 'react';

import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';
import Topic from './Topic';

import { connect } from 'dva';
class Topics extends Component{

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

  collapseTopic = (id) => {
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
                                return (<Topic dispatch={this.props.dispatch} key={item._id} expandTopic={this.expandTopic} collapseTopic={this.collapseTopic} expanded={expandings[item._id]} topic={item} />)
                            })
                        }
                      {
                        items.length ?
                          <Pagination
                          className="ant-table-pagination"
                          total={totalCount}
                          current={currentPage}
                          pageSize={pageSize}
                          onChange={this.fetchTopicData}
                          />: null
                      }
                    </div>
                </div>
            </div>
        </div>
    )
  }

}

export default connect()(Topics);;
