import styles from './index.css';
import React, { Component } from 'react';
import {
  Layout
} from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class BasicLayout extends Component{
  render() {

    return (
      // <div className={styles.normal}>
      //   <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      //   {this.props.children}
      // </div>
      <Layout>
        <Header>

        </Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}


export default BasicLayout;
