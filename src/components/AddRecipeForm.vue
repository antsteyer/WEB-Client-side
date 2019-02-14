<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h2>Création de recette</h2>

    <v-text-field
      outline
      class="formItem"
      v-model="name"
      :counter="30"
      :rules="nameRules"
      label="Nom de la recette"
      placeholder="Ma recette"
      required
    ></v-text-field>

    <v-textarea
      outline
      class="formItem"
      v-model="description"
      placeholder="Une magnifique recette"
      auto-grow
      :rules="descriptionRules"
      label="Description"
      rows="2"
      required
    ></v-textarea>

    <v-text-field
      outline
      class="formItem"
      v-model="image"
      :rules="imageRules"
      label="Url vers une image de la recette"
      required
    ></v-text-field>

    <v-textarea
      outline
      class="formItem"
      v-model="preparation"
      auto-grow
      :rules="preparationRules"
      label="Étapes de préparation"
      placeholder="1. Casser un oeuf"
      rows="4"
      required
    ></v-textarea>

    <v-combobox
      outline
      class="formItem"
      label="Liste des ingrédients"
      :rules="ingredientsRules"
      multiple
      v-model="ingredients"
      chips
      deletable-chips
    ></v-combobox>

    <v-btn :disabled="!valid" color="success" @click="validate" :loading="loading">Créer</v-btn>

    <v-btn color="error" @click="reset">Réinitialiser</v-btn>

    <v-alert v-model="error" type="error">Erreur lors de la création de la recette</v-alert>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    loading: false,
    error: false,
    name: "",
    nameRules: [
      v => !!v || "Nom requis",
      v => (v && v.length <= 40) || "Nom doit être plus court que 40 caractères"
    ],
    description: "",
    descriptionRules: [
      v => !!v || "Description requise",
      v =>
        (v && v.length >= 20) ||
        "La description doit contenir au moins 20 caractères"
    ],
    image: "",
    imageRules: [v => !!v || "Image requise"],
    preparation: "",
    preparationRules: [
      v => !!v || "Préparation requise",
      v =>
        (v && v.length >= 20) ||
        "La préparation doit contenir au moins 20 caractères"
    ],
    ingredients: null,
    ingredientsRules: [v => !!v || "Au moins un ingrédient requis"],
    checkbox: false
  }),

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.loading = true;
        const response = await fetch(
          "https://web-server-client.herokuapp.com/createRecipe",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: this.name,
              description: this.description,
              image: this.image,
              preparation: this.preparation,
              ingredients: this.ingredients
            })
          }
        ).catch(error => {
          console.log("error", error);
          this.error = true;
        });

        this.loading = false;
        if (!this.error) {
          this.$emit("refreshList");
          this.$router.push({ path: "/recipe" });
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.formItem {
  padding: 10px;
}
</style>
