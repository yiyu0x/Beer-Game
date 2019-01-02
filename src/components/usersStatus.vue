<template>
    <v-flex xs12 sm4 offset-sm0>
        <v-card>
            <v-toolbar color="green" dark>
                <v-toolbar-title>在線用戶</v-toolbar-title>
            </v-toolbar>
            <v-list>
                <v-list-tile v-for="(item, index) in items" avatar @click="" :key="index">
                    <v-list-tile-action>
                        <v-icon color="green">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card>
    </v-flex>
</template>
<script>
export default {
    data() {
        return {
            items: []
        }
    },
    sockets: {
        getOnlineClients(users) {
            this.items = users
            console.log('getOnlineClients', users)
        }
    },
    created() {
        this.$socket.emit('fetchOnlineClients');
    }
}
</script>