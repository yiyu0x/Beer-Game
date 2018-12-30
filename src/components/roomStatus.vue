<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar color="indigo" dark>
                    <v-toolbar-title>在線用戶名單</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <v-list-tile v-for="item in items" avatar @click="">
                        <v-list-tile-action>
                            <v-icon color="pink">star</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    data() {
        return {
            items: []
        }
    },
    created() {
        this.$socket.emit('fetchOnlineClients');
    },
    sockets: {
        getOnlineClients(users) {
            this.items = users
            console.log('getOnlineClients', users)
        },
        getRoomList(rooms) {
            this.rooms = rooms
            console.log('getRoomList', rooms)
        }
    }
}
</script>