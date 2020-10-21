module.exports = {
        /* 
    *  接口方法名: {
*        url: '接口路由',
*        methods: '请求方法 get/post'
    *   }
    *  用法：$http(接口方法名, params:没有参数传{}可不传,res=> {}成功回调) 
    */

// 智能手环
  bracelet: {
    url: '/labor/v1/getHandList',
    methods: 'get'
  },
  // 人脸识别设备
  device: {
    url: '/labor/v1/faceMachineList',
    methods: 'get'
  },
  // 编辑设备
  deviceEdit: {
      url: '/labor/v1/updateMachine',
      methods: 'post'
  },
  // 移除设备
  deviceDelete: {
      url: '/labor/v1/deleteMachine',
      methods: 'post'
  },
  // 取消绑定
  cancel: {
      url: '/labor/v1/cancelHand',
      methods: 'post'
  }
}