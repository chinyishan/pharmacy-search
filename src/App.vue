<template>
  <div id="app">
    <!-- 左側欄 -->
    <asideMenu @triggerMarkerPopup="openPopup" ref="menu" />
    <!-- 地圖區塊 -->
    <maskMap ref="map" />
    <!-- 燈箱 -->
    <lightBox />
  </div>
</template>

<script setup>
import asideMenu from "./components/asideMenu.vue";
import maskMap from "./components/maskMap.vue";
import lightBox from "./components/lightBox.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

const store = useStore();

onMounted(async () => {
  try {
    await store.dispatch("fetchLocations");
    await store.dispatch("fetchPharmacies");
  } catch (error) {
    console.error(error);
  }
});

const map = ref(null);

//錯誤，triggerPopup無法傳遞
const openPopup = (id) => {
  // console.log(map.value.triggerPopup(id));
  map.value.triggerPopup(id);
};

const currCity = computed({
  get: () => {
    return store.state.currCity;
  },
  set: (value) => {
    store.commit("SET_CURR_CITY", value);
  },
});

const currDistrict = computed({
  get: () => {
    return store.state.currDistrict;
  },
  set: (value) => {
    store.commit("SET_CURR_DISTRICT", value);
  },
});
</script>

<style lang="scss"></style>
