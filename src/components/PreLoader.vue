<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocalStorage, useDark } from '@vueuse/core';

const cartItems = useLocalStorage<{ idprod: number; title: string; image: string; qty: number; priceSing: number, priceTot: number }[]>('cartItems', []);
const cartItemsCount = computed<number>(() => cartItems.value.length);
const isDark = useDark();
</script>

<template>
    <div class="loader">
        <p v-if="isDark"><img src="../assets/img/preloader-dark.gif"/></p>
        <p v-else><img src="../assets/img/preloader.gif"/></p>
        <p><i><slot>Caricamento in corso...</slot></i></p>
    </div>
</template>

<style></style>