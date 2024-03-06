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
        "https://datacenter.taichung.gov.tw/swagger/OpenData/86dfad5c-540c-4479-bb7d-d7439d34eeb1"
      );
      this.bikeAry = res.data.retVal;
      return this.bikeAry;
    } catch (err) {
      throw new Error(err);
    }
  }
  return { ReGex, bikeAry, GetBikes };
});
