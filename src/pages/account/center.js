import React, { Component } from 'react';



class BlogDetail extends Component{

  state={
    blogs: {
      name: '账户中心'
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
