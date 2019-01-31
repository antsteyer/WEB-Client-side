<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app>
        <DataList/>
      </v-navigation-drawer>
      <!-- <v-toolbar app></v-toolbar> -->
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <!-- <v-footer app></v-footer> -->
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DataList from "./components/DataList.vue";
export default Vue.extend({
  components: {
    DataList
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
