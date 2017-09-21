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
					<swiper-slide v-for="(item,index) in navList" :key="index">
						<span :class="{bgcolor:selectIndex==index}" @click="pushTo(index,item.id)">
							{{item.name}}
						</span>
					</swiper-slide>
				</swiper>
			</div>
			<div class="navListRight" >
				<icon name="功能" :scale="2.5"></icon>
			</div>
		</div>
		<div class="content">
			<ul>
				<li v-for="item in contentData">
					<div class="conLeft">
						<div>{{item.Htitle}}</div>
						<div>
							<span>{{item.Hfrom}}</span>
							<span>{{item.Hupdatetime|times}}小时前</span>
						</div>
					</div>
					<div class="conRight">
						<img :src=item.Hthumb>
					</div>
				</li>
			</ul>
			<div @click="loadMore">加载更多</div>
		</div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
			        selectIndex:"1",
			        contentData:[],
			        pageNo:1,
			    }
		},
		activated(){
			var _this=this;
			this.$http.get(window.apiAddress+"/api/home?pageNo=1&channel=1").then(function(response){
				_this.contentData=response.data.returnData.list;
				console.log(_this.contentData);
			})
			this.$http.get(window.apiAddress+"/api/category").then(function(response){
				for(var item of response.data.returnData){
					var arr=item.split(",")
					var obj={};
					obj.name=arr[0];
					obj.id=arr[1];
					_this.navList.push(obj);
				}
			})
		},
		methods:{
			pushTo(index,id){
				this.selectIndex=index;
			},
			loadMore(){
				this.pageNo++
				var _this=this;
				this.$http.get(window.apiAddress+"/api/home?pageNo="+this.pageNo+"&channel=1").then(function(response){
					for(var item of response.data.returnData.list){
						_this.contentData.push(item)
					}
				})
			}
		},
		filters:{
			times(val){
				val=parseInt(val)
				let pubTime = new Date(val);
				let hours = pubTime.getHours();
				let nowTime= new Date();
				let hours1 = nowTime.getHours();
				return hours1-hours

			}
		}
	}
</script>
<style lang="scss" scoped>
	.bgcolor{
		color:blue
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
		.content{
			ul{
				display: flex;
				flex-direction:column;
				li{
					display: flex;
					flex-direction: row;
					height: 90px;
					border-bottom: 1px solid #ccc;
					padding: 10px;
					.conLeft{
						width: 70%;
						display: flex;
						flex-direction:column;
						padding-right:10px;
						div:nth-child(1){
							flex: 5;
						} 
						div:nth-child(2){
							flex:1;
							display: flex;
							justify-content: space-between;
							font-size: 12px;
							color: #999; 
						}
					}
					.conRight{
						width: 30%;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>