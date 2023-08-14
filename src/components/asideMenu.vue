<template>
	<div class="aside_container" :class="{ active: isActive }">
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
				<li class="store-info wraps" v-for="item in filteredStores" :key="item.id" @click="$emit('triggerMarker', item.id)">
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
					<button class="btn-store-detail" @click="openInfoBox( item.id )"> 
						<svg width="12" height="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							<path fill="#ffffff" d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
						</svg>
						詳細資訊
					</button>
				</li>
			</ul>
		</div>
		<span class="menu-btn" @click="toggleMenu">
			<svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
				<path fill="#6b7280" fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"/>
			</svg>
		</span>
	</div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue';

const store = useStore();

// 選擇縣市區域
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

// 藥局縣市區
const filteredStores = computed(() => store.getters.filteredStores);

// 關鍵字
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

// 燈箱
const showModal = computed({
	get: () => {
		return store.state.keywords
	},
	set: (value) => {
		store.commit('SET_SHOW_MODAL', value)
	}
});
const infoBoxSid = computed({
	get: () => {
		return store.state.infoBoxSid
	},
	set: (value) => {
		store.commit('SET_INFO_BOX_SID', value)
	}
})
const openInfoBox = (id) => {
	showModal.value = true
	infoBoxSid.value = id
}

const isActive = ref(false);

const closeMenu = computed(() => {
	return isActive.value ? false : true;
});

const toggleMenu = () => {
	isActive.value = closeMenu.value;
};
</script>

<style lang="scss" scoped>
.aside_container {
	position: fixed;
	z-index: 10;
	top: 0%;
	left: 0%;
	width: 25%;
	height: 100%;
	background-color: #fff;
	transition: all 1s ease-out;

	&.active {
		left: -25%;
		transition: all 1s ease-out;
	}
	.aside_menu {
		box-shadow: 5px 0 5px rgb(50, 50, 50, .5);
		height: 100%;
		overflow-y: scroll;
	
		.pharmacy_title {
			padding: 15px;
			font-size: 26px;
			font-weight: 900;
			background-image: linear-gradient(135deg, #1f8bde 0%, #1f8bde 20%, #50ebff 100%);
			color: #fff;
		}
		.container {
				border-bottom: 1px solid #aaa;
				padding: 10px;
				.wraps {
						&.wrap_select {
								display: flex;
								justify-content: space-between;
								align-items: center;
								flex-wrap: wrap;
								.sel_group {
										padding: 10px;
								}
						}
						&.wrap_search {
								padding: 10px;
								label {
										margin-bottom: 5px;
								}
						}
						label {
								display: inline-block;
								font-size: 16px;
								font-weight: 900;
								line-height: 1.5;
								margin-right: 8px;
								color: #4d4d4d;
						}
						select {
								position: relative;
								font-size: 16px;
								color: #333333;
								width: 100px;
								padding: 6px 20px 6px 8px;
								border-radius: 5px;
								border: 1px solid #cccccc;
								// appearance: none;
						}
						input {
								padding: 5px 20px 5px 8px;
								border-radius: 5px;
								border: 1px solid #cccccc;
								font-size: 16px;
								line-height: 1.5;
								width: 100%;
								appearance: none;
						}
				}
		}
		.store-info {
			position: relative;
			padding: 20px;
			font-size: 18px;
			line-height: 1.5;
			background-color: #fff;
			border-bottom: 1px solid #aaa;
			cursor: pointer;

				h2 {
					font-size: 22px;
					font-weight: 900;
					color: #343434;
					margin-bottom: 5px;

					.highlight {
						color: #1f8bde;
					}
				}
				.mask-info{
					position: relative;
					margin-bottom: 5px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: #3e3e3e;
					font-weight: 400;

					&:nth-child(4) {
							font-size: 12px;
					}
					> span {
							display: block;
							left: 10px;
							font-size: 16px;
					}
				}
				&:hover {
					background-color: #ededed;
				}
				.btn-store-detail {
					position: absolute;
					display: block;
					cursor: pointer;
					// width: 80px;
					// height: 80px;
					font-size: 14px;
					font-weight: 900;
					text-align: center;
					line-height: 1;
					padding: 10px;
					right: 6%;
					bottom: 30%;
					transform: translate(0%, 0%);
					border-radius: 5px;
					color: #fff;
					border: 0px solid #aaa;
					background-image: linear-gradient(135deg, #1f8bde 0%, #1f8bde 20%, #50ebff 100%);
					justify-content: center;
					align-items: center;

					svg {
						margin-right: 5px;
					}
				}
		}
	}
	.menu-btn {
		position: absolute;
		top: 50%;
		left: 100%;
    padding: 30px 5px;
		display: block;
		border-radius: 0 5px 5px 0;
		background-color: #fff;
		box-shadow: 5px 0 5px rgb(50, 50, 50, .5);
		cursor: pointer;
	}
}
</style>