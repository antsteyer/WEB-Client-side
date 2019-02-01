<template>
  <v-container grid-list-md text-xs-center v-if="product">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">
            <h1>{{product.name}}</h1>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title>
            <h2>Ingredients</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p v-if="product.ingredients !== ''">{{ product.ingredients }}</p>
            <h5 v-if="!product.ingredients">Non renseigné...</h5>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <app-nutriments :nutriments="product.nutriments"></app-nutriments>
      </v-flex>
      <v-flex xs3>
        <app-additives :additives="product.additives"></app-additives>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Nutriments from "../components/Nutriments.vue";
import Additives from "../components/Additives.vue";
import Nutriment from "../models/nutriment";
import Product from "../models/product";
import { Ingredient } from "../models/ingredient";
export default Vue.extend({
  components: {
    Nutriments,
    Additives
  },
  data() {
    return {
      product: null as Product | null,
      id: ""
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getAliment();
  },
  computed: {
    paramsId(): string {
      return this.$route.params.id;
    }
  },
  methods: {
    getAliment() {
      fetch(`${process.env.VUE_APP_BACKEND_ENDPOINT}/ingredients/${this.id}`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          const nutriments = this.extractNutriments(json[0].nutriments);
          //const ingredients = this.extractIngredients(json[0]);
          const additives = this.extractAdditives(json[0]);
          this.product = new Product(
            json[0].product_name,
            nutriments,
            json[0].ingredients_text,
            additives
          );
        });
    },
    extractNutriments(n: any): Nutriment[] {
      const nutriments: Nutriment[] = [];
      const names: string[] = [];
      for (let i in n) {
        const key = i;
        const val = n[i];
        const name: string = key.split("_")[0];
        if (!names.includes(name)) names.push(name);
      }
      for (let i = 0; i < names.length; i++) {
        const element = names[i];
        const unit = element + "_unit";
        const value100g = element + "_100g";
        const realUnit =
          n[unit] === "" || n[unit] === undefined ? "g" : n[unit];
        const nutriment: Nutriment = new Nutriment(
          element,
          n[value100g],
          realUnit
        );
        nutriments.push(nutriment);
      }
      return nutriments;
    },
    extractIngredients(n: any): Ingredient[] {
      const ingredients: Ingredient[] = [];
      n.ingredients.forEach((el: any) => {
        ingredients.push(new Ingredient(el.text));
      });
      return ingredients;
    },
    extractAdditives(n: any): string[] {
      const additives: string[] = [];
      n.additives_tags.forEach((el: any) => {
        additives.push(el.split(":")[1]);
      });
      return additives;
    }
  },
  watch: {
    paramsId(val, oldval) {
      if (val === oldval) return;

      this.id = this.paramsId;
      this.getAliment();
    }
  }
});
</script>

