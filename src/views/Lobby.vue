<template>
	<div>
	<h1>請選擇遊戲間</h1>
	<roomStatus/>
	</div>
    <!-- <SelectRole/> -->
</template>

<script>
import roomStatus from "../components/roomStatus";
import SelectRole from "../components/SelectRole";
export default {
  components: {
  	roomStatus,
    SelectRole
  }
};
</script>
