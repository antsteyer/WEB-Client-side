<template>
  <v-list>
    <template v-for="(item, index) in aliments">
      <v-list-tile :key="index + 'tile'">
        <v-list-tile-title>{{item.id}}</v-list-tile-title>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      aliments: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      fetch(process.env.VUE_APP_BACKEND_ENDPOINT + "/data")
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log("Data Received", json);
          this.aliments = json;
        });
    }
  }
});
</script>
