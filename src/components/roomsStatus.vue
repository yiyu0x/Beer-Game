<template>
    <v-flex xs12 sm7 offset-sm1>
        <v-card>
            <v-toolbar color="orange" dark>
                <v-toolbar-title>遊戲房間</v-toolbar-title>
            </v-toolbar>
            <v-list>
                <v-list-tile v-for="(item,index) in rooms" avatar @click="" :key="index">
                    <v-list-tile-action>
                        <v-icon color="orange">star</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.roomName" @click="selectRoom(item)"></v-list-tile-title>
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
            rooms: []
        }
    },
    created() {
        this.$socket.emit('fetchRoomList');
    },
    sockets: {
        getRoomList(rooms) {
            this.rooms = rooms
            console.log('getRoomList', rooms)
        }
    },
    methods: {
        selectRoom(info) {
            this.$socket.emit('chooseRoom', {
              roomID: info.roomID, 
              roomName: info.roomName
            }, function(err) {
              console.log(err)
            })
            this.$router.push({ path: "room" });
        }
    }
}
</script>