<template>
    <v-responsive>
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">啤酒遊戲</h3>
                    <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
                    <v-divider class="my-3"></v-divider>
                    <div class="title mb-3">Check out our newest features!</div>
                    <ButtonBox/>
                </v-flex>
            </v-layout>
        </v-container>
    </v-responsive>
</template>
<script>
import ButtonBox from "../components/ButtonBox";
export default {
  data: () => ({
  }),
  created() {
  },
  components: {
    ButtonBox
  }
};
</script>