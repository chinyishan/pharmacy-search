<template>
  <div class="mask-map" id="mapMap"></div>
	<!-- ref="mapContainer" -->
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted, computed, watch } from 'vue';
import L from 'leaflet';

const store = useStore();
let mapMap  = null

onMounted(() => {
	const map = L.map( 'mapMap' , {
		center: [25.03, 121.55],
		zoom: 14,
	});
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 18,
  }).addTo(map);
	console.log(mapMap);
	// L.marker([22.595153, 120.306923])
	// 	.addTo(map)
	// 	.bindPopup("夢時代購物中心")
	// 	.openPopup();
})

const currDistrictInfo = computed(() => store.getters.currDistrictInfo);
const filteredStores = computed(() => store.getters.filteredStores);

watch(currDistrictInfo, (v) => {
	this.map.panTo(new L.LatLng(v.latitude, v.longitude))
})
// watch(filteredStores, (v) => {
// 	v.forEach((el) => addMarker(el))
// })

// const addMarker = (item) => {
// 	// 標記圖示
// 	const ICON = {
// 		iconUrl: '../assets/images/geo-alt-fill.svg',
// 		iconSize: [25, 40],
// 	}

// 	// 將標記放置地圖上
// 	const marker = L.marker([item.latitude, item.longitude], ICON)
// 	.addTO(mapContainer.value)
// 	.bindPopup(`<h2 class="popup-name">${item.name}</h2>`)
// }
</script>