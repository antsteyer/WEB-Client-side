<template>
  <GmapMap
    :center="{lat:parseFloat(this.lat), lng:parseFloat(this.lon)}"
    :zoom="15"
    map-type-id="terrain"
    style="width: 100%; height: 400px"
  >
    <!--<GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
    />-->
  </GmapMap>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.component('app-store-map', {
  props: ['lat', 'lon'],
  data() {
    return {
    };
  },
  watch: {
  },
  methods: {
  },
  mounted() {
    /*this.$root.$on('update-coordinates', (data) => {
      this.lat = data.lat;
      this.lon = data.lon;
    });*/
  }
});
</script>
