<template>
  <v-container>
    <v-flex xs12>
      <v-layout>
        <v-flex md3 xs11>
          <v-text-field label="下單數量" outline type="number"></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-btn color="success">LOCK</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
</template>
<script>
export default {
  data: () => ({})
};
</script>