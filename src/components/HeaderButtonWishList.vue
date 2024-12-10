<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const wishItems = useLocalStorage<{ idprod: number; title: string; image: string; priceSing: number}[]>('wishItems', []);
const wishItemsCount = computed<number>(() => wishItems.value.length);

</script>

<template>
    <router-link 
        :to="{name: 'WishList'}"
        class="header__wishlist">
        <span class="header__wishlist-icon">
            <img src="../assets/img/wishlist_add.svg"/>
        </span>
        <span class="header__wishlist-count">{{ wishItemsCount }}</span>
    </router-link>
</template>

<style></style>