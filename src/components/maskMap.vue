<template>
  <div class="mask-map" id="mask-map"></div>
</template>

<script setup>
import { useStore } from "vuex";
import {
  ref,
  onMounted,
  computed,
  watch,
  defineExpose,
  defineProps,
} from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const store = useStore();
const map = ref({});
const markers = ref([]);

onMounted(() => {
  map.value = L.map("mask-map", {
    center: [25.03, 121.55],
    zoom: 14,
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map.value);
});

const currDistrictInfo = computed(() => store.getters.currDistrictInfo);
const filteredStores = computed(() => store.getters.filteredStores);

watch(currDistrictInfo, (dis) => {
  // 切換行政區地圖中心點
  map.value.panTo(new L.LatLng(dis.latitude, dis.longitude));
});
watch(filteredStores, (stores) => {
  // 先清除原有 marker
  clearMarkers();
  // 藥局資訊加上對應 marker
  stores.forEach((el) => addMarker(el));
});

// 修正 Leaflet 預設 icon 的路徑
delete L.Icon.Default.prototype._getIconUrl;

const addMarker = (item) => {
  // 標記圖示
  const ICON = L.icon({
    iconUrl: markerIcon,
    iconSize: [30, 40],
    iconAnchor: [22, 94],
    shadowUrl: markerShadow,
    shadowSize: [40, 40],
    shadowAnchor: [15, 90],
    popupAnchor: [-3, -90],
  });

  // 將標記放置地圖上
  const marker = L.marker([item.longitude, item.latitude], { icon: ICON })
    .addTo(map.value)
    .bindPopup(`<h2 class="popup-name">${item.name}</h2>`)
    .openPopup();

  // 往 marker 加入 id 經緯度
  marker.markerId = item.id;
  marker.lng = item.longitude;
  marker.lat = item.latitude;

  markers.value.push(marker);
};

// 清除地圖標記
const clearMarkers = () => {
  map.value.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.value.removeLayer(layer);
    }
  });
  //清空陣列
  markers.value.length = 0;
};
// const props = defineProps({
// 	triggerPopup: Function
// })

// null 沒有使用到 triggerPopup
const triggerPopup = (markerId) => {
  // 找出目標藥局
  const marker = markers.value.find((i) => i.markerId === markerId);
  // 地圖中心指向目標，開啟popup
  map.value.flyTo(new L.LatLng(marker.lng, marker.lat), 15);
  marker.openPopup();
};

defineExpose({
  triggerPopup,
});
</script>

<style lang="scss" scoped>
.mask-map {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0%;
  background-color: #aaa;
  z-index: 5;
}
</style>
