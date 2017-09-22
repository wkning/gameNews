<template>
	<div id="Video">
		<div class="navList">
			<div class="navListLeft">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in navList" :key="index" style="text-align:center;">
						<span  @click="pushTo(index,item.id)" :class="{bgcolor:(videoIndex-1)==index}">
							{{item.name|names}}
						</span>
					</swiper-slide>
				</swiper>
			</div>
			<div class="navListRight" >
				<icon name="功能" :scale="2.5"></icon>
			</div>
		</div>
		<div class="content">
			<div v-for="(item,index) in videoList" :key="index" class="videoDiv">
				<div>
					<video width="100%" height="240" controls="controls">
			  			<source :src=item.videoUrl type="video/mp4">
					</video>
				</div>
				<div>
					<span><img :src=item.videoPhoto style="width:40px;height40px;"></span>
					<span>{{item.videoProviders}}</span>
					<span style="font-size:12px;">{{item.videoViews}}次播放</span>
					<span><icon name="气泡" :scale="2"></icon></span>
					<span>{{item.videoComments}}</span>
					<span><icon name="分享" :scale="2"></icon></span>
				</div>
			</div>
			<div @click="loadMore">加载更多</div>
		</div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapState} from 'vuex'
require('swiper/dist/css/swiper.css') 
	export default{
		data(){
			return {
				navList:[],
				swiperOption: {
			          pagination: '.swiper-pagination',
			          slidesPerView: 5,
			          paginationClickable: true,
			          spaceBetween: 5,
			          freeMode: false
			        },
			    videoList:[],
			    pageNo:1    
			}
		},
		activated(){
			var _this=this;
			this.$http.get(window.apiAddress+"/api/category1").then(function(response){
				var j=0;
				var arrNames=response.data.returnData.news_category.chinese.split(",")
				var arrNids=response.data.returnData.news_category.nid.split(",")
				var arrLength=arrNames.length;
				_this.navList=[]
				for(var i=0; i<arrLength; i++){
					var obj={};
					obj.name=arrNames[i];
					obj.id=arrNids[i];
					_this.navList.push(obj)
				}
			})
			this.$http.get(window.apiAddress+"/api/video?pageNo=1&nid=9999").then(function(response){
					_this.videoList=response.data.returnData.videoList
				
			})
		},
		filters:{
			names(val){
				return val.substr(0,4)
			}
		},
		methods:{
			pushTo(index,id){
				this.$store.state.videoIndex=index+1;
				var _this=this
				window.localStorage.setItem('nid',id);
				this.videoList=[];
				this.pageNo=1;
				this.$http.get(window.apiAddress+"/api/video?pageNo=1&nid="+window.localStorage.getItem("nid")).then(function(response){
					_this.videoList=response.data.returnData.videoList
				
				})
			},
			loadMore(){
				this.pageNo++;
				var _this=this;
				console.log(window.apiAddress+"/api/video?pageNo="+this.pageNo+"&nid="+window.localStorage.getItem("nid"))
				this.$http.get(window.apiAddress+"/api/video?pageNo="+this.pageNo+"&nid="+window.localStorage.getItem("nid")).then(function(response){
					for(var item of response.data.returnData.videoList){
						_this.videoList.push(item)
					}
				})
			}
		},
		computed:mapState({
			videoIndex:function(state){
				if(state.videoIndex){
					this.$store.commit('videoIndexs',state.videoIndex)
				}
				let localData = window.localStorage.getItem('videoIndex')
				state.videoIndex=localData
				return state.videoIndex;
			}
		})
	}
</script>
<style lang="scss" scoped>
	.bgcolor{
		color: #00A4FC;
	}
	#Video{
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
			display: flex;
			flex-direction: column;
			.videoDiv{
				flex: 1;
				display: flex;
				flex-direction: column;
				div:nth-child(2){
					display: flex;
					flex-direction: row;
					height: 60px;
					span{
						flex: 1;
						display: flex;
						justify-content: center;
						align-items:center;
					}
					span:nth-child(2){
						flex: 2;
						font-size: 14px;
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}
					span:nth-child(3){
						flex: 2;
						font-size: 12px;
					}
				}
			}
			
		}
	}
</style>
