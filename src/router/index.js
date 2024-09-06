import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";
import Setup from "@/views/Setup.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/setup", name: "setup", component: Setup },
    {
      path: '/game',
      component: Game,
      props: (route) => ({
        username: route.query.username,
        sprite: parseInt(route.query.sprite)
      })
    },
  ],
});

export default router;
