<template>
  <div id="app">
    <!-- 左側欄 -->
    <!-- @triggerMarker="openPopup" -->
    <asideMenu ref="menu"/>
    <!-- 地圖區塊 -->
    <maskMap ref="mep"/>
    <!-- 燈箱 -->
    <lightBox/>
  </div>
</template>

<script>
import asideMenu from './components/asideMenu.vue';
import maskMap from './components/maskMap.vue';
import lightBox from './components/lightBox.vue';
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue';

export default {
  components: {
    asideMenu,
    maskMap,
    lightBox,
  },
  setup() {
    const store = useStore();

    onMounted( async () => {
      try {
        await store.dispatch('fetchLocations');
        await store.dispatch('fetchPharmacies');
        // console.log(store.state);
      } catch (error) {
        console.error(error);
      }
    })

    const currCity = computed( {
      get: () => {
        return store.state.currCity
      },
      set: (value) => {
        store.commit('SET_CURR_CITY', value)
      }
    })

    const currDistrict = computed( {
      get: () => {
        return store.state.currDistrict
      },
      set: (value) => {
        store.commit('SET_CURR_DISTRICT', value)
      }
    })

    return {
      currCity,
      currDistrict
    }
  }
}

</script>

<style lang="scss">
@import "./assets/style.scss";

</style>
