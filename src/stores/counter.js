import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const bikeAry = ref([]);
  function ReGex(str) {
    const regex = /YouBike2.0_/g;
    return str.replace(regex, "");
  }
  return { bikeAry, ReGex };
});
