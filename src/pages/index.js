import styles from './index.css';
import { connect } from 'dva';
import { Component } from 'react';

import { PageHeader, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';

import Recommend from '@/components/shared/Recommend';
import Follow from '@/components/shared/Follow';
import Hot from '@/components/shared/Hot';


const { TabPane } = Tabs;

class Topic extends Component{

  state={
    blogs: {
      name: '日志列表'
    }
  }

  render() {
    const {recommendData, followingData , hotData, currentUser  } = this.props;
    return(
      <div className={styles.normal}>
        <div className="blog-main-content">
          <div className="Topstory">
            <div className="Topstory-container">
                <div className="Topstory-mainColumn">
                  <a href="https://www.zhihu.com/special/19681091" target="_blank" className="css-w3ttmg">
                    <img src="https://pic2.zhimg.com/v2-6e8fccc8a30e8cf15a90e7a894011579_r.jpg" className="css-vnkjjr"></img>
                  </a>
                 <div className="Topstory-mainColumnCard">
                 <Tabs defaultActiveKey="1">
                  <TabPane tab="推荐" key="1">
                    <Recommend recommendData={recommendData} />
                  </TabPane>
                  <TabPane tab="关注" key="2">
                    <Follow  followingData={followingData}/>
                  </TabPane>
                  <TabPane tab="热榜" key="3">
                    <Hot hotData={hotData}/>
                  </TabPane>
                  </Tabs>
                </div>
              </div>
              <div className="GlobalSideBar">
                右边
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
    hotData: state.topic.hotData,
    recommendData: state.topic.recommendData,
    followingData: state.topic.followingData
  }
})(Topic);
