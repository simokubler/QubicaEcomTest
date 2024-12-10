<script setup lang="ts">
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const isCartDropDown = useLocalStorage<boolean>('isCartDropDown', false);
const isAccountDropDown = useLocalStorage<boolean>('isAccountDropDown', false);
const isWishListDropDown = useLocalStorage<boolean>('isWishListDropDown', false);

const showDropDownWishList = (): void => {
  isCartDropDown.value = false;
  isAccountDropDown.value = false;
  isWishListDropDown.value = !isWishListDropDown.value;
};

</script>

<template>
    <div class="header__wishlist">
        <span
        class="header__wishlist-icon"
        @click="showDropDownWishList"
        ></span>
        <div
        class="header__dropdown header__dropdown--w200"
        :class="{ 'header__dropdown--is-active': isWishListDropDown }"
        >
        <div class="header__dropdown-content">
            <!-- <router-link
            :to="{ name: 'Login' }"
            class="header__account-link"
            >Login</router-link
            >
            <router-link
            :to="{ name: 'Register' }"
            class="header__account-link"
            >Register</router-link
            > -->
        </div>
        </div>
    </div>
</template>

<style></style>