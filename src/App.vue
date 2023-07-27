<template>
  <div id="app">
    <!-- 左側欄 -->
    <asideMenu/>
    <!-- 地圖區塊 -->
    <maskMap/>
  </div>
</template>

<script setup>
import asideMenu from './components/asideMenu.vue'
import maskMap from './components/maskMap.vue'

</script>

<style lang="scss">
@import "./assets/style.scss";

</style>
