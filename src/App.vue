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
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
