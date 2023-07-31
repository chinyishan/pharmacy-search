<template>
  <div id="app">
    <!-- 左側欄 -->
    <asideMenu/>
    <!-- 地圖區塊 -->
    <!-- <maskMap/> -->
  </div>
</template>

<script>
import asideMenu from './components/asideMenu.vue';
import maskMap from './components/maskMap.vue';
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue';

export default {
  components: {
    asideMenu,
    maskMap,
  },
  setup() {
    const store = useStore();
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
    onMounted( async () => {
      try {
        await store.dispatch('fetchLocations');
        await store.dispatch('fetchPharmacies');
        // console.log(store.state);
      } catch (error) {
        console.error(error);
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
