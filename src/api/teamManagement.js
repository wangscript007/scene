module.exports = {
    /* 
    *  接口方法名: {
*        url: '接口路由',
*        methods: '请求方法 get/post'
    *   }
    *  用法：$http(接口方法名, params:没有参数传{}可不传,res=> {}成功回调) 
    */

    // 列表
  teamList: {
    url: '/labor/v1/TeamLists',
    methods: 'get'
  },
  // 新增or编辑
  teamAddEdit: {
      url: '/labor/v1/team',
      methods: 'post'
  },
  //参建单位列表
  contractor: {
      url: '/labor/v1/contractor_corp',
      methods: 'post'
  },
  // 删除
  teamDelete: {
      url: '/labor/v1/team',
      methods: 'post'
  }
}