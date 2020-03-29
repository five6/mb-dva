
import {
  Popover
} from 'antd';
import React from 'react';
import styles from './index.less';

const CommonPopover = props => {
  let value = '';
  const { placement } = props.placement || 'top';
  const title = props.title || '';
  const content = props.content || '';
  const textlength = props.textlength || 18;
  if (content.length > textlength) {
    const str = content.substring(0, textlength);
    value = <Popover overlayClassName={styles.commonPopover} placement={placement} title={title} content={content}><span className="nowrap">{str}...</span></Popover>;
  } else {
    value = <span className="nowrap">{content}</span>;
  }
  return value
}

export default CommonPopover;