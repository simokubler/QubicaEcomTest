<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const cartItems = useLocalStorage<{ idprod: number; title: string; image: string; qty: number; priceSing: number, priceTot: number }[]>('cartItems', []);
const cartItemsCount = computed<number>(() => cartItems.value.length);
const cartCount = ref<HTMLElement | null>(null);

watch(cartItemsCount, (newVal, oldVal) => {
  if (cartCount.value) {
    cartCount.value.classList.add('bounce');
    setTimeout(() => {
      cartCount.value?.classList.remove('bounce');
    }, 300); 
  }
});
</script>

<template>
    <router-link
        :to="{ name: 'Cart' }"
        class="header__cart"
        >
        <button class="header__cart-icon">
            <img src="../assets/img/cart_logo.svg"/>
        </button>
        <span ref="cartCount" class="header__cart-count">{{ cartItemsCount }}</span>
    </router-link>
</template>

<style></style>