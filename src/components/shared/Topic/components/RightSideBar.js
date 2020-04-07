import React, { Component } from 'react';
import { PageHeader, Menu, Dropdown, Icon, Button, Tabs, Typography, Row, message } from 'antd';
import { getLoginUserInfo } from '@/utils/authority';
import {getAvatar} from '@/utils/common.utils';


class RightSideBar extends Component{

  state={

  }

  render() {
    const userInfo = getLoginUserInfo();
    return(
      <div>
        <div className="Card">
        <ul className="GlobalSideBar-navList">
          <li className="GlobalSideBar-navItem">
            <a className="Button GlobalSideBar-navLink Button--plain">
              <span className="GlobalSideBar-navText">个人信息</span>
            </a>
          </li>
          <li className="GlobalSideBar-navItem">
            <a className="Button GlobalSideBar-navLink right-base-navItem Button--plain">
              <img alt={userInfo.username} style={{width: '48px', height: '48px'}} src={getAvatar(userInfo)} className="Avatar UserLink-avatar"/>
                <span className="GlobalSideBar-navText">{userInfo.username}</span>
            </a>
          </li>
        </ul>
        </div>
        <div className="Sticky">
          <div className="Card GlobalWrite">
            <a href="/topics/topic-edit" className="GlobalWrite-navItem">
              <Icon className="Zi Zi--Paper GlobalWrite-navIcon" type="file-text" theme="filled" />
              <div className="GlobalWrite-navTitle">发布话题</div>
            </a>
            <a onClick={e => message.info('功能暂未实现')} className="GlobalWrite-navItem">
              <Icon className="Zi Zi--Paper GlobalWrite-navIcon" type="edit" theme="filled" />
              <div className="GlobalWrite-navTitle">写想法</div>
            </a>
            <a onClick={e => message.info('功能暂未实现')}  className="GlobalWrite-navItem">
              <Icon className="Zi Zi--Paper GlobalWrite-navIcon" type="edit" theme="filled" />
              <div className="GlobalWrite-navTitle">发图片</div>
            </a>
            <a onClick={e => message.info('功能暂未实现')} className="GlobalWrite-navItem">
              <Icon className="Zi Zi--Paper GlobalWrite-navIcon" type="edit" theme="filled" />
              <div className="GlobalWrite-navTitle">草稿箱</div>
            </a>
          </div>
          {/* <div className="Pc-card Card">
              <a className="Banner-link">
                <img src="https://pic2.zhimg.com/70/v2-35ca172745b0100c0634a095b17310e5.jpg"/>
              </a>
          </div> */}
          <div className="Card">
            <ul className="GlobalSideBar-navList">
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="star" theme="filled" />
                  <span className="GlobalSideBar-navText">我的收藏</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="heart" theme="filled" />
                  <span className="GlobalSideBar-navText">我的关注</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="heart" theme="filled" />
                  <span className="GlobalSideBar-navText">填充内容</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="heart" theme="filled" />
                  <span className="GlobalSideBar-navText">填充内容</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="heart" theme="filled" />
                  <span className="GlobalSideBar-navText">填充内容</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="heart" theme="filled" />
                  <span className="GlobalSideBar-navText">填充内容</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="heart" theme="filled" />
                  <span className="GlobalSideBar-navText">填充内容</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="heart" theme="filled" />
                  <span className="GlobalSideBar-navText">填充内容</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
              <li className="GlobalSideBar-navItem GlobalSideBar-starItem">
                <a className="Button GlobalSideBar-navLink Button--plain">
                  <Icon className="Zi Zi--Star GlobalSideBar-navIcon" type="heart" theme="filled" />
                  <span className="GlobalSideBar-navText">填充内容</span>
                  <span className="GlobalSideBar-navNumber">0</span>
                </a>
              </li>
            </ul>
          </div>
      </div>
      </div>
    )
  }

}

export default RightSideBar;
