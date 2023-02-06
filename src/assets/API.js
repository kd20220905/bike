let LocationRecommendList = new Map();
LocationRecommendList.set("500603001", [
  {
    name: "太陽堂老店",
    address: "400台中市中區自由路二段25號",
    tel: "0422200012",
    Image: "",
    stars: 2,
  },
  {
    name: "測試",
    address: "123123",
    tel: "047875754",
    Image: "",
    stars: 0,
  },
]);
LocationRecommendList.set("500606090", [
  {
    name: "嘉義涼麵",
    address: "407台中市西屯區西屯路三段164-7號",
    tel: "0424611622",
    stars: 4,
  },
  {
    name: "阿振肉包",
    address: "505彰化縣鹿港鎮中山路71號",
    tel: "047772754",
    stars: 3,
  },
  {
    name: "玉山銀行",
    address: "407台中市西屯區大墩路17號",
    tel: "0424612522",
    stars: 1,
  },
]);

export const LocationRecommend = new Promise((resolve) => {
  const data = {
    data: LocationRecommendList,
    state: 200,
  };
  setTimeout(() => {
    resolve(data);
  });
});

// 需要新增景點API
export const addLocationRecommend = (info) => {
  return new Promise((resolve) => {
    if (!LocationRecommendList.get(info.code)) {
      LocationRecommendList.set(info.code, [{ ...info.recommend }]);
    } else {
      LocationRecommendList.get(info.code).push(info.recommend);
    }
    const data = {
      data: {},
      state: 200,
    };
    resolve(data);
  });
};
