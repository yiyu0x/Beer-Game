<template>
  <v-container>
    <AlertLogin/>
    <!-- <ButtonBox/> -->
    <welcome/>
  </v-container>
</template>

<script>
import AlertLogin from "../components/AlertLogin";
import ButtonBox from "../components/ButtonBox";
import Welcome from "../components/Welcome";
export default {
  data: () => ({
    
  }),
  created() {

  },
  components: {
    AlertLogin,
    ButtonBox,
    Welcome
  }
};
</script>
