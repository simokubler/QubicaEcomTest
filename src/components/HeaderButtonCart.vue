<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const cartItems = useLocalStorage<{ idprod: number; title: string; qty: number; priceTot: number }[]>('cartItems', []);
const cartItemsCount = computed<number>(() => cartItems.value.length);

</script>

<template>
    <div class="header__cart">
        <span class="header__cart-icon">
            <img src="../assets/img/cart_logo.svg"/>
        </span>
        <span class="header__cart-count">{{ cartItemsCount }}</span>
        <!-- <router-link
            :to="{ name: 'Cart' }"
            class="btn btn--boxshadow btn--brand w--100"
            >complete order</router-link
        > -->
    </div>
</template>

<style></style>