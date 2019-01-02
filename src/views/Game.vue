<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-layout row wrap justify-center>
                <h1>{{ msg }} {{ player }}</h1>
            </v-layout>
            <v-layout row wrap justify-center>
            	<h1>{{ role }}</h1>
            </v-layout>
            <v-layout row justify-center wrap>
                <v-flex xs12 sm6 md3>
                    <v-text-field v-model="stock" label="Stock" box disabled></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row justify-center wrap>
                <v-flex xs12 sm6 md3>
                    <v-text-field v-model="backlog" label="Backlog" box disabled></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-flex xs12 sm6 md3>
                    <v-text-field v-model="order" cache-items class="mx-3" label="下單數量" :disabled="field_disabled" solo-inverted type="number"></v-text-field>
                </v-flex>
                <v-flex xs1>
                    <v-btn color="success" :disabled="btn_disabled" @click="lock">LOCK</v-btn>
                </v-flex>
            </v-layout>
            <v-layout row justify-center wrap>
                <v-flex xs12 sm6 md3>
                    <v-text-field v-model="imcoming" label="Imcoming order" box disabled></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row justify-center wrap>
                <v-flex xs12 sm6 md3>
                    <v-text-field v-model="received" label="上游實際出貨" box disabled></v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    data() {
        return {
            btn_disabled: true,
            field_disabled: true,
            role: '',
            stock: '15',
            backlog: '0',
            imcoming: '0',
            received: '0',
            order: '',
            msg: '等待其他玩家加入中...',
            player: '剩餘4人'

        }
    },
    created() {
    	this.$socket.emit('getRole');
    },
    sockets: {
    		receivedRole(role) {
    			this.role = role;
    		},
    		getOccupiedCharacter(roles) {
    			let counter = 0
    			for(let ele in roles){
    				if(roles[ele] == true)
    					counter++
    			}
    			counter = 4 - counter
    			this.player = '剩餘' + counter.toString() + '人'

    			if (this.player == 4) {
    				this.player = ''
    			}
    		},
        startGame() {
        	this.msg = '玩家加入完畢 遊戲開始'
        	this.player = ''
        	this.btn_disabled = false
        	this.field_disabled = false
        },
        updateGame(data) {

        }
    },
    methods: {
        lock() {
            this.btn_disabled = true
            this.field_disabled = true
            if (this.order == '') this.order = 0
            this.$socket.emit('sendData', this.order);
        }
    }
};
</script>