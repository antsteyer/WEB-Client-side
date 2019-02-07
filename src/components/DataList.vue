<template>
  <v-layout v-if="aliments.length > 0" column align-center justify-start fill-height>
    <list-filters @filterListByText="onFilterByText" @filterListByScore="onFilterByScore"/>
    <v-list two-line v-if="alimentsFiltered.length > 0">
      <template v-for="(item, index) in alimentsFromPage">
        <v-list-tile
          :class="{'activeItem': itemSelected && itemSelected === item.id }"
          v-if="item"
          :key="index + 'tile'"
          @click="itemClicked(item)"
        >
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
        <v-divider :key="index" v-if="item && index < alimentsFiltered.length -1"></v-divider>
      </template>
    </v-list>
    <span v-else>Aucun résultat</span>
    <v-pagination
      class
      circle
      v-if="alimentsFiltered.length > 0 && pageCount > 1"
      v-model="page"
      :length="pageCount"
      :total-visible="5"
    ></v-pagination>
  </v-layout>
  <v-layout v-else row align-center fill-height justify-center>
    <v-progress-circular class="progress" indeterminate color="primary"></v-progress-circular>
  </v-layout>
</template>

<script lang="ts">
const numberOfAlimentsPerPage = 9;
import Vue from "vue";
import ListFilters from "@/components/ListFilters.vue";
import Product from "@/models/product";
export default Vue.extend({
  data() {
    return {
      aliments: [],
      itemSelected: null,
      alimentsFiltered: [],
      page: 1
    };
  },
  components: {
    ListFilters
  },
  mounted() {
    this.getData();
  },
  computed: {
    alimentsFromPage(): Array<Object> {
      const start = (this.page - 1) * numberOfAlimentsPerPage,
        end = start + numberOfAlimentsPerPage;
      return this.alimentsFiltered.slice(start, end);
    },
    pageCount(): number {
      let l = this.alimentsFiltered.length,
        s = numberOfAlimentsPerPage;
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
          this.alimentsFiltered = this.aliments;
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
    },
    itemClicked(item: any) {
      this.itemSelected = item.id;
      this.$router.push({ path: `/home/details/${item.id}` });
    },
    onFilterByText(search: string) {
      this.alimentsFiltered = this.aliments.filter(
        (a: any) => a.name && a.name.includes(search)
      );
    },
    onFilterByScore(val: number) {
      // Val vaut entre 0 (Tous) et 4 (E)

      if (val === 0) {
        this.alimentsFiltered = this.aliments;
        return;
      }

      let letterFromScore = "";
      switch (val) {
        case 1:
          letterFromScore = "A";
          break;
        case 2:
          letterFromScore = "B";
          break;
        case 3:
          letterFromScore = "C";
          break;
        case 4:
          letterFromScore = "D";
          break;
        case 5:
          letterFromScore = "E";
          break;
        default:
          letterFromScore = "A";
          break;
      }
      this.alimentsFiltered = this.aliments.filter(
        (a: any) => this.getLetterFromScore(a.score) === letterFromScore
      );
    }
  }
});
</script>



<style scoped>
.v-navigation-drawer .v-list {
  width: 100%;
}

.v-pagination {
  margin-bottom: 5px;
}

.progress {
  margin: 20px;
}

.activeItem {
  background: rgba(0, 0, 0, 0.07);
}
</style>
