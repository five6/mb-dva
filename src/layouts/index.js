import styles from './index.less';
import { router, withRouter } from 'umi';
import React, { Component } from 'react';
import RightContent from './RightContent';
import {
  Layout,
  Menu,
} from 'antd';
import { connect } from 'dva';


const { Header, Footer, Content } = Layout;


@withRouter
@connect(({ loading }) => ({ loading }))
class BasicLayout extends Component {

  state = {
    defaultSelectedKeys: ['/']
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
            {/* <Menu.Item key="1">
                <img style={{flat: 'left'}} src={'../assets/logo.png'} alt="logo" />
              </Menu.Item> */}
            <Menu.Item key="/">首页</Menu.Item>
            <Menu.Item key="/explore">发现</Menu.Item>
            <Menu.Item key="/questions">等你解惑</Menu.Item>
          </Menu>
          <RightContent {...props} {...this.props} />
        </Header>
        <Content className={styles.ant_layout_content}>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Blog ©2020 Created by Five6</Footer>
      </Layout>
    );
  }
}


export default BasicLayout;
