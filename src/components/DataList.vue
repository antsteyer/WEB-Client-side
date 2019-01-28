<template>
  <v-card>
    <v-card-text>
      <v-list v-if="aliments.length > 0" two-line>
        <template v-for="(item, index) in alimentsFromPage">
          <v-list-tile v-if="item" :key="index + 'tile'">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-chip>
                  <v-avatar
                    class="white--text"
                    :color="getColorFromScore(item.score)"
                  >{{getLetterFromScore(item.score)}}</v-avatar>
                  {{item.score}}
                </v-chip>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="index" v-if="item && index < aliments.length -1"></v-divider>
        </template>
      </v-list>
      <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
    </v-card-text>
    <v-pagination v-if="aliments.length > 0" v-model="page" :length="pageCount" :total-visible="7"></v-pagination>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      aliments: [],
      page: 1
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    alimentsFromPage(): Array<Object> {
      const start = (this.page - 1) * 20,
        end = start + 20;
      return this.aliments.slice(start, end);
    },
    pageCount(): number {
      let l = this.aliments.length,
        s = 20;
      return Math.ceil(l / s);
    }
  },
  methods: {
    getData() {
      fetch(process.env.VUE_APP_BACKEND_ENDPOINT + "/score")
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log("Data Received", json);
          this.aliments = json.sort(function(a: any, b: any) {
            const scoreA = parseFloat(a.score);
            const scoreB = parseFloat(b.score);
            if (scoreA > scoreB) {
              return 1;
            }
            if (scoreA < scoreB) {
              return -1;
            }
            return 0;
          });
        });
    },
    getColorFromScore(score: string) {
      const nscore = parseFloat(score);
      if (nscore <= 1) return "green";
      if (nscore > 1 && nscore <= 4) return "#90EE90";
      if (nscore > 4 && nscore <= 6) return "yellow";
      if (nscore > 6 && nscore <= 7) return "orange";

      return "red";
    },
    getLetterFromScore(score: string) {
      const nscore = parseFloat(score);
      if (nscore <= 1) return "A";
      if (nscore > 1 && nscore <= 4) return "B";
      if (nscore > 4 && nscore <= 6) return "C";
      if (nscore > 6 && nscore <= 7) return "D";

      return "E";
    }
  }
});
</script>
