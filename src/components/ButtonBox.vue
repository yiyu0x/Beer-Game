<template>
  <v-layout row justify-center align-center> 
    <v-dialog v-model="dialog_login" persistent max-width="600px">
      <v-btn slot="activator" dark>登入</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">登入</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="User name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog_login = false">關閉</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog_login = false">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_new" persistent max-width="600px">
      <v-btn slot="activator" dark>註冊帳號</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">註冊</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="User name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog_new = false">關閉</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog_new = false">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      dialog_login: false,
      dialog_new: false
    })
  }
</script>