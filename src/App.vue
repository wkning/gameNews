<template>
  <div id="app">
    <keep-alive>
    	<router-view></router-view>
    </keep-alive>	
    <Tabber></Tabber>
  </div>
</template>

<script>
import Tabber from "@/components/Tabber/Tabber"
export default {
  name: 'app',
  components:{Tabber}
}
</script>

<style lang="scss">
@import url('./assets/reset.css');
	#app{
	  padding-bottom: 50px;
	}
</style>
