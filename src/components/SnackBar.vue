<template>
  <div>
    <v-snackbar v-model="show" top>
        {{message}}
        <v-btn flat color="accent" @click.native="show = false">Close</v-btn>
    </v-snackbar>
    <v-btn block color="primary" dark @click="show = true">to</v-btn>
      </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            message: 'test'
        }
    }
}
</script>