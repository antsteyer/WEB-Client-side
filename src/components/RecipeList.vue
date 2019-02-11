<template>
  <v-layout v-if="!loading" column align-center justify-start fill-height>
    <list-filters :filterByScore="false" @filterListByText="onFilterByText"/>
    <v-list two-line v-if="recipesFiltered.length > 0">
      <template v-for="(item, index) in recipesFromPage">
        <v-list-tile
          :class="{'activeItem': itemSelected && itemSelected === item.id }"
          v-if="item"
          :key="index + 'tile'"
          @click="itemClicked(item)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="index" v-if="item && index < recipesFiltered.length -1"></v-divider>
      </template>
    </v-list>
    <span v-else class="noResult">Aucun résultat</span>
    <v-pagination
      class
      circle
      v-if="recipesFiltered.length > 0 && pageCount > 1"
      v-model="page"
      :length="pageCount"
      :total-visible="5"
    ></v-pagination>
    <v-spacer/>
    <v-btn to="/recipe/newrecipe" flat color="primary">Ajouter une nouvelle recette</v-btn>
  </v-layout>
  <v-layout v-else row align-center fill-height justify-center>
    <v-progress-circular class="progress" indeterminate color="primary"></v-progress-circular>
  </v-layout>
</template>

<script lang="ts">
const numberOfRecipesPerPage = 9;
import Vue from "vue";
import ListFilters from "@/components/ListFilters.vue";
import Recipe from "@/models/recette";
export default Vue.extend({
  data() {
    return {
      loading: false as boolean,
      recipes: [] as Recipe[],
      itemSelected: null as Recipe | null,
      recipesFiltered: [] as Recipe[],
      page: 1 as number
    };
  },
  components: {
    ListFilters
  },
  mounted() {
    this.getData();
  },
  computed: {
    recipesFromPage(): Array<Object> {
      const start = (this.page - 1) * numberOfRecipesPerPage,
        end = start + numberOfRecipesPerPage;
      return this.recipesFiltered.slice(start, end);
    },
    pageCount(): number {
      let l = this.recipesFiltered.length,
        s = numberOfRecipesPerPage;
      return Math.ceil(l / s);
    }
  },
  methods: {
    getData() {
      this.loading = true;
      fetch(process.env.VUE_APP_BACKEND_ENDPOINT + "/getrecipe")
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.recipes = json.sort(function(a: Recipe, b: Recipe) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
          this.recipesFiltered = this.recipes;
          this.loading = false;
        });
    },
    itemClicked(item: any) {
      this.itemSelected = item.id;
      this.$router.push({ path: `/recipe/details/${item._id}` });
    },
    onFilterByText(search: string) {
      this.recipesFiltered = this.recipes.filter(
        (a: any) => a.name && a.name.includes(search)
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

.noResult {
  padding: 20px;
}
</style>
