<template>
  <div class="aside-menu">
		<div class="wraps">
			<label>
				縣市：
				<select v-model="currCity">
					<option v-for="item in cityList" :key="item">{{ item }}</option>
				</select>
			</label>
			<label>
				行政區：
				<select v-model="currDistrict">
					<option v-for="item in districtList" :key="item.id">{{ item.name }}</option>
				</select>
			</label>
		</div>

		<div class="wraps">
			<label>
				<i class="fas fa-search-location"></i> 關鍵字搜尋：
				<input type="text" placeholder="請輸入關鍵字">
			</label>
		</div>

		<ul class="store-lists">
			<li class="store-info wraps">
				<h1>ＸＸ藥局</h1>

				<div class="mask-info">
					<i class="fas fa-head-side-mask"></i>
					<span>大人口罩: 100 個</span>
				</div>

				<div class="mask-info">
					<i class="fas fa-baby"></i>
					<span>兒童口罩: 100 個</span>
				</div>

				<div class="mask-info">
					最後更新時間:
				</div>

				<button class="btn-store-detail">
					<i class="fas fa-info-circle"></i>
					看詳細資訊
				</button>
			</li>
			<li class="store-info wraps">
				<h1>ＸＸ藥局</h1>

				<div class="mask-info">
					<i class="fas fa-head-side-mask"></i>
					<span>大人口罩: 100 個</span>
				</div>

				<div class="mask-info">
					<i class="fas fa-baby"></i>
					<span>兒童口罩: 100 個</span>
				</div>

				<div class="mask-info">
					最後更新時間:
				</div>

				<button class="btn-store-detail">
					<i class="fas fa-info-circle"></i>
					看詳細資訊
				</button>
			</li>
			<li class="store-info wraps">
				<h1>ＸＸ藥局</h1>

				<div class="mask-info">
					<i class="fas fa-head-side-mask"></i>
					<span>大人口罩: 100 個</span>
				</div>

				<div class="mask-info">
					<i class="fas fa-baby"></i>
					<span>兒童口罩: 100 個</span>
				</div>

				<div class="mask-info">
					最後更新時間:
				</div>

				<button class="btn-store-detail">
					<i class="fas fa-info-circle"></i>
					看詳細資訊
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, watch } from 'vue';

export default {
  setup() {
    const store = useStore();
    const currCity = computed({
      get: () => {
				console.log(store.state.currCity);
				console.log(store.state.location);
        return store.state.currCity
      },
      set: (value) => {
        store.commit('SET_CURR_CITY', value)
      }
    });
    const currDistrict = computed({
      get: () => {
        return store.state.currDistrict
      },
      set: (value) => {
        store.commit('SET_CURR_DISTRICT', value)
      }
    });

		const cityList = computed(() => store.getters.cityList);
		const districtList = computed(() => store.getters.districtList);

		watch(districtList, (v) => {
			const [arr] = v;
			console.log(arr.name);
			currDistrict.value = arr.name;
		})

    return {
      currCity,
      currDistrict,
			cityList,
			districtList
    }
  }
}
</script>