<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img :src="recipe.image" alt="img" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{recipe.name}}</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <h2>Description de la recette:</h2>
          <p>{{recipe.description}}</p>
          <h2>Preparation:</h2>
          <p>{{recipe.preparation}}</p>
          <h2>Commentaires:</h2>
          <v-list
            subheader
            three-line
            v-for="(comment, index) of recipe.comments"
            v-bind:key="index"
          >
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Commentaire {{index + 1}}</v-list-tile-title>
                <v-list-tile-sub-title>{{comment}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-textarea outline name="input-7-4" label="Outline textarea" v-model="comment"></v-textarea>
          <v-btn color="success" @click="postComment">Post</v-btn>
        </v-card-text>
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
      noImgUrl: "http://www.djerba-troc.com/wp-content/uploads/no-image.png",
      comment: ""
    };
  },

  computed: {
    recipe(): Recette {
      return (this.$route.params as any).recipe as Recette;
    }
  },

  methods: {
    async postComment() {
      const response = await fetch(
        "https://web-server-client.herokuapp.com/addComments",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: this.recipe._id,
            comment: this.comment
          })
        }
      );
      const content = await response.json();
    }
  }
});
</script>
<style>
.v-card__text {
  text-align: justify;
}
</style>