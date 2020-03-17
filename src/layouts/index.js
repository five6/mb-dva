import styles from './index.css';
import React, { Component } from 'react';
import {
  Layout,
  Menu,
} from 'antd';


const { Header, Footer, Content } = Layout;

class BasicLayout extends Component{

  state = {
    defaultSelectedKeys: ['1']
  }

  render() {

    const {defaultSelectedKeys} = this.state;
    if(this.props.location.pathname === '/login') {
      return <div>登录</div>
    }
    return (
      // <div className={styles.normal}>
      //   <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      //   {this.props.children}
      // </div>
      <Layout className="layout">
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className={styles.logo}>
              <img style={{flat: 'left'}} src="logo.jpg" alt="logo" />
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={defaultSelectedKeys}
              style={{ lineHeight: '64px' }}
            >
              {/* <Menu.Item key="1">
                <img style={{flat: 'left'}} src={'../assets/logo.png'} alt="logo" />
              </Menu.Item> */}
              <Menu.Item key="1">情感</Menu.Item>
              <Menu.Item key="2">纠纷</Menu.Item>
              <Menu.Item key="3">关于</Menu.Item>
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
