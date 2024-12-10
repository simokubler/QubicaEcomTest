<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const isCartDropDown = useLocalStorage<boolean>('isCartDropDown', false);
const isAccountDropDown = useLocalStorage<boolean>('isAccountDropDown', false);
const isWishListDropDown = useLocalStorage<boolean>('isWishListDropDown', false);
const cartItems = useLocalStorage<any[]>('cartItems', []);

const showDropDownCart = (): void => {
  isAccountDropDown.value = false;
  isWishListDropDown.value = false;
  isCartDropDown.value = !isCartDropDown.value;
};

const formattedPrice = (price: number): string => {
  return new Intl.NumberFormat('it', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

const cartItemsCount = computed<number>(() => cartItems.value.length);

</script>

<template>
<!-- TODO: check showDropDownCart -->
    <div class="header__cart">
        <span
        class="header__cart-icon"
        @click="showDropDownCart"
        ></span>
        <span class="header__cart-count">{{ cartItemsCount }}</span>
        <div
        class="header__dropdown"
        :class="{ 'header__dropdown--is-active': isCartDropDown }"
        >
        <div
            class="header__dropdown-content header__dropdown-content--overflow"
        >
            <div
            class="header__cart-item"
            v-for="item in cartItems"
            :key="item.id"
            >
            <a href="" class="header__cart-link">
                <img
                :src="require(`../assets/img/slider/${item.id}.jpg`)"
                class="header__cart-img"
                />
            </a>
            <div class="header__cart-details">
                <h5>
                <a class="header__cart-title" href=""
                    >{{ item.name }} ({{ item.quantity }})</a
                >
                </h5>
                <div class="header__cart-price">
                {{ formattedPrice(item.price) }}
                </div>
                <button
                @click="removeItem(item)"
                type="button"
                class="header__cart-remove"
                >
                remove
                </button>
            </div>
            </div>
            <div class="header__cart-btn">
            <!-- <router-link
                :to="{ name: 'Cart' }"
                class="btn btn--boxshadow btn--brand w--100"
                >complete order</router-link
            > -->
            </div>
        </div>
        </div>
    </div>
</template>

<style></style>