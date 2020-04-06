import styles from './index.css';
import { connect } from 'dva';
import { Component } from 'react';

import { PageHeader, Menu, Dropdown, Icon, Button, Tabs, Typography, Row } from 'antd';

import Topics from '@/components/shared/Topic/Topics';
import GlobalSideBar from '@/components/shared/Topic/components/RightSideBar';


class Index extends Component{

  render() {
    const { typeTopics } = this.props;
    return(
      <div className={styles.normal}>
        <div className="blog-main-content">
          <div className="Topstory">
            <div className="Topstory-container">
                <div className="Topstory-mainColumn">
                  {/* <a href="https://www.zhihu.com/special/19681091" className="css-w3ttmg">
                    <img alt="广告" src="https://pic2.zhimg.com/v2-6e8fccc8a30e8cf15a90e7a894011579_r.jpg" className="css-vnkjjr"></img>
                  </a> */}
                 <div className="Topstory-mainColumnCard">
                  <Topics typeTopics={typeTopics} />
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
    typeTopics: state.topic.topicDatas.all,
  }
})(Index);
