<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar/src/L.Control.Sidebar.css";
import "leaflet-sidebar";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import axios from "axios";
import { ref, onMounted } from "vue";
import MarkerInfo from "../components/markerInfo.vue";
import NavbarPage from "../components/navbarPage.vue";
import FooterPage from "../components/footerPage.vue";

const store = useCounterStore();
const { ReGex, GetBikes, bikeAry } = store;

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
  bemp: "0",
  sbi: "0",
  address: "",
  code: "000000",
});

const buildMap = (center, zoom, m_mono) => {
  map.value = L.map("map", {
    center: center, //中心座標
    zoom: zoom, // 遠近
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
};
const markerInMap = (data) => {
  const customIcon = L.icon({
    iconUrl: "./image/dot.svg",
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
      .on("click", clickMarker);
  });
};
const clickMarker = (event) => {
  const { title, bemp, sbi, address, code } = event.target.options;

  markerInfo.value.title = title;
  markerInfo.value.bemp = bemp;
  markerInfo.value.sbi = sbi;
  markerInfo.value.address = address;
  markerInfo.value.code = code;

  bar.value.show();
  map.value.setView(event.latlng, 18);
};
async function getBikes() {
  try {
    const retVal = await GetBikes();
    // 建立標點
    markerInMap(retVal);
  } catch (err) {
    throw new Error(err);
  }
}
onMounted(() => {
  // 接收bike資訊
  getBikes();
  // map地圖
  buildMap(center.value, zoom.value, m_mono);
});
const changeCenter = (latLng) => {
  const aLatLng = latLng.split(",");
  map.value.setView(aLatLng);
};
</script>

<template>
  <!-- <p>{{ bikeAry }}</p> -->
  <main>
    <div class="max-w-screen-xl mx-auto">
      <button class="bg-red-400" @click="changeCenter()">按鈕</button>
      <NavbarPage @set-center="changeCenter" />
      <div id="map" class="md:pb-[60%] pb-[100%] h-0"></div>
      <div id="sidebar" class="!bg-white/80">
        <MarkerInfo
          :title="markerInfo.title"
          :code="markerInfo.code"
          :sbi="markerInfo.sbi"
          :bemp="markerInfo.bemp"
        />
      </div>
      <FooterPage />
    </div>
  </main>
</template>
