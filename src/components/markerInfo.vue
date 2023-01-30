<script setup>
import { defineProps, ref, watchEffect } from "vue";
import { addLocationRecommend } from "../assets/API.js";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  code: {
    type: String,
    default: "000000",
  },
  sbi: {
    type: String,
    default: "2",
  },
  bemp: {
    type: String,
    default: "3",
  },
  locationrecommendinfo: {
    type: Array,
  },
});
// 自我推薦
const stars = ref([
  ["far", "star"],
  ["far", "star"],
  ["far", "star"],
  ["far", "star"],
  ["far", "star"],
]);
const recommendInfo = ref({
  name: "",
  address: "",
  tel: "",
  stars: 1,
});
watchEffect(() => {
  for (let i = 0; i < recommendInfo.value.stars; i++) {
    stars.value[i] = ["fas", "star"];
  }
});
const hoverInStar = (index) => {
  for (let i = 0; i < stars.value.length; i++) {
    if (i <= index) {
      stars.value[i] = ["fas", "star"];
    } else {
      stars.value[i] = ["far", "star"];
    }
  }
};
const hoverOutStar = () => {
  for (let i = 0; i < stars.value.length; i++) {
    if (i < recommendInfo.value.stars) {
      stars.value[i] = ["fas", "star"];
    } else {
      stars.value[i] = ["far", "star"];
    }
  }
};
const clickStar = (index) => {
  recommendInfo.value.stars = index + 1;
};
const submitRecommend = () => {
  const data = {
    code: props.code,
    recommend: {
      ...recommendInfo.value,
    },
  };
  addLocationRecommend(data).then((res) => {
    console.log(res);
  });
  console.log(data, "submitRecommend");
};
</script>

<template>
  <h2 class="text-3xl font-bold text-red-600">{{ props.title }}</h2>
  <span class="text-xs text-black/50"> 車站代號:{{ props.code }} </span>
  <div class="mt-10 grid grid-cols-2">
    <div>
      <h2 class="text-xl font-bold text-center">車輛</h2>
      <p class="text-3xl font-bold text-black/50 text-center mt-5">
        <font-awesome-icon icon="bicycle" />
        <span class="ml-3 text-black">{{ props.sbi }}</span>
      </p>
    </div>
    <div>
      <h2 class="text-xl font-bold text-center">空位</h2>
      <p class="text-3xl font-bold text-black/50 text-center mt-5">
        <font-awesome-icon icon="square-parking" />
        <span class="ml-3 text-black">{{ props.bemp }}</span>
      </p>
    </div>
  </div>
  <h3 class="text-bold text-2xl font-bold mt-5 text-center">我要推薦</h3>
  <form class="mt-2 grid grid-cols-2">
    <label for="viewTitle" class="text-lg font-bold">景點(餐廳)名稱</label>
    <input
      type="text"
      id="viewTitle"
      class="border-2 rounded"
      v-model="recommendInfo.name"
    />
    <label for="viewTitle" class="text-lg font-bold mt-2">聯絡地址</label>
    <input
      type="text"
      id="viewTitle"
      class="border-2 rounded mt-2"
      v-model="recommendInfo.address"
    />
    <label for="viewTitle" class="text-lg font-bold mt-2">聯絡電話</label>
    <input
      type="text"
      id="viewTitle"
      class="border-2 rounded mt-2"
      v-model="recommendInfo.tel"
    />
    <label for="viewTitle" class="text-lg font-bold mt-2">推薦指數</label>
    <div class="text-2xl text-yellow-400 inline mt-1">
      <button type="button" v-for="(star, index) in stars" :key="star + index">
        <font-awesome-icon
          :icon="star"
          @mouseenter="hoverInStar(index)"
          @mouseleave="hoverOutStar()"
          @click="clickStar(index)"
        />
      </button>
    </div>
    <button
      class="col-span-2 py-2 bg-red-400 rounded text-white font-bold text-md mt-2"
      @click.prevent="submitRecommend()"
    >
      送出
    </button>
  </form>
  <h3 class="text-bold text-2xl font-bold mt-5 text-center">推薦景點</h3>
  <template v-for="info in locationrecommendinfo" :key="info.name">
    <div class="my-3 border-2 border-black/20 rounded w-full">
      <div
        class="bg-[url('https://lh5.googleusercontent.com/p/AF1QipNuAAuk2DjGEmKkQfUMlZgT8Kk2Lkxkrz1_ysCd=w260-h175-n-k-no')] bg-cover rounded-t"
        style="height: 100px"
      ></div>
      <div class="m-2">
        <h4 class="text-bold text-2xl font-bold">{{ info.name }}</h4>
        <p>{{ info.address }}</p>
        <p>{{ info.tel }}</p>
        <div class="text-2xl text-yellow-400">
          <template v-for="index in 5" :key="index">
            <font-awesome-icon icon="star" v-if="index <= info.stars" />
            <font-awesome-icon :icon="['far', 'star']" v-else />
          </template>
        </div>
      </div>
    </div>
  </template>
</template>
