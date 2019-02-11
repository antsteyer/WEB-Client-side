<template>
  <v-card>
    <v-card-title primary-title>
      <h2>Liste des magasins qui vendent ce produit</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-layout row wrap>
        <div class="filters" v-if="shops.length > 0">
          <v-layout justify-start column fill-height>
            <v-flex xs12>
              <v-text-field
                v-model="name"
                label="Nom du magasin"
                placeholder="Entrer le nom d'un magasin"
                outline
                @input="filterByName"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-slider
                v-model="distance"
                :max="100"
                label="Distance (km)"
                thumb-label
                v-on:change="filterByDistance(shops, distance)"
              ></v-slider>
            </v-flex>
            <v-flex xs12>
              <v-slider
                v-model="price"
                :max="100"
                label="Prix (€)"
                thumb-label
                v-on:change="filterByPrice(shops, price)"
              ></v-slider>
            </v-flex>
          </v-layout>
        </div>
        <v-flex xs12>
          <v-expansion-panel v-if="displayedShops.length > 0">
            <v-expansion-panel-content v-for="(shop,index) in displayedShops" :key="index">
              <div slot="header">
                <h2>{{shop.name}}</h2>
              </div>
              <v-card>
                <v-card-text>
                  <v-layout row>
                    <v-flex xs4>
                      <h3>Adresse:</h3>
                      <span>{{shop.address}}</span>
                      <h3>Prix:</h3>
                      <span>{{shop.price}} €</span>
                      <h3>Distance:</h3>
                      <span>{{distanceInKmBetweenEarthCoordinates(latPolytech, lonPolytech, shop.lat, shop.lon)}}Km</span>
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
import { Shop } from "../models/shop";
export default Vue.component("app-shops", {
  components: {
    StoresMap
  },
  props: ["shops"],
  data() {
    return {
      displayMap: false,
      distance: 0,
      price: 0,
      name: "",
      shopName: "",
      latPolytech: 43.615807,
      lonPolytech: 7.073046,
      displayedShops: [] as Shop[]
    };
  },
  watch: {
    shops(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.displayedShops = newVal;
      this.distance = 0;
      this.price = 0;
      this.name = "";
    }
  },
  mounted() {},
  methods: {
    displayOnMap(lat: number, lon: number): void {
      this.$root.$emit("update-coordinates", { lat: lat, lon: lon });
      this.displayMap = true;
    },

    degreesToRadians(degrees: number) {
      return (degrees * Math.PI) / 180;
    },

    distanceInKmBetweenEarthCoordinates(
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ) {
      var earthRadiusKm = 6371;

      var dLat = this.degreesToRadians(lat2 - lat1);
      var dLon = this.degreesToRadians(lon2 - lon1);

      lat1 = this.degreesToRadians(lat1);
      lat2 = this.degreesToRadians(lat2);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(earthRadiusKm * c);
    },

    filterByDistance(shops: Shop[], distance: number): void {
      const updatedShops: Shop[] = [];
      shops.forEach((el: Shop) => {
        const distanceFromPolytech = this.distanceInKmBetweenEarthCoordinates(
          this.latPolytech,
          this.lonPolytech,
          el.lat,
          el.lon
        );
        if (distanceFromPolytech <= distance) updatedShops.push(el);
      });
      this.displayedShops = updatedShops;
    },

    filterByPrice(shops: Shop[], price: number): void {
      const updatedShops: Shop[] = [];
      shops.forEach((el: Shop) => {
        if (el.price <= price) updatedShops.push(el);
      });
      this.displayedShops = updatedShops;
    },

    filterByName(name: string): void {
      if (name === "") {
        this.displayedShops = this.shops;
        return;
      }
      const updatedShops: Shop[] = [];
      this.shops.forEach((el: Shop) => {
        if (el.name.toLowerCase().includes(name.toLowerCase()))
          updatedShops.push(el);
      });
      this.displayedShops = updatedShops;
    }
  }
});
</script>

<style>
.filters {
  width: 100%;
  margin: 0;
  margin-left: 12.5%;
  margin-right: 12.5%;
}
</style>
