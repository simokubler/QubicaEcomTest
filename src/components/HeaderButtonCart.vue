<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const cartItems = useLocalStorage<{ idprod: number; title: string; image: string; qty: number; priceSing: number, priceTot: number }[]>('cartItems', []);
const cartItemsCount = computed<number>(() => cartItems.value.length);

</script>

<template>
    <router-link
    :to="{ name: 'Cart' }"
    class="header__cart pointer"
    >
        <span class="header__cart-icon">
            <img src="../assets/img/cart_logo.svg"/>
        </span>
        <span class="header__cart-count">{{ cartItemsCount }}</span>
    </router-link>
</template>

<style></style>