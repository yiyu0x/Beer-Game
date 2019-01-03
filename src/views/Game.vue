<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <v-layout row wrap justify-center>
          <h1>{{ msg }} {{ player }}</h1>
        </v-layout>
        <v-layout row wrap justify-center>
          <h1>{{ role }}</h1>
        </v-layout>
        <v-layout row wrap justify-center>
          <h1>{{ round }}</h1>
        </v-layout>
        <v-layout row justify-center wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field v-model="stock" label="Stock" box disabled></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-center wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field v-model="backlog" label="Backlog" box disabled></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <v-flex xs12 sm6 md3>
            <v-text-field
              v-model="order"
              cache-items
              class="mx-3"
              label="下單數量"
              :disabled="field_disabled"
              solo-inverted
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn color="success" :disabled="btn_disabled" @click="lock">LOCK</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row justify-center wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field v-model="imcoming" label="Imcoming order" box disabled></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-center wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field v-model="received" label="上游實際出貨" box disabled></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-center wrap>
          <v-flex xs12 sm6 md3>
            <v-text-field v-model="cost" label="目前成本" box disabled></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-toolbar color="red" dark>
            <v-toolbar-title>排行榜</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-tile v-for="(item,index) in users" avatar :key="index">
              <v-list-tile-action>
                <v-icon color="orange">star</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.username"></v-list-tile-title>
              </v-list-tile-content>
              <v-subheader>{{ item.role }} - {{ item.cost }}</v-subheader>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btn_disabled: true,
      field_disabled: true,
      role: "",
      stock: "15",
      backlog: "0",
      imcoming: "0",
      received: "0",
      order: "",
      msg: "等待其他玩家加入中...",
      player: "剩餘4人",
      cost: "0",
      round: "第1期",
      users: [],
      dialog: false
    };
  },
  created() {
    this.$socket.emit("getRole");
  },
  sockets: {
    receivedRole(role) {
      this.role = role;
    },
    getOccupiedCharacter(roles) {
      let counter = 0;
      for (let ele in roles) {
        if (roles[ele] == true) counter++;
      }
      counter = 4 - counter;
      this.player = "剩餘" + counter.toString() + "人";

      if (this.player == 4) {
        this.player = "";
      }
    },
    startGame() {
      this.msg = "玩家加入完畢 遊戲開始";
      this.player = "";
      this.btn_disabled = false;
      this.field_disabled = false;
    },
    updateGame(data) {
      let resource = data[0];
      let round = data[1];
      this.btn_disabled = false;
      this.field_disabled = false;
      this.stock = resource.stock;
      this.backlog = resource.backlog;
      this.imcoming = resource.incomingOrder;
      this.received = resource.receive;
      this.cost = resource.cost;
      this.round = "第" + round + "期";
      console.log("updateGame ");
      console.log(resource);
      console.log(round);
    },
    gameover(rank) {
      this.users = rank;
      this.dialog = true;
    }
  },
  methods: {
    lock() {
      this.btn_disabled = true;
      this.field_disabled = true;
      if (this.order == "") this.order = 0;
      this.$socket.emit("sendData", this.order);
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$socket.emit("exitRoom", function(err) {
          eventBus.$emit("errorLog", err);
        });
        this.$router.push({ path: "lobby" });
      }
    }
  }
};
</script>