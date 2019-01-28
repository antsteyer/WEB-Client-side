<template>
  <GmapMap
    :center="{lat:10, lng:10}"
    :zoom="7"
    map-type-id="terrain"
    style="width: 500px; height: 500px"
  >
    <!-- <GmapMarker
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
export default Vue.extend({});
</script>
