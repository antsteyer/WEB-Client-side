<template>
  <v-container grid-list-md text-xs-center v-if="product">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">{{product.name}}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card dark color="secondary">
          <v-card-text class="px-0">Ingredients</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <app-nutriments :nutriments="product.nutriments"></app-nutriments>
        <!--<v-card dark color="primary">
          <v-card-text class="px-0">Nutriments</v-card-text>
        </v-card>-->
      </v-flex>
      <v-flex xs3>
        <v-card dark color="primary">
          <v-card-text class="px-0">Additives</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!--<v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-if="product">
        <v-card-title primary-title>
          <h3 class="headline mb-0">{{product.name}}</h3>
        </v-card-title>
        <v-card-text>
          <h2>Liste des nutriments:</h2>
          <v-list two-line>
            <template v-for="(nutriment, index) in product.nutriments">
              <v-list-tile v-bind:key="index">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <h3>{{ nutriment.name }}</h3>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <span>(Pour 100g: {{ nutriment.value_for_100g }} {{ nutriment.unit }})</span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-bind:key="index+'tg'"></v-divider>
            </template>
          </v-list>
          <h2>Liste des ingredients:</h2>
          {{product.ingredients}}
          <h2>Liste des additifs:</h2>
          <ul>
            <template v-for="(a, i) in product.additives">
              <li v-bind:key="i">{{a}}</li>
            </template>
            
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>-->
</template>

<script lang="ts">
import Vue from "vue";
import Nutriments from '../components/Nutriments.vue';
import Nutriment from "../models/nutriment";
import Product from "../models/product";
import { Ingredient } from "../models/ingredient";
export default Vue.extend({
  components: {
    Nutriments
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
          const ingredients = this.extractIngredients(json[0]);
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

