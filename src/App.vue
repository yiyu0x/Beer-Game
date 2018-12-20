<template>
  <v-app>
      <ToolBar/>
      <router-view></router-view>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar'
// import ButtonBox from './components/ButtonBox'
export default {
  name: 'App',
  components: {
    ToolBar
  },
  data () {
    return {
      //
    }
  }
}
</script>
