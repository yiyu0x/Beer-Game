<template>
    <v-snackbar v-model="show" top>
        {{ msg }}
        <v-btn flat color="accent" @click.native="show = false">Close</v-btn>
    </v-snackbar>
</template>
<script>
import { eventBus } from "../main";
export default {
    data() {
        return {
            show: false,
            color: "warning",
            msg: "登入後開始遊玩"
        };
    },
    created() {
        // console.log('alert login!!!')
        const isLogin = localStorage.getItem("token") == "ImLogin";
        if (isLogin) {
            let user = localStorage.getItem("user");
            this.show = true;
            this.msg = "已登入";
            this.color = "success";
            this.$socket.emit('init', user);
            this.$router.push({ path: "lobby" });
            console.log('已登入', user)
        } else {
            eventBus.$on("LogOut", status => {
                // this.$router.push({ path: "home" });
                // localStorage.removeItem("token");
                this.color = "warning";
                this.msg = "已登出";
                this.show = true;
                console.log('已登出')
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                this.$socket.emit('logout');
                // this.$router.push({ path: "home" });
            });
            eventBus.$on("LoginStatus", (event) => {
                if (event.status == 1) {
                    this.show = true;
                    this.msg = "登入成功";
                    this.color = "success";
                    localStorage.setItem("token", "ImLogin");
                    localStorage.setItem("user", event.user);
                    console.log('登入成功!!', event.user)
                    this.$socket.emit('init', event.user);
                    this.$router.push({ path: "lobby" });
                } else {
                    console.log('登入失敗')
                    this.msg = "登入失敗";
                    this.color = "error";
                    this.show = true;
                }
                // this.show = true;
            });
            eventBus.$on("RegisterStatus", status => {
                this.show = true;
                if (status == 1) {
                    this.msg = "註冊成功";
                    this.color = "error";
                } else {
                    this.msg = "註冊失敗";
                    this.color = "error";
                }
            });
        }
    }
};
</script>