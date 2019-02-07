<template>
  <div>
    <v-text-field
      v-model="search"
      hide-details
      placeholder="Filtrer la liste..."
      @input="onUserSearch"
    ></v-text-field>
    <v-layout v-if="filterByScore" row align-center justify-center>
      <v-btn-toggle dark v-model="scoreToShow" mandatory>
        <v-tooltip bottom>
          <v-btn slot="activator" icon dark color="grey">#</v-btn>
          <span>Afficher tous</span>
        </v-tooltip>
        <v-btn icon dark color="green">A</v-btn>
        <v-btn icon dark color="#90EE90">B</v-btn>
        <v-btn icon dark color="yellow">C</v-btn>
        <v-btn icon dark color="orange">D</v-btn>
        <v-btn icon dark color="red">E</v-btn>
      </v-btn-toggle>
    </v-layout>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    filterByScore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      search: null as string | null,
      scoreToShow: 0
    };
  },
  methods: {
    onUserSearch(val: string) {
      this.$emit("filterListByText", val);
    }
  },
  watch: {
    scoreToShow(val: string) {
      this.$emit("filterListByScore", val);
    }
  }
};
</script>

<style scoped>
.v-text-field {
  margin-top: 0;
}

.v-btn-toggle .v-btn,
.v-btn-toggle .v-btn.v-btn--active,
.v-btn-toggle .v-btn:first-child,
.v-btn-toggle .v-btn:last-child {
  margin: 4px;
  border-radius: 100%;
  width: 36px;
  height: 36px;
  color: white;
}

.theme--dark.v-btn-toggle {
  background: none;
  box-shadow: none;
  margin-top: 5px;
}
</style>

