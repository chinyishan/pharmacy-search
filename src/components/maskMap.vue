<template>
  <div class="mask-map" id="mask-map" ref="mapContainer"></div>
</template>

<script setup>
import {ref, onMounted } from 'vue';
import L from 'leaflet';

const mapContainer = ref(null);

onMounted(() => {
	const map = L.map( mapContainer.value , {
		center: [25.03, 121.55],
		zoom: 14,
	});
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 18,
  }).addTo(map);
})

</script>