<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app clipped>
        <data-list v-show="routePath.includes('home')"/>
        <recipe-list ref="recipelist" v-show="routePath.includes('recipe')"/>
      </v-navigation-drawer>
      <v-toolbar app clipped-left>
        <v-toolbar-side-icon>
          <v-icon>fastfood</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat to="/home">Accueil</v-btn>
          <v-btn flat to="/recipe">Recettes</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view @refreshList="onRefreshList"></router-view>
        </v-container>
      </v-content>
      <!-- <v-footer app></v-footer> -->
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DataList from "./components/DataList.vue";
import RecipeList from "./components/RecipeList.vue";
export default Vue.extend({
  components: {
    DataList,
    RecipeList
  },
  computed: {
    routePath(): string {
      return this.$route.path;
    }
  },
  methods: {
    onRefreshList() {
      (this.$refs["recipelist"] as any).refresh();
    }
  }
});
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
