import styles from './index.css';
import { connect } from 'dva';
import { Component } from 'react';

import { PageHeader, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';

import Topic from '@/components/shared/Topic';
// import TopicDetail from '@/components/shared/TopicDetail';
import GlobalSideBar from '@/components/shared/GlobalSideBar';



const { TabPane } = Tabs;

class Index extends Component{

  render() {

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
                  <Topic />
                </div>
              </div>
              <div className="GlobalSideBar">
                  <GlobalSideBar />
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
    topicState: state.topic,
  }
})(Index);
