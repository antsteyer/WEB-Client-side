<template>
  <add-recipe-form @refreshList="onRefreshList"/>
</template>
<script lang="ts">
import Vue from "vue";
import AddRecipeForm from "@/components/AddRecipeForm.vue";
export default Vue.extend({
  components: {
    AddRecipeForm
  },
  methods: {
    onRefreshList() {
      this.$emit("refreshList");
    }
  }
});
</script>
