import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";
import Setup from "@/views/Setup.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/setup", name: "Setup", component: Setup },
    {
      path: '/game',
      name: "Game",
      component: Game,
      props: true,
    },
  ],
});

export default router;
