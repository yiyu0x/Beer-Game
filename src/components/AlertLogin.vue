<template>
    <!-- <div> -->
<!--         <v-alert v-model="welcome_msg" :value="welcome_show" :color="color" outline>{{ welcome_msg }}</v-alert> -->
        <!-- </div> -->
        <!-- <SnackBar/> -->
        <v-snackbar v-model="show" top>
            {{ msg }}
            <v-btn flat color="accent" @click.native="show = false">Close</v-btn>
        </v-snackbar>
    <!-- </div> -->
</template>
<script>
import { eventBus } from "../main";

// import SnackBar from "../components/SnackBar";
export default {
    data() {
        return {
            show: false,
            color: "warning",
            msg: "登入後開始遊玩",
            welcome_msg: "",
            welcome_show: ""
        };
    },
    created() {
        const isLogin = localStorage.getItem("token") == "ImLogin";
        if (isLogin) {
            this.show = true;
            this.msg = "已登入";
            this.color = "success";
            console.log('已登入')
            this.$router.push({ path: "lobby" });
        } else {
            eventBus.$on("LogOut", () => {
                this.show = true;
                this.color = "warning";
                this.msg = "已登出";
                console.log('已登出')
            });
            eventBus.$on("LoginStatus", status => {
                this.show = true;
                if (status == 1) {
                    this.msg = "登入成功";
                    this.color = "success";
                    this.$router.push({ path: "lobby" });    
                } else {
                    this.msg = "登入失敗";
                    this.color = "error";
                }
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