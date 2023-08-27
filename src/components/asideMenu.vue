<template>
	<div class="container_aside" :class="{ active: isActive }">
		<div class="aside_menu">
			<div class="content_search">
				<div class="title_pharmacy">
					<h1>
						<svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							<path fill="#ffffff" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6a3 3 0 0 1 0 6z"/>
						</svg>
						口罩藥局查詢
					</h1>
				</div>
				<div class="wraps wrap_select">
					<div class="sel">
						<label>縣市</label>
						<select v-model="currCity">
							<option v-for="item in cityList" :key="item">{{ item }}</option>
						</select>
					</div>
					<div class="sel">
						<label>區域</label>
						<select v-model="currDistrict">
							<option v-for="item in districtList" :key="item.id">{{ item.name }}</option>
						</select>
					</div>
				</div>
				<div class="wraps wrap_keywords">
					<!-- <label>
						<svg width="12" height="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
							<path fill="#4d4d4d" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0z"/>
						</svg>
						關鍵字搜尋
					</label> -->
					<input type="text" placeholder="請輸入關鍵字搜尋" v-model="keywords">
				</div>
			</div>
			<div class="content_store">
				<ul class="store_lists">
					<li class="store_info" v-for="item in filteredStores" :key="item.id" @click="handleMarker(item.id)">
						<h2 v-html="keywordsHighlight(item.name)"></h2>
						<div class="mask_info">
							<div class="info">
								<svg width="18" height="18" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
									<path fill="#7c7c7c" d="M57.881 28.421C57.107 6.895 51.98 2 32 2S6.893 6.896 6.119 28.421C4.668 28.788 3 30.148 3 34.464c0 4.961 2.764 6.564 5.385 6.968c1.434 8.971 6.619 14.679 17.697 19.577c1.422.63 3.58.991 5.918.991c2.34 0 4.496-.361 5.918-.991C48.996 56.11 54.18 50.401 55.617 41.432C58.236 41.028 61 39.425 61 34.464c0-4.318-1.668-5.677-3.119-6.043M54.668 39.56l-.814.057l-.107.795c-1.354 10.095-7.635 14.817-16.648 18.804c-1.156.512-3.061.817-5.098.817c-2.035 0-3.941-.306-5.098-.817c-9.014-3.986-15.295-8.709-16.648-18.804l-.105-.795l-.816-.057C6.336 39.35 5 37.778 5 34.464c0-2.786.709-4.197 2.111-4.197c.068 0 .141.003.215.009c.191 1.018.418 1.76.689 2.256c.686 1.25 1.977 1.931 2.121 2.004l1.725.874l-.277-1.89c-.002-.021-.291-2.031-.186-4.765c.789-11.259 1.5-12 6.08-12c1.205 0 2.691.096 4.414.206c2.654.17 5.959.382 10.109.382s7.455-.212 10.109-.383c1.723-.11 3.209-.206 4.412-.206c4.582 0 5.293.743 6.078 11.994c.104 2.75-.184 4.751-.188 4.771l-.279 1.891l1.727-.875c.146-.073 1.436-.754 2.121-2.004c.273-.497.5-1.238.693-2.256c1.547-.116 2.322 1.266 2.324 4.188c.002 3.316-1.334 4.888-4.33 5.097"/>
									<path fill="#7c7c7c" d="M40.1 47.499H23.901c-.9 0-.9.857-.9.857c0 3.43 4.5 5.143 9 5.143s9-1.713 9-5.143c-.001 0-.001-.857-.901-.857M25 31.132c0-.552-.113-1.073-.295-1.562c1.029.747 1.859 1.753 2.295 3.06c0-7.998-14-7.998-14-.998c.652-1.632 2.162-2.72 3.963-3.252A4.45 4.45 0 0 0 16 31.132a4.5 4.5 0 0 0 9 0m12 1.498c.436-1.308 1.264-2.313 2.295-3.06A4.456 4.456 0 0 0 39 31.132a4.5 4.5 0 0 0 9 0a4.462 4.462 0 0 0-.963-2.752c1.801.532 3.311 1.62 3.963 3.252c0-7-14-7-14 .998m-5 11.869c4.18-.002 6.27-3 4.18-3h-8.359c-2.089 0-.001 3 4.179 3"/>
								</svg>
								<span>大人口罩: {{ item.mask_adult }}個</span>
							</div>
							<div class="info">
								<svg width="18" height="18" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
									<path fill="#7c7c7c" d="M92 144a16 16 0 1 1 16-16a16 16 0 0 1-16 16Zm72-32a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm-14.4 49.85a41 41 0 0 1-43.2 0a12 12 0 1 0-12.8 20.3a65 65 0 0 0 68.8 0a12 12 0 1 0-12.8-20.3ZM236 128A108 108 0 1 1 128 20a108.12 108.12 0 0 1 108 108Zm-24 0a84.1 84.1 0 0 0-78.08-83.77c-9.31 14.09-9.89 27-9.92 27.83a4 4 0 0 0 8-.06a12 12 0 0 1 24 0a28 28 0 0 1-56 0c0-.65.1-11.19 5.52-24.92A84 84 0 1 0 212 128Z"/>
								</svg>
								<span>小孩口罩: {{ item.mask_child }}個</span>
							</div>
						</div>
						<div class="mask_update">
							最後更新時間：{{ item.updated }}
						</div>
						<div class="btn_detail">
							<button @click="openInfoBox( item.id )"> 
								<svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" stroke="none" d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
								</svg>
								<span>詳細資訊</span>
							</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<span class="btn_show" @click="toggleMenu">
			<svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
				<path fill="#6b7280" fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708z"/>
			</svg>
		</span>
	</div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, watch, defineEmits } from 'vue';

const store = useStore();

// 定義emit跟props的變數
// const emits = defineEmits(['triggerMarkerPopup']);

// const props = defineProps({
// 		foo: String
// })

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

//定義emit跟props的變數
const emits = defineEmits(['triggerMarkerPopup']);

//emit 觸發事件
const handleMarker = (id) => {
	console.log(id);
	emits("triggerMarkerPopup", id)
}

//選單開關
const isActive = ref(false);
const toggleMenu = () => {
	isActive.value = !isActive.value;
	emit("setShow", isActive.value)
};

</script>

<style lang="scss" scoped>
.container_aside {
	position: fixed;
	z-index: 10;
	top: 0%;
	left: 0%;
	width: 30%;
	height: 100%;
	background-color: #fff;
	transition: all .5s ease-out;

	&.active {
		left: -30%;
		transition: all .5s ease-out;
	}
	.aside_menu {
		box-shadow: 5px 0 5px rgb(50, 50, 50, .5);
		height: 100%;
		.content_search {
			border-bottom: 1px solid #aaa;
			background-image: linear-gradient(to right, #1f8bde 0%, #1f8bde 30%, #50ebff 100%);
			.title_pharmacy {
				padding: 14px;
				font-size: 22px;
				font-weight: 600;
				letter-spacing: 1px;
				color: #fff;
			}
			.wraps {
				padding: 14px;
				// background: #fff;
				&.wrap_select {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					.sel {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 45%;

						label {
							font-size: 18px;
							font-weight: 900;
							color: #fff;
						}
					}
				}
				&.wrap_keywords {
					padding-top: 0px;
					padding-bottom: 24px;
				}
				select {
					position: relative;
					font-size: 16px;
					color: #333333;
					width: 100px;
					padding: 6px;
					border-radius: 5px;
					border: 1px solid #cccccc;
					// appearance: none;
					display: inline-block;
					width: 70%;
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
		.content_store {
			height: calc(100% - 170px);
			overflow-y: scroll;
			.store_lists {
				.store_info {
					position: relative;
					padding: 16px;
					font-size: 18px;
					background-color: #fff;
					border-bottom: 1px solid #aaa;
					cursor: pointer;

					h2 {
						font-size: 22px;
						font-weight: 900;
						color: #000000;
						margin-bottom: 10px;

						.highlight {
							color: #1f8bde;
						}
					}
					.mask_info {
						position: relative;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						flex-wrap: wrap;
						color: #7c7c7c;
						font-weight: 600;
						font-size: 16px;
						margin-bottom: 10px;
						
						.info {
							margin-right: 12px;
							display: flex;
							align-items: center;

							svg {
								margin-right: 2px;
							}
						}
					}
					.mask_update {
						margin-bottom: 10px;
						font-size: 12px;
						color: #686868;
					}
					&:hover {
						background-color: #f4f4f4;
					}
					.btn_detail {
						display: flex;
						justify-content: flex-end;

						button {
							cursor: pointer;
							font-size: 16px;
							font-weight: 900;
							padding: 8px 12px;
							border-radius: 5px;
							background: transparent;
							color: #1f8bde;
							border: 0px solid #aaa;
							display: flex;
							align-items: center;

							svg {
								color: #1f8bde;
								margin-right: 2px;
							}
							&:hover {
								color: #fff;
								background-image: linear-gradient(to right, #1f8bde 0%, #1f8bde 20%, #50ebff 100%);

								svg {
									color: #fff;
								}
							}
						}

					}
				}
			}
		}
	}
	.btn_show {
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