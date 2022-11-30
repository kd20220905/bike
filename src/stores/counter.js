import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const bikeAry = [];
  function ReGex(str) {
    const regex = /YouBike2.0_/g;
    return str.replace(regex, "");
  }
  async function GetBikes() {
    try {
      const res = await axios.get(
        "https://datacenter.taichung.gov.tw/swagger/OpenData/9af00e84-473a-4f3d-99be-b875d8e86256"
      );
      this.bikeAry = res.data.retVal;
      return this.bikeAry;
    } catch (err) {
      throw new Error(err);
    }
  }
  return { ReGex, bikeAry, GetBikes };
});
