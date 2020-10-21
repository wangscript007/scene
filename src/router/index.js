import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import WuyeHome from '../views/Home'
import peopleManagement from '../views/peopleManagement/peopleManagement'
import store from '../store'

Vue.use(VueRouter)

/**
 * hidden:            不在侧边栏显示 meta里还有一个hidden
 * noLogin：          不需要登录
 * defaulNeedrefresh
 * defaultActive
 * 
 */
const routes = [
  { path: '/login', name: 'login', hidden: true, meta: { title: '登录', noLogin: true }, component: () => import('../views/Login') },
  { path: '/404', name: '404', hidden: true, meta: { title: '404', noLogin: true }, component: () => import('../views/404') },
  {
    path: '/',
    component: WuyeHome,
    name: '班组管理',    
    iconCls: 'iconfont iconrenyuan',
    leaf: true,//只有一个节点
    children:[
      { path: '/', name: '班组管理', meta: { title: '班组管理' }, component: () => import('../views/teamManagement/teamManagement') }
    ]
  },
  {
    path: '/device',
    component: WuyeHome,
    name: '设备管理',    
    iconCls: 'iconfont iconmachine',
    leaf: false,//只有一个节点
    children:[
      { path: '/views/device/device', name: '人脸识别设备', meta: { title: '人脸识别设备' }, component: () => import('../views/device/device') },
      { path: '/views/device/bracelet', name: '智能手环', meta: { title: '智能手环' }, component: () => import('../views/device/bracelet') }
    ]
  },
  {
    path: '/',
    component: WuyeHome,
    name: '人员管理',    
    iconCls: 'iconfont iconzhaopinguanli',
    leaf: true,
    children:[
      { path: '/peopleManagement/peopleManagement', name: '人员管理', meta: { title: '人员管理' }, component: () => import('../views/peopleManagement/peopleManagement') },
      { path: '/peopleManagement/addPeople', name: '新增人员', meta: { title: '人员管理', defaultActive: '/peopleManagement/peopleManagement', hidden: true }, component: () => import('../views/peopleManagement/addPeople') },
      { path: '/peopleManagement/addPeople', name: '编辑人员', meta: { title: '人员管理', defaultActive: '/peopleManagement/peopleManagement', hidden: true }, component: () => import('../views/peopleManagement/addPeople') }
    ]
  },
  {
    path: '/attendance',
    component: WuyeHome,
    name: '考勤记录',    
    iconCls: 'iconfont iconshebei',
    leaf: true,
    children:[
      { path: '/attendance/attendance', name: '考勤记录', meta: { title: '考勤记录' }, component: () => import('../views/attendance/attendance') }
    ]
  },
  { path: '*', hidden: true, redirect: { path: '/404' } }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.hidden && to.meta.defaulNeedrefresh) {
    to.meta.defaultActive = from.fullPath
  }
  next()
  if(!store.state.token && !to.meta.noLogin) {
      alert('请您先登录')
      next('/login')
  } else {
      next()
  }
})

router.afterEach((to, from) => {
  let title = to.meta.title
  if (title) document.title = title
})

export default router
