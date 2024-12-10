<script setup lang="ts">
import { ref, computed, defineEmits, onMounted, onUnmounted } from 'vue';
import { useLocalStorage } from '@vueuse/core';

// check percorso o problema
import HeaderButtonLogin from './HeaderButtonLogin.vue'; 
import HeaderButtonCart from './HeaderButtonCart.vue'; 
import HeaderButtonWishList from './HeaderButtonWishList.vue'; 

const emit = defineEmits<{
  (event: 'show-sidebar', value: boolean): void;
}>();

const isBasketDropDown = useLocalStorage<boolean>('isBasketDropDown', false);
const isAccountDropDown = useLocalStorage<boolean>('isAccountDropDown', false);
const isWishListDropDown = useLocalStorage<boolean>('isWishListDropDown', false);
const showSideBar = useLocalStorage<boolean>('showSideBar', false);
const cartItems = useLocalStorage<any[]>('cartItems', []);
const wishItems = useLocalStorage<any[]>('wishItems', []);
const isLoggedIn = useLocalStorage<boolean>('isLoggedIn', false);
const categories = ref<string[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

// Computed
// const cartItemsCount = computed<number>(() => cartItems.value.length);

const fetchCategories = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) throw new Error('Errore nel recupero delle categorie');
    categories.value = await response.json();
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    isLoading.value = false;
  }
};

const toggleSidebar = (): void => {
  showSideBar.value = !showSideBar.value;
  emit('show-sidebar', showSideBar.value);
};

const eventListener = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;

  if (!target.closest('.header__basket,.header__account,.header__wishlist')) {
    isCartDropDown.value = false;
    isAccountDropDown.value = false;
    isWishListDropDown.value = false;
  }
  if (!target.closest('.navbar')) {
    showSideBar.value = false;
    emit('show-sidebar', false);
  }
};

onMounted(() => {
  fetchCategories();
  document.addEventListener('click', eventListener);
});

onUnmounted(() => {
  document.removeEventListener('click', eventListener);
});
</script>

<template>
<header class="header header--bg">
showsidebar
{{showSideBar}}
    <div class="container">
      <div class="navbar">
        <div class="navbar__row">
          <div class="header__logo">
            <router-link
              :to="{ name: 'Home' }"
              class="header__logo-img"
            >
            </router-link>
          </div>
          <div
            class="navbar__items"
            :class="{ 'navbar__items--is-active': showSideBar }"
          >
            <ul class="navbar__ul">
              <li class="navbar__item">
                <router-link
                  :to="{ name: 'Home' }"
                  class="navbar__link navbar__link--is-active"
                  >home</router-link
                >
              </li>
              <li class="navbar__item navbar__item--has-sub">
                <a @click.prevent href="" class="navbar__link">Categories</a>
                <ul v-if="!isLoading && !error" class="navbar__subset">
                  <li v-for="(category, index) in categories" :key="index" class="navbar__link">{{ category }}</li>
                </ul>
                <ul v-else class="navbar__subset">
                  <li class="navbar__link"><i>Caricamento in corso...</i></li>
                </ul>
              </li>
              <li class="navbar__item">
                <router-link :to="{ name: 'Product' }" class="navbar__link"
                  >Product</router-link
                >
              </li>
            </ul>
          </div>
          <div class="navbar__action">
            <HeaderButtonCart v-if="isLoggedIn" />
            <HeaderButtonLogin />
            <!-- <div class="header__account">
              <span
                class="header__account-icon"
                @click="showDropDownAccount"
              ></span>
              <div
                class="header__dropdown header__dropdown--w200"
                :class="{ 'header__dropdown--is-active': isAccountDropDown }"
              >
              </div>
            </div> -->
            <HeaderButtonWishList v-if="isLoggedIn" />
            <div
              class="header__menu"
              :class="{ 'header__menu--is-active': showSideBar }"
              @click="toggleSidebar"
            >Clicca</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style></style>