import styles from './index.less';
import React, { Component } from 'react';
import RightContent from './RightContent';
import {
  Layout,
  Menu,
  Input,
  message
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { getLoginUserInfo } from '@/utils/authority';

const { Header, Footer, Content } = Layout;
const { Search } = Input;


class BasicLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultSelectedKeys: [props.location.pathname]
    }
    const userInfo = getLoginUserInfo();
    if(!userInfo) {
      router.push('/login');
      return;
    }
  }

  // 切换page
  changePage = (attr) => {
    router.push(attr.key);
  }

  handleNoticeVisibleChange = visible => {
    if (visible) {
      const { dispatch } = this.props;
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'userCenter') {
      router.push('/account/center');
      return;
    }
    if (key === 'logout') {
      dispatch({
        type: 'user/logout',
      });
    }
  };


  render() {

    const { defaultSelectedKeys } = this.state;

    const props = {
      currentUser: {},
      onMenuClick: this.handleMenuClick,
    }

    return (
      // <div className={styles.normal}>
      //   <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      //   {this.props.children}
      // </div>
      <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className={styles.logo}>
            <img  style={{ flat: 'left', width: '100%', height: '100%' }} src={require('@/assets/logo/logo.png')} alt="logo" />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={defaultSelectedKeys}
            style={{ lineHeight: '64px' }}
            onSelect={this.changePage}
          >
            <Menu.Item key="/">首页</Menu.Item>
            <Menu.Item key="/good">精华</Menu.Item>
            <Menu.Item key="/share">分享</Menu.Item>
            <Menu.Item key="/ask">问答</Menu.Item>
            <Menu.Item key="/job">招聘</Menu.Item>
          </Menu>
          <Search
            size="large"
            className="top-search"
            placeholder="输入感兴趣的话题试试"
            onSearch={value => message.info('服务开发中。。。')}
          />
          <RightContent {...props} {...this.props} />
        </Header>
        <Content className={styles.ant_layout_content}>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}> Copyright © 2018-2020 56网站. 沪ICP备15039329号-2	</Footer>
      </Layout>
    );
  }
}


export default connect()(BasicLayout);
