import { reactive } from 'vue';

export const inputMode = reactive({
  mode: 'GAME' // There will be 3 available game states for the player to have --> GAME (default state) | CHAT | DUEL
});