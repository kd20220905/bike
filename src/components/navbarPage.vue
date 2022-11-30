<script setup>
import { ref } from "vue";
const area = ref("西屯區");
const ok = () => {
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
          @change="ok()"
          v-model="area"
        >
          <option value="中區">中區</option>
          <option value="東區">東區</option>
          <option value="西區">西區</option>
          <option value="南區">南區</option>
          <option value="北區">北區</option>
          <option value="西屯區">西屯區</option>
          <option value="南屯區">南屯區</option>
          <option value="北屯區">北屯區</option>
          <option value="北屯區">北屯區</option>
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
