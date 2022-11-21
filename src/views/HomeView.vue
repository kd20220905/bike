<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar/src/L.Control.Sidebar.css";
import "leaflet-sidebar";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import axios from "axios";
import { ref, onMounted } from "vue";

const store = useCounterStore();
const { ReGex } = store;

const map = ref(null);
const center = ref({
  lat: 24.1640894,
  lng: 120.659922,
});
const zoom = ref(16);
const m_mono = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "© OpenStreetMap", // 商用時必須要有版權出處
    zoomControl: true, // 是否秀出 - + 按鈕
  }
);

const bar = ref(null);
const markerInfo = ref({
  title: "",
  bemp: 0,
  sbi: 0,
  address: "",
  code: 0,
});

const slide = (event) => {
  const { title, bemp, sbi, address, code } = event.target.options;

  markerInfo.value.title = title;
  markerInfo.value.bemp = bemp;
  markerInfo.value.sbi = sbi;
  markerInfo.value.address = address;
  markerInfo.value.code = code;

  bar.value.show();
  map.value.setView(event.latlng, 18);
};

onMounted(() => {
  // marker標記
  axios
    .get(
      "https://datacenter.taichung.gov.tw/swagger/OpenData/9af00e84-473a-4f3d-99be-b875d8e86256"
    )
    .then((res) => {
      const data = res.data.retVal;
      // 建 marker 並放上地圖
      const customIcon = L.icon({
        iconUrl: "./dot.svg",
        iconSize: [32, 32],
      });
      data.forEach((d) => {
        L.marker([d.lat, d.lng], {
          icon: customIcon,
          title: ReGex(d.sna),
          bemp: d.bemp,
          sbi: d.sbi,
          address: d.ar,
          code: d.sno,
        })
          .addTo(map.value)
          .on("click", slide);
      });
    });

  // map地圖
  map.value = L.map("map", {
    center: center.value, //中心座標
    zoom: zoom.value, // 遠近
    zoomControl: true,
    layers: [m_mono],
  });

  L.control
    .scale({
      imperiasl: false,
      maxWidth: 300,
    })
    .addTo(map.value);

  // slider
  bar.value = L.control.sidebar("sidebar", {
    position: "left",
  });
  map.value.addControl(bar.value);
});
</script>

<template>
  <!-- <p>{{ bikeAry }}</p> -->
  <main>
    <div class="max-w-screen-xl mx-auto">
      <div id="map" class="pb-[60%] h-0 mx-3"></div>
      <div id="sidebar" class="!bg-white/80">
        <h2 class="text-3xl font-bold text-red-600">{{ markerInfo.title }}</h2>
        <span class="text-xs text-black/50">
          車站代號:{{ markerInfo.code }}
        </span>
        <div class="mt-10 grid grid-cols-2">
          <div>
            <h2 class="text-xl font-bold text-center">車輛</h2>
            <p class="text-3xl font-bold text-black/50 text-center mt-5">
              <font-awesome-icon icon="bicycle" />
              <span class="ml-3 text-black">{{ markerInfo.sbi }}</span>
            </p>
          </div>
          <div>
            <h2 class="text-xl font-bold text-center">空位</h2>
            <p class="text-3xl font-bold text-black/50 text-center mt-5">
              <font-awesome-icon icon="square-parking" />
              <span class="ml-3 text-black">{{ markerInfo.bemp }}</span>
            </p>
          </div>
        </div>
        <div class="my-3 border-2 border-black/20 rounded w-full">
          <div
            class="bg-[url('https://lh5.googleusercontent.com/p/AF1QipNuAAuk2DjGEmKkQfUMlZgT8Kk2Lkxkrz1_ysCd=w260-h175-n-k-no')] bg-cover rounded-t"
            style="height: 100px"
          ></div>
          <div class="m-2">
            <h4 class="text-bold text-2xl font-bold">嘉義涼麵</h4>
            <p>407台中市西屯區西屯路三段164-7號</p>
            <p>04 2461 1622</p>
            <div class="text-2xl text-yellow-400">
              <font-awesome-icon icon="star" />
              <font-awesome-icon icon="star" />
              <font-awesome-icon icon="star" />
              <font-awesome-icon icon="star-half-stroke" />
              <font-awesome-icon :icon="['far', 'star']" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
