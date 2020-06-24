import { createApp } from 'vue';
import Page from "./list.vue";
import Menu from "./menu.vue";
import "./getto.css";

createApp({
  components: {
    Page,
    Menu,
  },
  template: "<Page/><Menu/>",
}).mount('#main');