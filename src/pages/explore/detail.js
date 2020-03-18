import React, { Component } from 'react';



class BlogDetail extends Component{

  state={
    blogs: {
      name: '日志列表'
    }
  }

  render() {
    const {blogs} = this.state;
    return(
    <div>{blogs.name}</div>
    )
  }

}

export default BlogDetail;
