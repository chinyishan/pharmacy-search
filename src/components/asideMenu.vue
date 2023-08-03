<template>
  <div class="aside_menu">
		<div class="pharmacy_title">
			<h1>
				<svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path fill="#ffffff" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6a3 3 0 0 1 0 6z"/>
				</svg>
				藥局查詢
			</h1>
		</div>
		<div class="container">
			<div class="wraps wrap_select">
				<div class="sel_group">
					<label>縣市</label>
					<select v-model="currCity">
						<option v-for="item in cityList" :key="item">{{ item }}</option>
					</select>
				</div>
				<div class="sel_group">
					<label>行政區</label>
					<select v-model="currDistrict">
						<option v-for="item in districtList" :key="item.id">{{ item.name }}</option>
					</select>
				</div>
			</div>
			<div class="wraps wrap_search">
				<label>
					<svg width="12" height="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path fill="#4d4d4d" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z"/>
					</svg>
					關鍵字搜尋
				</label>
				<input type="text" placeholder="請輸入關鍵字搜尋" v-model="keywords">
			</div>
		</div>
		<ul class="store-lists">
			<li class="store-info wraps" v-for="item in filteredStores" :key="item.id">
				<h2 v-html="keywordsHighlight(item.name)"></h2>
				<div class="mask-info">
					<i class="fas fa-head-side-mask"></i>
					<span>大人口罩：{{ item.mask_adult }} 個</span>
				</div>
				<div class="mask-info">
					<i class="fas fa-baby"></i>
					<span>小孩口罩：{{ item.mask_child }} 個</span>
				</div>
				<div class="mask-info">
					最後更新時間：{{ item.updated }}
				</div>
				<button class="btn-store-detail" @click="openInfoBox(item.id)">
					<svg width="12" height="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
						<path fill="#ffffff" d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
					</svg>
					詳細資訊
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
			currDistrict.value = arr.name;
		})

		const filteredStores = computed(() => store.getters.filteredStores);

    const keywords = computed({
      get: () => {
        return store.state.keywords
      },
      set: (value) => {
        store.commit('SET_KEYWORDS', value)
      }
    });
		const keywordsHighlight = (val) => {
			return val.replace(new RegExp(keywords.value, 'g'),`<span class="highlight">${keywords.value}</span>`);
		};

    const showModal = computed({
      get: () => {
        return store.state.keywords
      },
      set: (value) => {
        store.commit('SET_SHOW_MODAL', value)
      }
    });
		const openInfoBox = (id) => {
			showModal.value = true
			infoBoxSid.value = id
		}
		const infoBoxSid = computed({
			get: () => {
				return store.state.infoBoxSid
			},
			set: (value) => {
				store.commit('SET_INFO_BOX_SID', value)
			}
		})

    return {
      currCity,
      currDistrict,
			cityList,
			districtList,
			filteredStores,
			keywords,
			showModal,
			infoBoxSid,
			openInfoBox,
			keywordsHighlight
    }
  }
}
</script>