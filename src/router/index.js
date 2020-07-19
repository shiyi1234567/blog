import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Home from '../components/Home.vue'
import Study from '../components/Study.vue'
import VideoRoom from '../components/VideoRoom.vue'
import Photo from '../components/Photo'
import ArticleDetail from '../components/ArticleDetail'
import UserSystem from '../components/UserSystem'
import DataSystem from '../components/DataSystem'
import MainContent from '../components/MainContent'
import SetPage from '../components/SetPage'
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

  const routes = [
  {
      path:'/',
      redirect: '/login'
  },
  {
    /*登录注册页面*/
    path: '/login',
    name: 'loginLink',
    component: Login
  },
  {
    /*注册成功的主页*/
      path:"/index",
      name:"indexLink",
      component:Index,
      redirect: '/index/home',
      children:[
          {
              /*主页中的首页*/
              path:"/index/home",
              name:"indexHomeLink",
              component:Home
          },
          {
              /*主页中的文档页*/
              path:"/index/study",
              name:"indexStudyLink",
              component:Study,
              redirect: '/index/study/vue',
              children:[
                  {
                      /*文档页中的分类查询*/
                      path:"/index/study/:id",
                      name:"indexStudyWordLink",
                      component:MainContent
                  }
              ]
          },
          {
              /*主页中的影音室页*/
              path:"/index/videoroom",
              name:"indexVideoRoomLink",
              component:VideoRoom
          },
          {
              /*主页中的摄影页*/
              path:"/index/photo",
              name:"indexPhotoLink",
              component:Photo
          },
          {
              /*文章详情页*/
              path:"/index/article/study/:id",
              name:"articleLink",
              component:ArticleDetail
          },
          {
              /*用户管理中心*/
              path:"/index/usersystem",
              name:"userSystemLink",
              component:UserSystem
          },
          {
              /*数据管理中心*/
              path:"/index/datasystem",
              name:"dataSystemLink",
              component:DataSystem
          },
          {
              /*设置*/
              path:"/index/setting",
              name:"settingLink",
              component:SetPage
          }
      ]
  }

  //{
      //path: '/about',
    //name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to,from,next)=>{
    /*
    * 登录情况
    * 1.除了登录注册页面，所有页面都至少是游客登录
    * 2.特殊页面：必须是注册用户登录
    * */
    console.log(to);
   if(to.name==="loginLink" || to.fullPath.includes('static')){
       /*登录页面 直接放行*/
       next();
   }else{
       /*非登陆页面  验证是否有过登录*/
       if(0===getLoginStatus()){
           /*未登录，跳转登录页面*/
           next({
               path:'/login'
           })
       }else{
           next();
       }
   }
});
function getLoginStatus() {
    /*刷新当前页面  自动登录*/
    let username = sessionStorage.getItem("userName")||"";
    let userid = sessionStorage.getItem("userId")||"";
    store.commit('updateUser',{
        userName:username,
        userId:userid
    });
    if(username!==""&&userid!==""){
        return 1
    }else{
        return 0
    }
}
export default router
