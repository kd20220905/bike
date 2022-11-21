<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar/src/L.Control.Sidebar.css";
import "leaflet-sidebar";
import axios from "axios";
import { ref, onMounted } from "vue";

const map = ref(null);
const center = ref({
  lat: 24.1640894,
  lng: 120.659922,
});
const markerInfo = ref({
  title: "",
  bemp: 0,
  sbi: 0,
  address: "",
});
const bar = ref(null);
const m_mono = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "© OpenStreetMap", // 商用時必須要有版權出處
    zoomControl: true, // 是否秀出 - + 按鈕
  }
);

onMounted(() => {
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
          title: d.sna,
          bemp: d.bemp,
          sbi: d.sbi,
          address: d.ar,
        })
          .addTo(map.value)
          .on("click", slide);
      });
    });

  map.value = L.map("map", {
    center: center.value, //中心座標
    zoom: 16, // 遠近
    zoomControl: true,
    layers: [m_mono],
  });

  bar.value = L.control.sidebar("sidebar", {
    position: "left",
  });
  map.value.addControl(bar.value);
  L.control
    .scale({
      imperiasl: false,
      maxWidth: 300,
    })
    .addTo(map.value);
});

const slide = (event) => {
  bar.value.show();
  const Info = event.target.options;
  markerInfo.value.title = Info.title;
  markerInfo.value.bemp = Info.bemp;
  markerInfo.value.sbi = Info.sbi;
  markerInfo.value.address = Info.address;
  map.value.setView(event.latlng, 18);
};
</script>

<template>
  <main>
    <div class="max-w-screen-xl mx-auto">
      <div id="map" class="pb-[60%] h-0 mx-3"></div>
      <div id="sidebar" class="!bg-white/80">
        <h2 class="text-3xl font-bold text-red-600">{{ markerInfo.title }}</h2>
        <span class="text-xs text-black/50">車站代號: 00000001</span>
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
      </div>
    </div>
  </main>
</template>

<style>
/* #map {
  height: 800px;
} */
</style>
