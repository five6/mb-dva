
import React from 'react';

const StrSubstringPipe = props => {
  let content = props.content || '';
  const textlength = props.textlength || 30;
  if (content.length > textlength) {
    content = content.substring(0, textlength);
  }
  return <span className="nowrap">{content}</span>;
}

export default StrSubstringPipe;