<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { ref } from "vue";
const systemErrorCodes = ref([
  [
    "系統代碼 - 0",
    `出現訊息代碼0，請參考以下步驟：<br>
1. 因您的卡片放置的時間過短，系統並沒有成功讀取，請延長卡片感應時間。<br>
2. 因您的卡片放置於皮夾/卡夾內層，無法讀取，請將卡片取出後重新感應。`,
  ],
  [
    "系統代碼 - 1",
    `出現訊息代碼1：為卡片未註冊。<br>
電子票證必須先註冊成為會員才能使用YouBike。同時，請確認您註冊時已將此張卡片登錄您的卡片清單內。<br>
(註：若您是新註冊會員，在登錄成功後，須等3-5分鐘才能租車)`,
  ],
  [
    "系統代碼 - 2",
    `1. 租車時感應卡片後產生訊息代碼2<br>
系統尚無您前次的還車紀錄，請還車後方能租車，如您已還車，請撥打各縣市客服電話(一般付費)協助處理。<br>
<br>
2. 還車時感應卡片後產生訊息代碼2<br>
若出現2號代碼，請先確認還車柱面板上之燈號，若停留在藍色還車燈，表示車輛並未成功歸還，請將車輛拉出重還(可左右搖晃龍頭讓車鎖鬆動)或是嘗試將車子往前靠，確認車子鎖片和車柱溝槽完全密合上鎖，成功還車後面板還車藍燈會跳到刷卡藍燈閃爍，即可靠卡感應。若燈號為綠色刷卡燈，刷卡仍出現錯誤代碼2，請立即撥打各縣市客服電話(一般付費)查詢。`,
  ],
  [
    "系統代碼 - 3",
    `出現訊息代碼3：為補扣前次款項及補登記錄。由於您前次還車時，卡片餘額不足或是未感應到卡片，導致系統沒有成功扣到該次的款項，因此在本次租車時先進行補扣。`,
  ],
  [
    "系統代碼 - 4",
    `出現訊息代碼4：代表電子票證的餘額不足，請確保卡片餘額超過1元方可租車。`,
  ],
  [
    "系統代碼 - 5",
    `出現訊息代碼5：是指錯卡還車(刷A卡租車，刷B卡還車)，請確認燈號跳回綠色刷卡燈，即代表還車成功，下次使用A卡租車會先出現3號代碼補扣上次的款項與補登記錄，再刷卡便能租車。`,
  ],
  [
    "系統代碼 - 6",
    `出現訊息代碼6：為扣款餘額不足，表示您的卡片有須扣款的金額，但卡片餘額不足以支付，請於下次租車前先加值超過扣款金額，再到租借站任一車柱上感應扣款，屆時會出現代碼3，即成功補扣款項，再刷卡即可租車。`,
  ],
  [
    "系統代碼 - 7",
    `出現訊息代碼7：表示電子票證異常，請撥打各縣市客服電話 (一般付費)確認卡片狀態。`,
  ],
]);
const modules = ref([Pagination]);
const pagination = ref({
  clickable: true,
  renderBullet: function (index, className) {
    return (
      '<span class="w-[25px] h-[25px] bg-white ' +
      className +
      '">' +
      index +
      "</span>"
    );
  },
});
</script>

<template>
  <div class="grid grid-cols-3 md:grid-cols-1 gap-5 m-5"></div>
  <div>
    <p class="text-white text-2xl font-bold mb-3">系統代碼參照</p>
    <Swiper :pagination="pagination" :modules="modules">
      <SwiperSlide
        v-for="(systemError, index) in systemErrorCodes"
        :key="systemError[0]"
      >
        <div
          class="bg-slate-800 text-white min-h-[415px] md:min-h-[250px]"
          :class="{ 'translate-x-0 text-white': isActive[index] }"
        >
          <h5 class="font-bold bg-slate-900 py-2 text-center text-white">
            {{ systemError[0] }}
          </h5>
          <p class="p-2" v-html="systemError[1]" />
        </div>
      </SwiperSlide>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>
