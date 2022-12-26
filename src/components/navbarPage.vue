<script setup>
import { ref } from "vue";
const area = ref("24.1845974,120.6087352");
const selectArea = () => {
  console.log(area.value);
};
</script>

<template>
  <div
    class="mx-3 pb-10 border-b-2 border-black/30 mb-10 md:flex items-end justify-between flex-row"
  >
    <h1 class="my-3 md:m-0">
      <a href="#">
        <img src="/image/LOGO.png" alt="" class="mx-auto" />
      </a>
    </h1>
    <form class="grid grid-cols-1 gap-3 mt-3 md:grid-cols-2 md:m-0">
      <label for="selectArea" class="font-bold text-black/70 text-xl">
        <span>選取行政區：</span>
        <select
          name="Area"
          id="selectArea"
          class="px-4 py-1 appearance-none focus:outline-red-400 rounded-sm"
          @change="selectArea()"
          v-model="area"
        >
          <option value="24.1418783,120.6755461">中區</option>
          <option value="24.1372346,120.679742">東區</option>
          <option value="24.145992,120.6573995">西區</option>
          <option value="24.119988,120.6556816">南區</option>
          <option value="24.1581376,120.6748242">北區</option>
          <option value="24.1845974,120.6087352">西屯區</option>
          <option value="24.1402322,120.597207">南屯區</option>
          <option value="24.188061,120.6950732">北屯區</option>
          <option value="24.2502474,120.7177547">豐原區</option>
          <option value="24.0969053,120.6786456">大里區</option>
          <option value="24.1049154,120.7336496">太平區</option>
          <option value="24.2959795,120.53154">清水區</option>
          <option value="24.2308609,120.5548964">沙鹿區</option>
          <option value="24.3777332,120.6113777">大甲區</option>
          <option value="24.2423768,120.7569667">東勢區</option>
          <option value="24.2478474,120.5125868">梧棲區</option>
          <option value="24.0823035,120.587425">烏日區</option>
          <option value="24.2641189,120.6547928">神岡區</option>
          <option value="24.1426657,120.53307">大肚區</option>
          <option value="24.2303796,120.6220631">大雅區</option>
          <option value="24.3183147,120.6718966">后里區</option>
          <option value="24.045497,120.6872071">霧峰區</option>
          <option value="24.211361,120.6942998">潭子區</option>
          <option value="24.230317,120.4943397">龍井區</option>
          <option value="24.3308856,120.6467498">外埔區</option>
          <option value="24.2747895,121.0180659">和平區</option>
          <option value="24.2627324,120.7748513">石岡區</option>
          <option value="24.3658062,120.559984">大安區</option>
          <option value="24.1776959,120.7621998">新社區</option>
        </select>
      </label>

      <label for="bikeNumber" class="font-bold text-black/70 text-xl">
        <span>車站代號：</span>
        <input
          type="number"
          id="bikeNumber"
          class="px-4 py-1 appearance-none focus:outline-red-400 rounded-l-sm"
        />
        <button
          class="bg-white px-4 py-1 rounded-r-sm hover:bg-red-600 hover:text-white inline"
        >
          <font-awesome-icon icon="magnifying-glass" />
        </button>
      </label>
    </form>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
}
</style>
