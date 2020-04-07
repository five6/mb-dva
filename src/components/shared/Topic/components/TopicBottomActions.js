import React, { Component } from 'react';
import { PageHeader, Pagination, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';


class BottomActions extends Component{

  state={
    blogInfo: {
      name: '日志详情'
    }
  }

  collapseTopic = (id) => {
      const {collapseTopic, topic} = this.props;
      collapseTopic(topic._id);
  }

  onClickTopicAction = (type, updown) => {
    const { onClickTopicAction } = this.props;
    onClickTopicAction(type, updown);
  }

  render() {
    const { isCollapsed, noCollapseAction, showComment, topic: { commentCount, upvoteCount}, hasUpvotedCount  } = this.props;
    return(
        <div className="ContentItem-actions">
            <div className="ContentItem-actions ZVideoToolbar ContentItem-action ZVideoItem-toolbar">
                <span >

                    {
                      hasUpvotedCount ?
                      <button onClick={e => this.onClickTopicAction('upvoteCount', 'up')} className="Button VoteButton VoteButton--up is-active" type="button">
                      <Icon type="caret-up" />
                      已赞同 {upvoteCount}
                    </button> :
                      <button onClick={e => this.onClickTopicAction('upvoteCount', 'up')} className="Button VoteButton VoteButton--up" type="button">
                      <Icon type="caret-up" />
                      赞同 {upvoteCount}
                    </button>
                    }
                    <button onClick={e => this.onClickTopicAction('upvoteCount', 'down')}  className="Button VoteButton VoteButton--down" type="button">
                        <Icon type="caret-down" />
                    </button>
                </span>
                <button onClick={() => this.onClickTopicAction('showComment')} className="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
                   {
                     showComment  ?
                     <span>
                     <Icon type="up" theme="filled"/>
                      收起评论
                    </span>
                    :
                    <span>
                      <Icon type="message" theme="filled"/>
                      {` ${commentCount} 条评论 `}
                    </span>
                   }
                </button>
                <button onClick={() => this.onClickTopicAction('followingTopic')} className="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
                    <Icon type="star"  theme="filled"/>
                    收藏
                </button>
                <button className="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
                    <Icon type="heart" theme="filled" />
                    喜欢
                </button>
                {
                    isCollapsed  && ! noCollapseAction?
                    <button onClick={this.collapseTopic} type="button" className="Button ContentItem-action ContentItem-rightButton Button--plain">
                    <span className="RichContent-collapsedText">收起</span>
                    <span style={{display: 'inline-flex', alignItems: 'center'}}>&#8203;
                        <Icon type="up" />
                    </span>
                </button>: null
                }
            </div>
        </div>
    )
  }

}

export default BottomActions;
