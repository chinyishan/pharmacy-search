<template>
  <div id="app">
    <!-- 左側欄 -->
    <!-- @triggerMarker="openPopup" -->
    <asideMenu @triggerMarkerPopup="openPopup" ref="menu"/>
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
import { ref, computed, onMounted } from 'vue';

export default {
  components: {
    asideMenu,
    maskMap,
    lightBox,
  },
  setup() {
    const store = useStore();

    onMounted( async () => {
      console.log(map.value);
      console.log(menu.value);
      try {
        await store.dispatch('fetchLocations');
        await store.dispatch('fetchPharmacies');
      } catch (error) {
        console.error(error);
      }
    })

    const map = ref(null)
    const menu = ref(null)

    //錯誤，triggerPopup無法傳遞
    const openPopup = (markerId) => {
      menu.value.triggerPopup(markerId)
      console.log(map.value);
      console.log(markerId);
    }

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
      map,
      openPopup,
      currCity,
      currDistrict,
    }
  }
}
</script>

<style lang="scss">
@import "./assets/style.scss";

</style>
