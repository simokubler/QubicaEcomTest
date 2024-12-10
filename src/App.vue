<script setup>
import { ref } from 'vue'

const isShowSideBar = ref(false);

const handleSidebar = (showSideBar) => {
  isShowSideBar.value = showSideBar;
};
</script>

<template>
  <div id="app">
    <BaseHeader @show-sidebar="handleSidebar"/>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
