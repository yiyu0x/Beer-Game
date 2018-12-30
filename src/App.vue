<template>
  <v-app>
      <ToolBar/>
      <AlertLogin/>
      <v-container>
      <router-view></router-view>
      </v-container>
  </v-app>
</template>

<script>
import ToolBar from './components/ToolBar'
import AlertLogin from './components/AlertLogin'
export default {
  name: 'App',
  components: {
    ToolBar,
    AlertLogin
  },
  data () {
    return {
      //
    }
  }
}
</script>
