<template>
  <div class="mask-map" id="mapMap" ref="mapMap"></div>
	<!-- ref="mapContainer" -->
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted, computed, watch } from 'vue';
import L from 'leaflet';

const store = useStore();
const mapMap  = ref(null);
const markers = ref([]);

onMounted(() => {
	mapMap.value = L.map( mapMap.value , {
		center: [25.03, 121.55],
		zoom: 14,
	});
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 18,
  }).addTo(mapMap.value);
	// L.marker([22.595153, 120.306923])
	// 	.addTo(map)
	// 	.bindPopup("夢時代購物中心")
	// 	.openPopup();
});

const currDistrictInfo = computed(() => store.getters.currDistrictInfo);
const filteredStores = computed(() => store.getters.filteredStores);

watch(currDistrictInfo, (dis) => {
	// 切換行政區地圖中心點
	mapMap.value.panTo(new L.LatLng(dis.latitude, dis.longitude))
});
watch(filteredStores, (stores) => {
	// 先清除原有 marker
	clearMarkers()
	// 藥局資訊加上對應 marker
	stores.forEach((el) => addMarker(el))
})

const addMarker = (item) => {
	// 標記圖示
	const ICON = {
		iconUrl: '/assets/images/geo-alt-fill.png',
		iconSize: [200, 400],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	}

	// 將標記放置地圖上
	const marker = L.marker([item.longitude, item.latitude], ICON)
	.addTo(mapMap.value)
	.bindPopup(`<h2 class="popup-name">${item.name}</h2>`)
	.openPopup()

	// 往 marker 加入 id 經緯度
	marker.markerId = item.id
	marker.lng = item.longitude
	marker.lat = item.latitude

	markers.value.push(marker)
}

// 清除地圖標記
const clearMarkers = () => {
	mapMap.value.eachLayer((layer) => {
		if(layer instanceof L.Marker) {
			mapMap.value.removeLayer(layer)
		}
	})
	markers.value.length = 0
}

const triggerPopup = (markerId) => {
	// 找出目標藥局
	const marker = markers.find((i) => i.markerId === markerId);
	// 地圖中心指向目標，開啟popup
	mapMap.value.flyTo(new L.LatLng(marker.lng, marker.lat), 15);
	marker.openPopup();
}
</script>