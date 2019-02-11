<template>
  <v-card>
    <v-card-title primary-title>
      <h2>Donner un prix pour ce produit</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-layout align-center justify-center column fill-height>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="shop_name"
                :rules="shop_name_rules"
                label="Nom du magasin"
                single-line
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="shop_address"
                :rules="shop_address_rules"
                label="Addresse"
                single-line
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="shop_lat"
                :rules="shop_lat_rules"
                label="Latitude"
                single-line
                outline
                type="number"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="shop_lon"
                :rules="shop_lon_rules"
                label="Longitude"
                single-line
                outline
                type="number"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="price"
                :rules="price_rules"
                label="Prix"
                single-line
                outline
                type="number"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout align-center justify-center row fill-height>
            <v-btn color="error" @click="reset">Réinitialiser</v-btn>
            <v-btn :disabled="!valid" color="success" @click="validate">Valider</v-btn>
          </v-layout>
        </v-container>
      </v-form>
      <v-snackbar
        v-model="snackbar"
        :color="'success'"
        :timeout="3000"
      >Votre prix a bien été pris en compte !
        <v-btn dark flat @click="snackbar = false">Fermer</v-btn>
      </v-snackbar>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.component("app-add-price", {
  props: ["id"],
  watch: {
    id: (newVal, oldVal) => {}
  },
  data() {
    return {
      valid: true,
      shop_name: "",
      shop_name_rules: [(v: any) => !!v || "Nom du magasin requis"],
      shop_address: "",
      shop_address_rules: [(v: any) => !!v || "Addresse requise"],
      shop_lat: "",
      shop_lat_rules: [(v: any) => !!v || "Latitude requise"],
      shop_lon: "",
      shop_lon_rules: [(v: any) => !!v || "Longitude requise"],
      price: "",
      price_rules: [
        (v: any) => !!v || "Prix requis",
        (v: any) => (v && v > 0) || "Le prix ne peux pas etre negatif"
      ],
      snackbar: false
    };
  },
  mounted() {},
  computed: {},
  methods: {
    validate() {
      if ((this.$refs.form as any).validate()) {
        this.sendFormData();
      } else {
        console.log("Not valid!");
      }
    },
    reset() {
      (this.$refs.form as any).reset();
    },
    async sendFormData() {
      const response = await fetch(
        "https://web-server-client.herokuapp.com/addPrice",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: this.id,
            shop: {
              name: this.shop_name,
              address: this.shop_address,
              longitude: this.shop_lon,
              latitude: this.shop_lat,
              price: this.price
            }
          })
        }
      );
      const content = await response.json();
      if (content === true) {
        this.snackbar = true;
        this.reset();
        this.$root.$emit("price-added-event");
      } else {
        console.log("Something went wrong");
      }
    },
    isNumber(n: string) {
      return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }
  }
});
</script>

<style>
</style>
