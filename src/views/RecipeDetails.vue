<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-if="recipe">
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
          <h2>Ingredients:</h2>
          <ul>
            <li v-for="(ingredient, index) of recipe.ingredients" :key="index">
              <a @click.stop="openDialogWithIngredients(ingredient)">{{ingredient}}</a>
            </li>
          </ul>
          <h2>Commentaires:</h2>
          <v-list two-line v-for="(comment, index) of recipe.comments" v-bind:key="index">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Commentaire {{index + 1}}</v-list-tile-title>
                <v-list-tile-sub-title>{{comment}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-textarea outline name="input-7-4" label="Votre commentaire" v-model="comment"></v-textarea>
          <v-btn color="success" @click="postComment">Post</v-btn>
        </v-card-text>
      </v-card>
      <v-layout v-if="loading" row align-center justify-center style="height: 800px">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </v-flex>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{selectedIngredient}}</v-card-title>

        <v-card-text>
          <v-layout align-center justify-center v-if="loadProducts">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-layout>

          <v-list v-if="!loadProducts && productList.length > 0">
            <template v-for="(product, index) in productList">
              <v-list-tile :key="index" @click="goToProductDetails(product.id)">
                <v-list-tile-content>
                  <v-list-tile-title>{{product.name}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
          <span
            v-if="!loadProducts && productList.length === 0"
          >Pas de produits associés à cet ingrédient</span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";
import Recette from "../models/recette";
export default Vue.extend({
  data: () => {
    return {
      loading: false,
      id: "" as string,
      recipe: null as Recette | null,
      noImgUrl: "http://www.djerba-troc.com/wp-content/uploads/no-image.png",
      comment: "",
      dialog: false,
      selectedIngredient: "",
      loadProducts: false,
      productList: [] as Array<any>
    };
  },

  computed: {
    paramsId(): string {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.id = this.paramsId;
    this.getRecipe();
  },
  methods: {
    async getRecipe() {
      this.loading = true;
      await fetch(`${process.env.VUE_APP_BACKEND_ENDPOINT}/getRecipe`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.id
        })
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.loading = false;
          this.recipe = json;
        });

      this.loading = false;
    },
    async postComment() {
      if (!this.recipe) return;
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
      this.getRecipe();
      this.comment = "";
    },
    openDialogWithIngredients(ingredient: string) {
      this.selectedIngredient = ingredient;
      this.dialog = true;
      this.getProductWithIngredient(ingredient.toLowerCase());
    },
    getProductWithIngredient(ingredient: string) {
      this.loadProducts = true;
      fetch("https://web-server-client.herokuapp.com/ingredients", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredients: [ingredient],
          additives_tags: []
        })
      })
        .then((res: any) => {
          return res.json();
        })
        .then(json => {
          this.productList = [];
          json.forEach((el: any) => {
            this.productList.push({ name: el.product_name, id: el.id });
          });
          this.loadProducts = false;
        });
    },
    goToProductDetails(id: string) {
      this.dialog = false;
      this.$router.push({ path: `/home/details/${id}` });
    }
  },
  watch: {
    paramsId(val, oldval) {
      if (val === oldval) return;

      this.id = this.paramsId;
      this.recipe = null;
      this.getRecipe();
    }
  }
});
</script>
<style scoped>
.v-card__text {
  text-align: justify;
}
</style>