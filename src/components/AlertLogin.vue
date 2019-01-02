<template>
    <v-snackbar v-model="show" top>
        {{ msg }}
        <v-btn flat :color="color" @click.native="show = false">Close</v-btn>
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
        const isLogin = sessionStorage.getItem("token") == "ImLogin";
        if (isLogin) {
            let user = sessionStorage.getItem("user");
            this.show = true;
            this.msg = "已登入";
            this.color = "success";
            this.$socket.emit('init', user, function(err) {
                eventBus.$emit("errorLog", err);
            });
            this.$router.push({ path: "lobby" });
            console.log('已登入', user)
        }
        eventBus.$on("LogOut", status => {
            this.color = "warning";
            this.msg = "已登出";
            this.show = true;
            console.log('已登出')
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.$socket.emit('logout');
        });
        eventBus.$on("LoginStatus", event => {
            if (event.status == 1) {
                this.show = true;
                this.msg = "登入成功";
                this.color = "success";
                sessionStorage.setItem("token", "ImLogin");
                sessionStorage.setItem("user", event.user);
                console.log('登入成功!!', event.user)
                this.$socket.emit('init', event.user, function(err) {
                    eventBus.$emit("errorLog", err);
                });
                this.$router.push({ path: "lobby" });
            } else {
                console.log('登入失敗')
                this.msg = "登入失敗";
                this.color = "error";
                this.show = true;
            }
        });
        eventBus.$on("RegisterStatus", status => {
            if (status == 1) {
                this.msg = "註冊成功";
                this.color = "success";
            } else {
                this.msg = "註冊失敗";
                this.color = "error";
            }
            this.show = true;
        });

        eventBus.$on("exitRoom", () => {
            this.$socket.emit('exitRoom', function(err) {
                eventBus.$emit("errorLog", err);
            });
        });
        eventBus.$on("errorLog", msg => {
            this.color = "error";
            this.msg = msg;
            this.show = true;
        });
    }
}
</script>