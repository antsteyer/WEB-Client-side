<template>
  <v-card>
    <v-card-title primary-title>
      <h2>Liste des magasins qui vendent ce produit</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12>
          <v-expansion-panel v-if="shops.length > 0">
            <v-expansion-panel-content v-for="(shop,index) in shops" :key="index">
              <div slot="header"><h2>{{shop.name}}</h2></div>
              <v-card>
                <v-card-text>
                    <v-layout row>
                        <v-flex xs4>
                            <h3>Adresse:</h3>
                            <span>{{shop.address}}</span>
                            <h3>Prix:</h3>
                            <span>{{shop.price}} €</span>
                        </v-flex>
                        <v-flex xs8>
                            <app-store-map style="border: solid" :lat="shop.lat" :lon="shop.lon"></app-store-map>
                        </v-flex>
                    </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <h5 v-if="shops.length === 0">Non renseigné...</h5>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import StoresMap from "./StoresMap.vue";
export default Vue.component("app-shops", {
  components: {
    StoresMap
  },
  props: ["shops"],
  data() {
    return {
      displayMap: false
    };
  },
  mounted() {},
  computed: {},
  methods: {
    displayOnMap(lat: number, lon: number): void {
      this.$root.$emit("update-coordinates", { lat: lat, lon: lon });
      this.displayMap = true;
    }
  }
});
</script>

<style>
</style>
