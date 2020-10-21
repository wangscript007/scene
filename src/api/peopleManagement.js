module.exports = {
    /* 
    *  接口方法名: {
*        url: '接口路由',
*        methods: '请求方法 get/post'
    *   }
    *  用法：$http(接口方法名, params:没有参数传{}可不传,res=> {}成功回调) 
    */

    // 列表
  peopleList: {
    url: '/labor/v1/workerLists',
    methods: 'get'
  },
  // 获取项目列表
  projectList: {
      url: '/labor/v1/getProId',
      methods: 'get'
  },
  // 获取参建单位列表
  contractor: {
    url: '/labor/v1/contractor_corp',
    methods: 'post'
},
// 根据参建单位获取班组列表
getTeamID: {
    url: '/member/teamclass/basisBcorpIdGetLists',
    methods: 'get'
},
  // 下拉框请求
  initSelect: {
      url: '/labor/v1/projectTeamAndTwoList',
      methods: 'get'
  },
  // 上传抓拍头像照片 
  uploadedImg: {
      url: '/labor/v1/uploadHeadImg',
      methods: 'post'
  },
  // 保存并返回
  submitForm: {
      url: '/labor/v1/workers',
      methods: 'post'
  },
  //参建单位列表
  contractor: {
      url: '/labor/v1/contractor_corp',
      methods: 'post'
  },
  // 删除
  peopleDelete: {
      url: '/labor/v1/workers',
      methods: 'post'
  },
  //身份证失去焦点进行验证
  code: {
      url: '/labor/v1/getWorkerInfoByIdCardnumber',
      methods: 'get'
  }
}