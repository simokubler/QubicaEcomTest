<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useLocalStorage } from '@vueuse/core';

defineProps<{ msg: string }>();

const emit = defineEmits<{
  (event: 'show-sidebar', value: boolean): void;
}>();

const isBasketDropDown = useLocalStorage<boolean>('isBasketDropDown', false);
const isAccountDropDown = useLocalStorage<boolean>('isAccountDropDown', false);
const isWishListDropDown = useLocalStorage<boolean>('isWishListDropDown', false);
const showSideBar = useLocalStorage<boolean>('showSideBar', false);
const cartItems = useLocalStorage<any[]>('cartItems', []);
const wishItems = useLocalStorage<any[]>('wishItems', []);

const categories = ref<string[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

// Computed
const cartItemsCount = computed<number>(() => cartItems.value.length);

// Funzione per recuperare le categorie
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

const showDropDownBasket = (): void => {
  isAccountDropDown.value = false;
  isWishListDropDown.value = false;
  isBasketDropDown.value = !isBasketDropDown.value;
};

const showDropDownAccount = (): void => {
  isBasketDropDown.value = false;
  isWishListDropDown.value = false;
  isAccountDropDown.value = !isAccountDropDown.value;
};

const showDropDownWishList = (): void => {
  isBasketDropDown.value = false;
  isAccountDropDown.value = false;
  isWishListDropDown.value = !isWishListDropDown.value;
};

const toggleSidebar = (): void => {
  showSideBar.value = !showSideBar.value;
  emit('show-sidebar', showSideBar.value);
};

const formattedPrice = (price: number): string => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

const eventListener = (event: MouseEvent): void => {
  const target = event.target as HTMLElement;

  if (!target.closest('.header__basket,.header__account,.header__wishlist')) {
    isBasketDropDown.value = false;
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
            <div class="header__basket">
              <span
                class="header__basket-icon"
                @click="showDropDownBasket"
              ></span>
              <span class="header__basket-count">{{ cartItemsCount }}</span>
              <div
                class="header__dropdown"
                :class="{ 'header__dropdown--is-active': isBasketDropDown }"
              >
                <div
                  class="header__dropdown-content header__dropdown-content--overflow"
                >
                  <div
                    class="header__basket-item"
                    v-for="item in cartItems"
                    :key="item.id"
                  >
                    <a href="" class="header__basket-link">
                      <img
                        :src="require(`../assets/img/slider/${item.id}.jpg`)"
                        class="header__basket-img"
                      />
                    </a>
                    <div class="header__basket-details">
                      <h5>
                        <a class="header__basket-title" href=""
                          >{{ item.name }} ({{ item.quantity }})</a
                        >
                      </h5>
                      <div class="header__basket-price">
                        {{ formattedPrice(item.price) }}
                      </div>
                      <button
                        @click="removeItem(item)"
                        type="button"
                        class="header__basket-remove"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <div class="header__basket-btn">
                    <!-- <router-link
                      :to="{ name: 'Cart' }"
                      class="btn btn--boxshadow btn--brand w--100"
                      >complete order</router-link
                    > -->
                  </div>
                </div>
              </div>
            </div>
            <div class="header__account">
              <span
                class="header__account-icon"
                @click="showDropDownAccount"
              ></span>
              <div
                class="header__dropdown header__dropdown--w200"
                :class="{ 'header__dropdown--is-active': isAccountDropDown }"
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