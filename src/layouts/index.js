import styles from './index.css';
import { router } from 'umi';
import React, { Component } from 'react';
import {
  Layout,
  Menu,
} from 'antd';


const { Header, Footer, Content } = Layout;

class BasicLayout extends Component {

  state = {
    defaultSelectedKeys: ['/']
  }

  // 切换主题
  changePage = (attr) => {
    router.push(attr.key);
  }

  render() {

    const { defaultSelectedKeys } = this.state;

    return (
      // <div className={styles.normal}>
      //   <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      //   {this.props.children}
      // </div>
      <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className={styles.logo}>
            <img style={{ flat: 'left', width: '100%', height: '100%' }} src={require('@/assets/logo/logo.png')} alt="logo" />
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
        </Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Blog ©2020 Created by Five6</Footer>
      </Layout>
    );
  }
}


export default BasicLayout;
