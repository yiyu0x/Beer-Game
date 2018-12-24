<template>
  <v-container>
    <AlertLogin/>
    <ButtonBox/>
  </v-container>
</template>

<script>
import AlertLogin from "../components/AlertLogin";
import ButtonBox from "../components/ButtonBox";

export default {
  data: () => ({
    
  }),
  created() {

  },
  components: {
    AlertLogin,
    ButtonBox
  }
};
</script>
