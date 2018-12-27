<template>
    <v-responsive>
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Who Is The King of Beer Games
</h3>
                    <span
            class="subheading"
          >由四個小組（一組1~2人）組成一條供應鏈
擔任供應鏈中的工廠、配銷商、大盤商、零售商四個角色，模擬角色訂購商品
當有缺貨或囤貨時會增加各自的成本
最後將成本加總與其他供應鏈比較，成本最低的那一條供應鏈獲勝</span>
                    <v-divider class="my-3"></v-divider>
                    <div class="title mb-3">立即登入進行遊玩
                        !</div>
                    <ButtonBox />
                </v-flex>
            </v-layout>
        </v-container>
    </v-responsive>
</template>
<script>
import ButtonBox from "../components/ButtonBox";
export default {
    data: () => ({}),
    created() {},
    components: {
        ButtonBox
    }
};
</script>