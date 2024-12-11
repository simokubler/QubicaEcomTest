<script setup>
import { ref } from 'vue'
import { useDark } from '@vueuse/core';

const isShowSideBar = ref(false);
const isDark = useDark();
const handleSidebar = (showSideBar) => {
  isShowSideBar.value = showSideBar;
};
</script>

<template>
  <div id="apptemplate" :class="isDark ? 'dark' : 'light' ">
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
