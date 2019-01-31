<template>
  <v-card>
    <v-card-title primary-title>
      <h2>{{nutriments.length}} {{ (nutriments.length === 1) ? 'nutriment' : 'nutriments' }}</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <template v-for="(nutriment, index) in nutriments">
        <v-list-tile :key="index">
          <v-list-tile-content>{{nutriment.getName()}}</v-list-tile-content>
          <v-list-tile-content class="align-end">{{nutriment.getValueFor100g()}} {{nutriment.unit}}</v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Nutriment from "../models/nutriment";
export default Vue.component("app-nutriments", {
  props: ["nutriments"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.nutriments);
  },
  computed: {},
  methods: {}
});
</script>

<style>
</style>
