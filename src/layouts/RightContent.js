import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip, message } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { NoticeIcon } from 'ant-design-pro';
import HeaderDropdown from '@/components/HeaderDropdown';
import styles from './index.less';
import * as _ from 'lodash';
import {getAvatar} from '@/utils/common.utils';
import { getLoginUserInfo } from '@/utils/authority';

export default class GlobalHeaderRight extends PureComponent {

  state = {
    specAuths: []
  }

  componentDidMount() {

  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  getUnreadData = noticeData => {
    const unreadMsg = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  handleNoticeClear = type => {
    message.success(
      `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({
        id: `component.globalHeader.${type}`,
      })}`
    );
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };


  render() {
    // const currentUser = getCurrentUser() || {};
    const {
      currentUser,
      onMenuClick,
      theme,
    } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    const menuUnLogin = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="login">
        <Icon type="login" />
        <FormattedMessage id="menu.account.login" defaultMessage="登录" />
      </Menu.Item>
      <Menu.Item key="register">
        <Icon type="user-add" />
        <FormattedMessage id="menu.account.register" defaultMessage="注册" />
      </Menu.Item>
    </Menu>
    )

    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }

    const userInfo = getLoginUserInfo();

    return (
      <div className={className}>
        {
          userInfo ?
          <HeaderDropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              // size="small"
              className={styles.avatar}
              src={getAvatar(userInfo)}
              alt="avatar"
            />
            {/* <span className={styles.name}>
              个人中心
            </span> */}
          </span>
          </HeaderDropdown>:
           <HeaderDropdown overlay={menuUnLogin}>
           <span className={`${styles.action} ${styles.account}`}>
             <span className={styles.name}>
               登录</span>
           </span>
           </HeaderDropdown>
        }
      </div>
    );
  }
}
