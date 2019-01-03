<template>
  <v-dialog v-model="dialog_new_room" persistent max-width="600px">
    <v-btn slot="activator" dark>建立遊戲</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">建立遊戲</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field :rules="rules" v-model="roomName" label="遊戲房間名稱" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog_new_room = false">關閉</v-btn>
        <v-btn color="blue darken-1" flat @click="createRoom">建立</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
// import { eventBus } from '../main'
export default {
    data: () => ({
        rules: [v => !!v || 'can not empty'],
        dialog_new_room: false,
        roomName: '',
        loginUserPasswd: '',
        registerUserName: '',
        registerUserPasswd: ''
    }),
    methods: {
        createRoom() {
            this.$socket.emit('createRoom', this.roomName, function(err) {
                console.log(err)
            })
            this.dialog_new_room = false
            this.$router.push({ path: 'room' })
        }
    }
}
</script>