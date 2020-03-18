export default {
  // 支持值为 Object 和 Array
  'GET /api/v1/blogs': {
    items: [
      {id: 11111, title: '第一次写技术博客', date: 1584498530706, content: 'dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。'},
      {id: 22222, title: '第二次写技术博客', date: 1584498530706, content: 'dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。'},
      {id: 33333, title: '第三次写技术博客', date: 1584498530706, content: 'dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。'},
      {id: 44443, title: '第四次写技术博客', date: 1584498530706, content: 'dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。'},
      {id: 55555, title: '第五次写技术博客', date: 1584498530706, content: 'dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。'}
    ]
   },

  // GET POST 可省略
  '/api/v1/users/1': {id: 11111, title: '第一次写技术博客', date: 1584498530706, content: 'dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。'}
  ,

  // 支持自定义函数，API 参考 express@4
  'POST /api/v1/blogs': (req, res) => { res.end('OK'); },
};