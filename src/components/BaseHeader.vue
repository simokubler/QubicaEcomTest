<script setup lang="ts">
import { ref, computed, defineEmits, onMounted, onUnmounted } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { globalState } from '../stores/globalState';
// check percorso o problema
import HeaderButtonLogin from './HeaderButtonLogin.vue'; 
import HeaderButtonCart from './HeaderButtonCart.vue'; 
import HeaderButtonWishList from './HeaderButtonWishList.vue'; 
import HeaderButtonDarkMode from './HeaderButtonDarkMode.vue'; 

const emit = defineEmits<{
  (event: 'show-sidebar', value: boolean): void;
}>();

const router = useRouter();
const showSideBar = useLocalStorage<boolean>('showSideBar', false);
const cartItems = useLocalStorage<{ idprod: number; title: string; image: string; qty: number; priceSing: number, priceTot: number }[]>('cartItems', []);
const wishItems = useLocalStorage<{ idprod: number; title: string; image: string; priceSing: number}[]>('wishItems', []);
const isLoggedIn = useLocalStorage<boolean>('isLoggedIn', false);
const categories = ref<string[]>([]);
const isLoadingCats = ref<boolean>(true);
const error = ref<string | null>(null);
const selectedCategory = globalState.value.selectedCategory
// Computed
// const cartItemsCount = computed<number>(() => cartItems.value.length);

const fetchCategories = async () => {
  try {
    isLoadingCats.value = true;
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) throw new Error(`Errore nel recupero delle categorie: ${response.statusText}`);
    categories.value = await response.json();
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    isLoadingCats.value = false;
  }
};

const toggleSidebar = (): void => {
  showSideBar.value = !showSideBar.value;
  emit('show-sidebar', showSideBar.value);
};
const hideSidebar = ():void => {
  showSideBar.value = false;
  emit('show-sidebar', false);
}
const eventListener = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;
  if (!target.closest('.navbar')) {
    hideSidebar()
  }
};

const changeSelectedCat = (category: string | ''): void => {
  if (category !== '') router.push({ name: 'Home', query: { cat: category } });
  else router.push({ name: 'Home', query: {} });
  globalState.value.selectedCategory = category
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
    <div class="container">
      <div class="navbar">
        <div class="navbar__row">
          <div class="header__logo">
            <router-link
              :to="{ name: 'Home' }"
              @click="changeSelectedCat(''), hideSidebar()"
              class="header__logo-img"
            >
            </router-link>
          </div>
          <div
            class="navbar__items"
            :class="{ 'navbar__items--is-active': showSideBar }"
          >
            <ul class="navbar__ul">
              <!-- <li class="navbar__item">
                <router-link
                  :to="{ name: 'Home' }"
                  @click="changeSelectedCat(''), hideSidebar()"
                  class="navbar__link"
                  >Home</router-link
                >
              </li> -->
              <!-- <li class="navbar__item navbar__item--has-sub">
                <a @click.prevent href="" class="navbar__link">Categorie</a>
                <ul v-if="!isLoadingCats && !error" class="navbar__subset"> -->
                  <!-- <li 
                    @click="changeSelectedCat('')"
                    class="navbar__item"
                  >Tutte</li> -->
                  <li v-for="(category, index) in categories" 
                    :key="index" 
                    @click="changeSelectedCat(category), hideSidebar()"
                    class="navbar__item pointer"
                  ><a class="navbar__link ">{{ category }}</a></li>
                <!-- </ul>
                <ul v-else class="navbar__subset">
                  <li class="navbar__link"><i>Caricamento in corso...</i></li>
                </ul>
              </li> -->
              <!-- <li class="navbar__item navbar__item--has-sub">
                <a @click.prevent href="" class="navbar__link">Categorie</a>
                <ul v-if="!isLoadingCats && !error" class="navbar__subset">
                  <li 
                    @click="changeSelectedCat('')"
                    class="navbar__link"
                  >Tutte</li>
                  <li v-for="(category, index) in categories" 
                    :key="index" 
                    @click="changeSelectedCat(category)"
                    class="navbar__link"
                  >{{ category }}</li>
                </ul>
                <ul v-else class="navbar__subset">
                  <li class="navbar__link"><i>Caricamento in corso...</i></li>
                </ul>
              </li> -->
            </ul>
          </div>
          <div class="navbar__action">
            <HeaderButtonCart v-if="isLoggedIn" />
            <HeaderButtonWishList v-if="isLoggedIn" />
            <HeaderButtonLogin />
            <HeaderButtonDarkMode />
            <button
              class="header__menu"
              :class="{ 'header__menu--is-active': showSideBar }"
              @click="toggleSidebar"
            >
              <img src="../assets/img/burger-menu.svg"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style></style>