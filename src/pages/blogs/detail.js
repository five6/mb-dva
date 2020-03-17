import React, { Component } from 'react';


class BlogDetail extends Component{

  state={
    blogInfo: {
      name: '日志详情'
    }
  }

  render() {
    const {blogInfo} = this.state;
    return(
    <div>{blogInfo.name}</div>
    )
  }

}

export default BlogDetail;
