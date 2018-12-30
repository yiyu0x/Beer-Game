<template>
    <div>
        <roomStatus />
    </div>
    <!-- <SelectRole/> -->
</template>
<script>
import roomStatus from "../components/roomStatus";
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
        roomStatus,
        SelectRole
    }
};
</script>