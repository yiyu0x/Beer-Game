<template>
  <v-toolbar>
    <v-toolbar-title>啤酒遊戲</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat :to="{name: 'home'}">首頁</v-btn>
      <v-btn flat :to="{name: 'lobby'}">大廳</v-btn>
      <v-btn flat :to="{name: 'game'}">遊玩</v-btn>
      <v-btn flat :to="{name: 'home'}" @click="logout">登出</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  data: () => ({}),
  methods: {
  	logout () {
  		localStorage.removeItem('token');
  	}
  }
};
</script>