<template>
	<v-container>
		<AlertLogin/>
  		<ButtonBox/>
	</v-container>
</template>

<script>
  import AlertLogin from '../components/AlertLogin'
  import ButtonBox from '../components/ButtonBox'

  export default {
    components: {
      AlertLogin,
      ButtonBox
    }
  }
</script>
