<template>
  <div v-if="popup" class="popup">
    <Panel header="Предупреждение!" class="popup-panel">
      <p class="mb10">
        Если вы перейдете на главную страницу, то все внесенные изменения будут
        потеряны
      </p>
      <div class="panel-btns">
        <Button
          @click="goTo('/', true)"
          label="на Главную"
          severity="danger"
          raised
        ></Button>
        <Button @click="popup = false" label="Остаться" raised></Button>
      </div>
    </Panel>
  </div>
  <div class="card">
    <div class="navbar">
      <span v-for="(item, index) in items" :key="index" class="btn-m">
        <Button
          :label="item.label"
          :icon="item.icon"
          :severity="isPrimary(item.to)"
          @click="goTo(item.to)"
        ></Button>
      </span>
    </div>

    <router-view />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Panel from "primevue/panel";
import Button from "primevue/button";
import { useIsChanged } from "@/store/isChanged";

const route = useRoute();
const router = useRouter();
const severity = ref("Home");
const popup = ref(false);
const items = ref([
  {
    label: "Home",
    icon: "pi pi-fw pi-home",
    to: "/",
  },
  {
    label: "Groups",
    icon: "pi pi-fw pi-users",
    to: "/groups",
  },
]);
const isPrimary = (sev) => {
  return route.fullPath === sev ? "primary" : "secondary";
};
const goTo = (link, isPopup) => {
  if (useIsChanged().isChanged && link === "/" && !isPopup) {
    popup.value = true;
    return;
  }
  if (isPopup) popup.value = false;
  severity.value = link;
  router.push(link);
};
</script>
<style>
* {
  padding: 0px;
  margin: 0px;
  border: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.navbar {
  padding: 10px;
  margin-bottom: 20px;
}
.btn-m {
  margin: 5px;
}
.mb10 {
  margin-bottom: 10px;
}
.popup {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-panel {
  max-width: 360px;
}
.panel-btns {
  display: flex;
  justify-content: space-between;
}
</style>
