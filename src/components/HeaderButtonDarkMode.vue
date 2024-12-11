<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { useLocalStorage, useDark } from '@vueuse/core';

    const isDark = useDark();
    // const toggleDarkMode = useToggle(isDark);

    const toggleDarkMode = (): void => {
        isDark.value = !isDark.value;
    };
</script>

<template>
    <button class="toggleDarkModeBtn" :class="isDark ? 'dark' : '' " @click="toggleDarkMode()">
        <span v-if="isDark" class="dark">
        <img src="../assets/img/light-mode.svg"/>
        </span>
        <span v-else class="light">
        <img src="../assets/img/dark-mode.svg"/>
        </span>
    </button>
</template>
<style></style>