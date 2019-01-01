<template>
    <v-layout align-center row justify-center>
        <v-flex xs7 text-xs-center>
            <div>
                <v-btn block color="primary" @click="chooseRoles('Retailer')" :disabled="rolesStatus[0]">Retailer</v-btn>
            </div>
            <div>
                <v-btn block color="primary" @click="chooseRoles('Wholesaler')" :disabled="rolesStatus[1]">Wholesaler</v-btn>
            </div>
        </v-flex>
        <v-flex xs7 text-xs-center>
            <div>
                <v-btn block color="primary" @click="chooseRoles('Distributer')" :disabled="rolesStatus[2]">Distributer</v-btn>
            </div>
            <div>
                <v-btn block color="primary" @click="chooseRoles('Manufacturer')" :disabled="rolesStatus[3]">Manufacturer</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
import { eventBus } from "../main";
export default {
    data() {
        return {
            rolesStatus: [false, false, false, false]
        }
    },
    sockets: {
        getRoomList(rooms) {
            console.log('getRoomList', rooms)
        },
        getOccupiedCharacter(roles) {
            console.log(roles)
        }
    },
    methods: {
        chooseRoles(role) {
            this.$socket.emit('chooseCharacter', role, function(err) {
                eventBus.$emit("errorLog", err);
            })
        }
    }
};
</script>