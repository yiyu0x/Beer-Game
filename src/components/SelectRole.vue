<template>
    <v-layout align-center row justify-center>
        <v-flex xs7 text-xs-center>
            <div>
                <v-btn block color="primary" @click="chooseRoles('Retailer')" :disabled="rolesStatus.Retailer">Retailer</v-btn>
            </div>
            <div>
                <v-btn block color="primary" @click="chooseRoles('Wholesaler')" :disabled="rolesStatus.Wholesaler">Wholesaler</v-btn>
            </div>
        </v-flex>
        <v-flex xs7 text-xs-center>
            <div>
                <v-btn block color="primary" @click="chooseRoles('Distributer')" :disabled="rolesStatus.Distributer">Distributer</v-btn>
            </div>
            <div>
                <v-btn block color="primary" @click="chooseRoles('Manufacturer')" :disabled="rolesStatus.Manufacturer">Manufacturer</v-btn>
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
import { eventBus } from "../main";
export default {
    data() {
        return {
            rolesStatus: {
                Manufacturer:false, 
                Distributer:false, 
                Wholesaler:false, 
                Retailer:false
            }
        }
    },
    sockets: {
        getRoomList(rooms) {
            console.log('getRoomList', rooms)
        },
        getOccupiedCharacter(roles) {
            this.rolesStatus.Manufacturer = roles.Manufacturer;
            this.rolesStatus.Distributer = roles.Distributer;
            this.rolesStatus.Wholesaler = roles.Wholesaler;
            this.rolesStatus.Retailer = roles.Retailer;
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