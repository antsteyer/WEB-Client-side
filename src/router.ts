import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Details from "./views/Details.vue";
import RecipeDetails from "./views/RecipeDetails.vue";
import Recipe from "./views/Recipe.vue";
import AddRecipe from "./views/AddRecipe.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "details/:id",
          name: "details",
          component: Details
        }
      ]
    },
    {
      path: "/recipe",
      name: "Recipe",
      component: Recipe,
      children: [
        {
          path: "details",
          name: "recipedetails",
          component: RecipeDetails
        },
        {
          path: "newrecipe",
          name: "newrecipe",
          component: AddRecipe
        }
      ]
    }
  ]
});
