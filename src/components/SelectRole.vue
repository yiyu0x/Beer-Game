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
  export default {
    data() {
      return {
        rolesStatus : [false,false,false,false]
      }
    },
    methods: {
        chooseRoles(role) {
          this.$socket.emit('chooseCharacter', role, function (err) {
            console.log(err)
          })
        }
    }  
  };
</script>