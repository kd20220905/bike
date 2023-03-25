<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar/src/L.Control.Sidebar.css";
import "leaflet-sidebar";
import { LocationRecommend } from "../assets/API.js";
import { useCounterStore } from "@/stores/counter";
import { ref, onMounted } from "vue";
import MarkerInfo from "../components/markerInfo.vue";
import NavbarPage from "../components/navbarPage.vue";
import FooterPage from "../components/footerPage.vue";

const store = useCounterStore();
const { ReGex, GetBikes, bikeAry } = store;

const map = ref(null);
const center = ref([24.1640894, 120.659922]);
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

/**
 * 地圖初始化
 * @param {Object} center 地圖中心
 * @param {Number} zoom 地圖視野
 * @param {L.tileLayer} m_mono 地圖資訊
 */
const buildMap = (center, zoom, m_mono) => {
  map.value = null;
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
let markers = [];
const markerInMap = (data) => {
  markers.forEach((marker) => {
    marker.onRemove(map.value);
  });
  markers = [];
  const customIcon = L.icon({
    iconUrl: "./image/dot.svg",
    iconSize: [32, 32],
  });
  data.forEach((d) => {
    const marker = L.marker([d.lat, d.lng], {
      icon: customIcon,
      title: ReGex(d.sna),
      bemp: d.bemp,
      sbi: d.sbi,
      address: d.ar,
      code: d.sno,
    })
      .addTo(map.value)
      .on("click", clickMarker);
    markers.push(marker);
  });
  console.log(markers);
};
async function clickMarker(event) {
  const { title, bemp, sbi, address, code } = event.target.options;
  markerInfo.value.title = title;
  markerInfo.value.bemp = bemp;
  markerInfo.value.sbi = sbi;
  markerInfo.value.address = address;
  markerInfo.value.code = code;

  LocationRecommendInfo.value = {};
  await getLocationRecommend();
  bar.value.show();
  map.value.setView(event.latlng, 18);
}
// 已推薦API
const getLocationRecommend = async () => {
  await LocationRecommend.then((res) => {
    console.log(res, "getLocationRecommend");
    const data = res.data;
    for (let [key, value] of data) {
      LocationRecommendInfo.value =
        key === markerInfo.value.code ? value : LocationRecommendInfo.value;
    }
  });
};
const LocationRecommendInfo = ref([]);
async function getBikes() {
  try {
    const retVal = await GetBikes();
    // 建立標點
    markerInMap(retVal);
  } catch (err) {
    throw new Error(err);
  }
}
// 每五分鐘重新接收 API
const repeatGetAPI = () => {
  let liveSetTimeout = "";
  clearTimeout(liveSetTimeout);
  getBikes();
  liveSetTimeout = setTimeout(repeatGetAPI, 1000 * 60 * 5);
};
onMounted(() => {
  repeatGetAPI();
  buildMap(center.value, zoom.value, m_mono);
});

// Navbar
/**
 * 改變地圖中心座標
 * @param {String} latLng ex:"24.1845974,120.6087352"
 */
const changeCenter = (latLng, nZoom) => {
  const aLatLng = latLng.split(",");
  map.value.setView(aLatLng, nZoom);
};
// 以代碼搜尋站點
const isSearchState = ref(true);
const searchBikeCode = (nCode) => {
  const sCode = nCode.toString();
  let latLng = "";
  for (let i = 0; i < bikeAry.length; i++) {
    if (bikeAry[i].sno === sCode) {
      // show bar
      markerInfo.value.title = ReGex(bikeAry[i].sna);
      markerInfo.value.bemp = bikeAry[i].bemp;
      markerInfo.value.sbi = bikeAry[i].sbi;
      markerInfo.value.address = bikeAry[i].address;
      markerInfo.value.code = bikeAry[i].sno;
      latLng = bikeAry[i].lat + "," + bikeAry[i].lng;
      bar.value.show();
      // set center
      changeCenter(latLng, 18);
      isSearchState.value = true;
      break;
    } else {
      isSearchState.value = false;
    }
  }
  LocationRecommendInfo.value = {};
  getLocationRecommend();
};
</script>

<template>
  <!-- <p>{{ bikeAry }}</p> -->
  <main>
    <div class="max-w-screen-xl mx-auto">
      <NavbarPage
        @set-center="changeCenter"
        @search-bike-code="searchBikeCode"
        :issearchstate="isSearchState"
      />
      <div id="map" class="md:pb-[60%] pb-[100%] h-0"></div>
      <div id="sidebar" class="!bg-white/80">
        <MarkerInfo
          :title="markerInfo.title"
          :code="markerInfo.code"
          :sbi="markerInfo.sbi"
          :bemp="markerInfo.bemp"
          :locationrecommendinfo="LocationRecommendInfo"
          @getlocationrecommend="getLocationRecommend"
        />
      </div>
      <FooterPage />
    </div>
  </main>
</template>
