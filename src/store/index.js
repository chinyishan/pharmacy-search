import { createStore } from 'vuex'

// Vuex4，創建一個新的 store 實例
export default createStore({
  state: {
    // 使用者目前所選縣市，預設臺北
    currCity: '臺北市',
    // 使用者目前所選區域，預設北投
    currDistrict: '北投區',
    // 存放 API 回傳的縣市/區域
    location: [],
    // 存放 API 回傳的藥局資訊
    stores: [],
    // 關鍵字
    keywords: ''
  },
	// 透過 mutations 操作 state
  mutations: {
    SET_CURR_CITY (state, currCity) {
      state.currCity = currCity
    },
    SET_CURR_DISTRICT (state, currDistrict) {
      state.currDistrict = currDistrict
    },
    SET_AREA_LOCATION (state, location) {
      state.location = location
    },
    SET_STORES (state, stores) {
      state.stores = stores
    },
    SET_KEYWORDS (state, keywords) {
      state.keywords = keywords
    },
  },
	actions: {
		// // 取得縣市區域資料
		async fetchLocations({ commit }) {
			const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
			.then((res) => res.json());
      // console.log(json, 'json');
			// 透過 commit 操作 mutations
			commit('SET_AREA_LOCATION', json)
		},

		// 取得藥局資料
		async fetchPharmacies({ commit }) {
			const json = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
			.then((res) => {
				return res.json()
			});

			// 整理格式，拆出經緯度
			const data = json.features.map((i) => ({
				...i.properties,
				latitude: i.geometry.coordinates[0],
				longitude: i.geometry.coordinates[1]
			}))
			commit('SET_STORES', data)
		}
	},
  getters: {
    // 縣市
    cityList(state) {
      return state.location.map((i) => i.name);
    },
    // 區域，用 optional chaining 處理預設值 undefined
    districtList(state) {
      return state.location.find((i) => i.name === state.currCity)?.districts || [];
    },
    //藥局縣市區篩選，比對是否有一樣的縣市區
    filteredStores(state) {
      const { stores } = state;
      return state.keywords 
      ? stores.filter((i) => i.name.includes(state.keywords)) 
      : stores.filter((i) => i.county === state.currCity && i.town === state.currDistrict);
    },
    currDistrictInfo(state, getters) {
      return getters.districtList.find((i) => i.name === state.currDistrict) || {};
    }
  }
})
