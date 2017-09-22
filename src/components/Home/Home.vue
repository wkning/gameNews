<template>
	<div id="Home">
		<div class="header">
			<div class="market">
				<img src="../../assets/1.png" alt="">
			</div>
			<div class="leftHeader">
				<icon name="日历" :scale="2.5"></icon>&nbsp;&nbsp;&nbsp;
				<icon name="放大镜" :scale="2.5"></icon>&nbsp;&nbsp;
			</div>
		</div>
		<div class="navList">
			<div class="navListLeft">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in navList" :key="index" style="text-align:center;">
						<span :class="{bgcolor:(navIndex-1)==index}" @click="pushTo(index,item.id,item.path)">
							{{item.name}}
						</span>
					</swiper-slide>
				</swiper>
			</div>
			<div class="navListRight" >
				<icon name="功能" :scale="2.5"></icon>
			</div>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapState} from 'vuex'
require('swiper/dist/css/swiper.css') 
	export default{
		data() {
			    return {
			        swiperOption: {
			          pagination: '.swiper-pagination',
			          slidesPerView: 5,
			          paginationClickable: true,
			          spaceBetween: 10,
			          freeMode: true
			        },
			        navList:[],			        
			        paths:["/home/tuijian","/home/wangzhe","/home/zixun","/home/shipin","/home/tuji"]
			    }
		},
		activated(){
			var _this=this;
			this.$http.get(window.apiAddress+"/api/category").then(function(response){
				var j=0;
				for(var item of response.data.returnData){
					var arr=item.split(",")
					var obj={};
					obj.name=arr[0];
					obj.id=arr[1];
					obj.path=_this.paths[j];
					j++;
					_this.navList.push(obj);
				}
				console.log(_this.navList)
			})
		},
		methods:{
			pushTo(index,id,path){
				this.$store.state.navIndex=index+1;
				this.$store.state.channel=id;
				this.$router.push(path);
			},
		},
		computed:mapState({
			navIndex:function(state){
				if(state.navIndex){
					this.$store.commit('navIndexs',state.navIndex)
				}
				let localData = window.localStorage.getItem('navIndex')
				state.navIndex=localData
				return state.navIndex;
			},
		})
	}
</script>
<style lang="scss" scoped>
	.bgcolor{
		color:#00A4FC;
	}
	#Home{
		.header{
			height: 64px;
			background-color:#27A1DE;
			display: flex;
			justify-content:space-between;
			.market{
				height: 64px;
				width: 170px;
			}
			.leftHeader{
				display: flex;
				align-items: center;
			}
		}
		.navList{
			height: 40px;
			display: flex;
			flex-direction: row;
			font-size: 14px;
			.navListLeft{
				width: 87%;
				height: 40px;
				background-color:#F0EDED;
				span{
					line-height: 40px;
					text-align: center;
				}
			}
			.navListRight{
				width: 13%;
				display: flex;
				justify-content: center;
				align-items:center;
				box-shadow: -2px 2px 3px #888888;
			}
		}
	}
</style>