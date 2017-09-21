import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)
import Home from "@/components/Home/Home"
import Video from "@/components/Video/Video"
import Product from "@/components/Product/Product"
import Profile from "@/components/Profile/Profile"

export default new Router({
  routes: [
  		{
  			path:'/',
  			component:Home,
  		},
  		{
  			path:'/home',
  			component:Home,
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
