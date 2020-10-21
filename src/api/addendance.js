module.exports = {
    /* 
    *  接口方法名: {
*        url: '接口路由',
*        methods: '请求方法 get/post'
    *   }
    *  用法：$http(接口方法名, params:没有参数传{}可不传,res=> {}成功回调) 
    */

    // 列表
    getAttendList: {
    url: '/labor/v1/workInOutLists',
    methods: 'get'
  },
  // 监听搜索
  search: {
      url: '/labor/v1/proWorkerLists',
      methods: 'get'
  },
  // 删除
  teamDelete: {
      url: '/labor/v1/team',
      methods: 'post'
  }
}