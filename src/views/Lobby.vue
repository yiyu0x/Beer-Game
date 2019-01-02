<template>
    <div>
        <v-flex xs12 sm7 offset-sm1>
            <NewRoom/>
        </v-flex>
        <v-layout row wrap>
            <roomsStatus />
            <usersStatus />
        </v-layout>
    </div>
    <!-- <SelectRole/> -->
</template>
<script>
import roomsStatus from "../components/roomsStatus";
import usersStatus from "../components/usersStatus";
import NewRoom from "../components/NewRoom";
export default {
      data() {
        return {

        }
      },
    sockets: {
        connect: function() {
            console.log('socket connected')
        }
    },
    created() {
        
    },
    components: {
        usersStatus,
        roomsStatus,
        NewRoom
    }
};
</script>