<template>
  <v-card>
    <v-card-text>
      <v-list v-if="aliments.length > 0" two-line>
        <template v-for="(item, index) in aliments">
          <v-list-tile :key="index + 'tile'">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.score }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="index" v-if="index < aliments.length -1"></v-divider>
        </template>
      </v-list>
      <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
    </v-card-text>
  </v-card>
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
      fetch(process.env.VUE_APP_BACKEND_ENDPOINT + "/score")
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
