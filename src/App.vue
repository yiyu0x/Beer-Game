<template>
    <v-app>
        <ToolBar />
        <AlertLogin />
        <v-container>
            <router-view></router-view>
        </v-container>
    </v-app>
</template>
<script>
import ToolBar from './components/ToolBar'
import AlertLogin from './components/AlertLogin'
import { userList } from "./main";
export default {
    name: 'App',
    components: {
        ToolBar,
        AlertLogin
    },
    data() {
        return {
            //
        }
    },
    sockets: {
        connect: function() {
            console.log('socket connected')
        },
        getRoomList(rooms) {
            // this.rooms = rooms
            console.log('getRoomList', rooms)
            // this.roomList = rooms
        },
        getOnlineClients(users) {
            // this.items = users
            console.log('getOnlineClients', users)
            this.userList = users
        }
    }
}
</script>