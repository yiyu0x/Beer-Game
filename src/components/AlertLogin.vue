<template>
    <div>
        <v-alert v-model="msg" 
                    :value="show" 
                    :color="color"
                    outline
                    transition="scale-transition">
            {{ msg }}
        </v-alert>
    </div>
</template>
<script>
import { eventBus } from '../main';
export default {
    data () {
        return {
            show: false,
            color: 'warning',
            msg: '登入後即可開始遊玩'
        }
    },
    created () {
        eventBus.$on('LoginStatus', (status) => {
            this.show = true;
            if (status == 1) {
                this.msg = '登入成功';
                this.color= 'success';
            } else {
                this.msg = '登入失敗';
                this.color= 'error';
            }
        });
        eventBus.$on('RegisterStatus', (status) => {
            this.show = true;
            if (status == 1) {
                this.msg = '註冊成功';
                this.color= 'error';
            } else {
                this.msg = '註冊失敗';
                this.color= 'error';
            }
        });
    }

};
</script>