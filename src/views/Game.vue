<template>
    <v-layout wrap>
        <v-flex xs12>
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
            btn_disabled: false,
            field_disabled: false,
            role: 'Retailer',
            stock: '15',
            backlog: '0',
            imcoming: '0',
            received: '0',
            order: ''

        }
    },
    created() {

    },
    sockets: {
        getInfo(users) {
            this.btn_disabled = false
            // console.log('getOnlineClients', users)
        }
    },
    methods: {
        lock() {
            this.btn_disabled = true
            this.field_disabled = true
        }
    }
};
</script>