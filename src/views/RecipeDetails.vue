<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img :src="noImgUrl" alt="img" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{recipe.name}}</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <p>{{recipe.description}}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange">Ajouter un commentaire</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";
import Recette from "../models/recette";
export default Vue.extend({
  data: () => {
    return {
      noImgUrl: "http://www.djerba-troc.com/wp-content/uploads/no-image.png"
    };
  },

  computed: {
    recipe(): Recette {
      return this.$route.params.recipe as Recette;
    }
  }
});
</script>
