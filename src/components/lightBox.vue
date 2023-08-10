<template>
  <transition name="model">
    <div class="modal-mask" v-show="showModal">
      <div class="modal-wrapper" @click.self="close">
        <div class="modal-container">
          <div class="modal-body" v-if="currStore">
            <h1 class="store-name">{{ currStore?.name }}</h1>
            <hr>
            <h2 class="title">營業時間</h2>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>一</th>
                  <th>二</th>
                  <th>三</th>
                  <th>四</th>
                  <th>五</th>
                  <th>六</th>
                  <th>日</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>早上</th>
                  <td v-for="(value, key) in servicePeriods[0]" :key="key">{{ value }}</td>
                </tr>
                <tr>
                  <th>中午</th>
                  <td v-for="(value, key) in servicePeriods[1]" :key="key">{{ value }}</td>
                </tr>
                <tr>
                  <th>晚上</th>
                  <td v-for="(value, key) in servicePeriods[2]" :key="key">{{ value }}</td>
                </tr>
              </tbody>
            </table>
            <h2 class="title">地址 {{ currStore?.address }}</h2>
            <h2 class="title">電話 {{ currStore?.phone }}</h2>
            <h2 class="title">備註 {{ currStore?.custom_note }}</h2>
          </div>
        </div>      
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const showModal = computed({
  get: () => {
    return store.state.showModal
  },
  set: (value) => {
    store.commit('SET_SHOW_MODAL', value)
  }
});
const close = () => {
  showModal.value = false
}

// 點擊的藥局詳細資料
const infoBoxSid = computed({
  get: () => {
    return store.state.infoBoxSid
  },
  set: (value) => {
    store.commit('SET_INFO_BOX_SID', value)
  }
})
const currStore = computed(() => {
  return store.state.stores.filter((i) => i.id === infoBoxSid.value)[0]
})

//營業時間
const servicePeriods = computed(() => {
  console.log(currStore?.value);
  let servicePeriods = currStore.value['service_periods'] || '';
  servicePeriods = servicePeriods.replace(/N/g, 'O').replace(/Y/g, 'X');

  return servicePeriods ? [
    servicePeriods.slice(0, 7).split(''),
    servicePeriods.slice(7, 14).split(''),
    servicePeriods.slice(14, 21).split('')
  ] : servicePeriods;
})

</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  display: table;
  transition: opacity .3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;

    .modal-container {
      width: min(520px, 90%);
      margin: 0px auto;
      padding: min(30px, 5%);
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      .modal-body {
        color: #343434;
        .store-name {
          font-size: 1.6rem;
          font-weight: bold;
          line-height: 1.5;
          color: #1a1a1a;
        }
        .title{
          font-weight: 500;
          margin-bottom: .5rem;
          line-height: 1.7;
        }
        table {
          border-spacing: 0;
          border-radius: 3px;
          width: 100%;
          margin-bottom: 1rem;
          border: 1px solid #1f8bde;
          color: #1f8bde;
        }
        th{
          background-color: #1f8bde;
          color: #fff;
          font-weight: 900;
        }
        td, th{
          padding: .3em;
          text-align: center;
          line-height: 1.5rem;
          border: 1px solid #1f8bde;
        }
      }
    }
  }
}
</style>

