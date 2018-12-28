<template>
  <v-container>
    <!-- <SnackBar/> -->
    <AlertLogin/>
    <welcome/>
  </v-container>
</template>

<script>
import AlertLogin from "../components/AlertLogin";
import Welcome from "../components/Welcome";
import SnackBar from "../components/SnackBar";
export default {
  data: () => ({
    
  }),
  created() {

  },
  components: {
    AlertLogin,
    Welcome,
    SnackBar
  }
};
</script>
