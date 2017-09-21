<template>
	<div id="Tabber">
		<ul>
			<li v-for="(item,index) in tabberList" @click="pushTo(item.path,index)" :class="{active1:index===selectIndex}">
				<span>
					<icon :name=item.title :scale="2.4"></icon>
				</span>
				<span>{{item.title}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tabberList:[
					{
						path:"/home",
						title:"主页"
					},
					{
						path:"/video",
						title:"视频"
					},
					{
						path:"/product",
						title:"商城"
					},
					{
						path:"/profile",
						title:"个人"
					},
				],
				selectIndex:"0"
			}
		},
		methods:{
			pushTo(path,index){
				this.selectIndex=index;
				this.$router.push(path);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.active1{
		color:#523BFA;
	}
	#Tabber{
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #F8F7F7;
		border-top: 1px solid #ccc;
		ul{
			display: flex;
			flex-direction: row;
			color: #ccc;
			li{
				flex: 1;
				display: flex;
				flex-direction:column;
				font-size: 12px;
				padding-top: 5px;
				span{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					line-height: 20px;
				}
			}
		}
	}
</style>