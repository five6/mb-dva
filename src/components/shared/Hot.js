import React, { Component } from 'react';


class BlogDetail extends Component{

  state={
    blogInfo: {
      name: '日志详情'
    }
  }

  render() {
    return(
        <div className="TopstoryContent">
            <div className="ListShortcut">
                <div className="Topstory-follow">
                    <div>
                        {
                            [1,2,3].map((item, index) => {
                            return <div key={item} className="Card TopstoryItem TopstoryItem-isFollow">{index}</div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
  }

}

export default BlogDetail;
