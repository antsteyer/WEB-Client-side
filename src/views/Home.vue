<template>
  <div class="home">
    <DataList/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import DataList from "@/components/DataList.vue";

export default Vue.extend({
  components: { DataList }
});
</script>
