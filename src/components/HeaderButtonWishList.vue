<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const wishItems = useLocalStorage<{ idprod: number; title: string; image: string; priceSing: number}[]>('wishItems', []);
const wishItemsCount = computed<number>(() => wishItems.value.length);
const wishlistCount = ref<HTMLElement | null>(null);

watch(wishItemsCount, (newVal, oldVal) => {
  if (wishlistCount.value) {
    wishlistCount.value.classList.add('bounce');
    setTimeout(() => {
      wishlistCount.value?.classList.remove('bounce');
    }, 300); 
  }
});
</script>

<template>
    <router-link 
        :to="{name: 'WishList'}"
        class="header__wishlist">
        <button class="header__wishlist-icon">
            <img src="../assets/img/wishlist_add.svg"/>
        </button>
        <span ref="wishlistCount" class="header__wishlist-count">{{ wishItemsCount }}</span>
    </router-link>
</template>

<style></style>