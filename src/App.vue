<template>
  <v-app>
      <ToolBar/>
      <v-container>
      <router-view></router-view>
      </v-container>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar'
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
