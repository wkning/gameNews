import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		selectIndex:'',
		navIndex:'',
		channel:'',
		videoIndex:'',
		nid:''
	},
	getters:{

	},
	mutations:{
		select(state,val){
			state.selectIndex=val;
			window.localStorage.setItem('selectIndex',val);
		},
		navIndexs(state,val){
			state.navIndex=val;
			window.localStorage.setItem('navIndex',val);
		},
		channelNum(state,val){
			state.channel=val;
			window.localStorage.setItem('channel',val);
		},
		videoIndexs(state,val){
			state.videoIndex=val;
			window.localStorage.setItem('videoIndex',val);
		}
	},
	actions:{

	}
})
