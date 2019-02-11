<template>
  <v-card class="additives-card">
    <v-card-title primary-title>
      <h2>Liste des additifs</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <template class="additives-list" v-for="(additive, i) in additives">
        <v-chip
          color="rgba(200, 201, 233, 0.75)"
          text-color="black"
          :key="i"
          disabled
          outline
        >{{additive | capitalize}}</v-chip>
      </template>
      <h5 v-if="additives.length === 0">Non renseigné...</h5>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.component("app-additives", {
  props: ["additives"],
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
  filters: {
    capitalize: function(value: string) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    }
  }
});
</script>

<style>
</style>
