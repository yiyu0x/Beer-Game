<template>
    <div>
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
import SelectRole from "../components/SelectRole";
export default {
	  data() {
	  	return {

	  	}
	  },
    sockets: {
        connect: function() {
            console.log('socket connected')
        },
        customEmit: function(data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    created() {
        
    },
    components: {
        usersStatus,
        roomsStatus,
        SelectRole
    }
};
</script>