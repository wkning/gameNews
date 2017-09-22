<template>
	<div id="wangzhe">
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
	import {mapState} from 'vuex'
	export default{
		data(){
			return {
				contentData:[],
			    pageNo:1,
			}
		},
		activated(){
			var _this=this;
			this.$http.get(window.apiAddress+"/api/home?pageNo=1&channel="+this.channel).then(function(response){
				_this.contentData=response.data.returnData.list;
			})
		},
		methods:{
			loadMore(){
				this.pageNo++
				var _this=this;
				console.log(window.apiAddress+"/api/home?pageNo="+this.pageNo+"&channel="+this.channel)
				this.$http.get(window.apiAddress+"/api/home?pageNo="+this.pageNo+"&channel="+this.channel).then(function(response){
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
				if(hours1>hours){
					return hours1-hours
				}else{
					return hours-hours1
				}			
			}
		},
		computed:mapState({
			channel:function(state){
				if(state.channel){
					this.$store.commit('channelNum',state.channel)
				}
				let localData = window.localStorage.getItem('channel')
				state.channel=localData
				return state.channel;
			}
		})
	}
</script>
<style lang="scss" scoped>
	#wangzhe{
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