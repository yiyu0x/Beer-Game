<template>
    <div>
        <v-dialog v-model="dialog_login" persistent max-width="600px">
            <v-btn slot="activator" dark>登入</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">登入</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field :rules="rules" v-model="loginUserName" label="User name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field :rules="rules" v-model="loginUserPasswd" label="Password" type="password" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog_login = false">關閉</v-btn>
                    <v-btn color="blue darken-1" flat @click="login">登入</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog_register" persistent max-width="600px">
            <v-btn slot="activator" dark>註冊帳號</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">註冊</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field :rules="rules" v-model="registerUserName" label="User name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field :rules="rules" v-model="registerUserPasswd" label="Password" type="password" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog_register = false">關閉</v-btn>
                    <v-btn color="blue darken-1" flat @click="submit()">送出</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { eventBus } from "../main";
export default {
    data: () => ({
        rules: [v => !!v || "can not empty"],
        dialog_login: false,
        dialog_register: false,
        loginUserName: "",
        loginUserPasswd: "",
        registerUserName: "",
        registerUserPasswd: ""
    }),
    methods: {
        login() {
            // this.dialog_login = false;
            const data = {
                username: this.loginUserName,
                password: this.loginUserPasswd
            };

            if (this.loginUserName == "" || this.loginUserPasswd == "") {
                eventBus.$emit("LoginStatus", 0);
                return;
            }
            // console.log(this.loginUserName, this.loginUserPasswd)
            fetch("http://localhost:3000/login", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(function(response) {
                    return response.json();
                })
                .then(jsonData => {
                    if (jsonData.status == 1) {
                        // 登入成功
                        localStorage.setItem("token", "ImLogin");
                        this.dialog_login = false;
                        eventBus.$emit("LoginStatus", 1);
                        // console.log('登入成功')
                    } else {
                        // 登入失敗
                        eventBus.$emit("LoginStatus", 0);
                        // console.log('登入失敗 帳號或密碼錯誤')
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        submit() {
            this.dialog_register = false;

            const data = {
                username: this.registerUserName,
                password: this.registerUserPasswd
            };

            if (this.registerUserName == "" || this.registerUserPasswd == "") {
                eventBus.$emit("RegisterStatus", 0);
                return;
            }
            // console.log(this.loginUserName, this.loginUserPasswd)
            fetch("http://localhost:3000/register", {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(function(response) {
                    return response.json();
                })
                .then(jsonData => {
                    if (jsonData.status == 1) {
                        // 註冊成功
                        // console.log('註冊成功')
                        eventBus.$emit("RegisterStatus", 1);
                    } else {
                        // 註冊失敗
                        // console.log('註冊失敗 用戶已存在')
                        eventBus.$emit("RegisterStatus", 0);
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
};
</script>