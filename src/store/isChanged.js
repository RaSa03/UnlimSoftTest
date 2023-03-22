import { defineStore } from "pinia";
import { ref } from "vue";

export const useIsChanged = defineStore("changed", () => {
  const isChanged = ref(false);

  return { isChanged };
});
