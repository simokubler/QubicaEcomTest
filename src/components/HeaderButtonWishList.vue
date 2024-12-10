<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const wishItems = useLocalStorage<{ idprod: number; title: string;}[]>('wishItems', []);
const wishItemsCount = computed<number>(() => wishItems.value.length);

</script>

<template>
    <div class="header__wishlist">
        <span class="header__wishlist-icon">
            <img src="../assets/img/wishlist_add.svg"/>
        </span>
        <span class="header__wishlist-count">{{ wishItemsCount }}</span>
    </div>
</template>

<style></style>