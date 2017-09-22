import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)
import Home from "@/components/Home/Home"
import Video from "@/components/Video/Video"
import Product from "@/components/Product/Product"
import Profile from "@/components/Profile/Profile"
import tuijian from "@/components/Home/HomeChild/tuijian"
import wangzhe from "@/components/Home/HomeChild/wangzhe"
import zixun from "@/components/Home/HomeChild/zixun"
import shipin from "@/components/Home/HomeChild/shipin"
import tuji from "@/components/Home/HomeChild/tuji"

export default new Router({
  routes: [
  		{
  			path:'/',
  			component:Home,
  		},
  		{
  			path:'/home',
  			component:Home,
        children:[
            {
               path:'tuijian',
               component:tuijian
            },
            {
               path:'wangzhe',
               component:wangzhe
            },
            {
               path:'zixun',
               component:zixun
            },
            {
               path:'shipin',
               component:shipin
            },
            {
               path:'tuji',
               component:tuji
            },
         ]
  		},
  		{
  			path:'/video',
  			component:Video,
  		},
  		{
  			path:'/product',
  			component:Product,
  		},
  		{
  			path:'/profile',
  			component:Profile,
  		},
  ]
})
