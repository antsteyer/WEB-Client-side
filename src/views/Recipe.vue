<template>
  <div id="recipe">
    <router-view @refreshList="onRefreshList"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    onRefreshList() {
      this.$emit("refreshList");
    }
  }
});
</script>
