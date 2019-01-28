<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-if="ingredient">
        <v-card-title primary-title>
          <h3 class="headline mb-0">{{ingredient.name}}</h3>
        </v-card-title>
        <v-card-text>
          <v-list two-line>
            <template v-for="(nutriment, index) in ingredient.nutriments">
              <v-list-tile v-bind:key="index">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <h3>{{ nutriment.name }}</h3>
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    <span>({{ nutriment.value_for_100g }} {{ nutriment.unit }})</span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-bind:key="index+'tg'"></v-divider>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Ingredient from "../models/ingredient";
import Nutriment from "../models/nutriment";
export default Vue.extend({
  data() {
    return {
      ingredient: null as Ingredient | null,
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
          this.ingredient = new Ingredient(json[0].product_name_fr, nutriments);
          console.log(this.ingredient);
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

