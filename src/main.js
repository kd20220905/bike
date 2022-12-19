import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHatWizard,
  faHouse,
  faEnvelope,
  faUser,
  faGear,
  faBicycle,
  faStar as fasStar,
  faSquareParking,
  faStarHalfStroke,
  faMagnifyingGlass,
  fa1,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faHatWizard,
  faHouse,
  faEnvelope,
  faUser,
  faGear,
  faBicycle,
  fasStar,
  farStar,
  faSquareParking,
  faStarHalfStroke,
  faMagnifyingGlass,
  fa1
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
