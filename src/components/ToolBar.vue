<template>
  <v-toolbar>
    <v-toolbar-title>啤酒遊戲</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat :to="{name: 'home'}">首頁</v-btn>
      <v-btn flat :to="{name: 'lobby'}">大廳</v-btn>
      <v-btn flat :to="{name: 'game'}">遊玩</v-btn>
      <v-menu>
      <v-btn
        transition="scale-transition"
        slot="activator"
        flat
      >
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="item.func"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      items: [
        { title: '登出', func: this.logout},
        { title: '個人資料', func: this.showProfile}
      ]
    }
  },
  methods: {
    logout() {
      const isLogin = localStorage.getItem("token") == "ImLogin";
      if (isLogin) {
        this.$router.push({ path: "home" });
        localStorage.removeItem("token");
        eventBus.$emit("LogOut", 1);
      }
    },
    showProfile() {

    }
  }
};
</script>