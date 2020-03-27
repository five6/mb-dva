import React, { Component } from 'react';
import styles from './index.css';



class BlogDetail extends Component{

  state={
    blogs: {
      name: '发现感兴趣'
    }
  }

  render() {
    
    return(
      <div className={styles.normal}>
          探索
      </div>
    )
  }

}

export default BlogDetail;
