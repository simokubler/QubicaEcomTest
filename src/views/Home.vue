<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import { globalState } from '../stores/globalState';
import { useRoute, useRouter } from 'vue-router';

const error = ref<string | null>(null);
const products = ref<any[]>([]);
const filteredProducts = ref<any[]>([]);
const isLoadingProds = ref<boolean>(true);
const isLoggedIn = useLocalStorage<boolean>('isLoggedIn', false);
const route = useRoute();
const router = useRouter();


// Funzione per recuperare tutti i prodotti
const fetchProducts = async () => {
  try {
    isLoadingProds.value = true
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) throw new Error(`Errore nel fetching dei prodotti: ${response.statusText}`);
    products.value = await response.json();
    filteredProducts.value = products.value;
  } catch (error) {
    console.error('Errore nel fetching dei prodotti:', error);
  } finally {
    isLoadingProds.value = false
  }
};

const filterByCategory = async (category: string | '') => {
  if (category !== '') {
    try {
      isLoadingProds.value = true
      const response = await fetch (`https://fakestoreapi.com/products/category/${category}`);
      if (!response.ok) throw new Error(`Errore nel fetchingByCat dei prodotti: ${response.statusText}`);
      products.value = await response.json();
      filteredProducts.value = products.value;
    } catch(error) {
      console.error('Errore nel fetchingByCat dei prodotti:', error);
    } finally {
      isLoadingProds.value = false
    }
  } else {
    fetchProducts();
  }
};

const checkQueryFilterCat = ():void => {
  const queryCategory = Array.isArray(route.query.cat) ? route.query.cat[0] : route.query.cat || '';
  if (queryCategory) filterByCategory(queryCategory)
};

const goToProd = (idProd: number):void => {
  router.push({name: 'Product', params: { id: idProd }})
}

onMounted(() => {
  fetchProducts();
  checkQueryFilterCat();
});

watch(
  () => globalState.value.selectedCategory,
  (newCategory) => {
    filterByCategory(newCategory);
  }
);

</script>
<template>
    <div>
        <!-- Elenco dei prodotti filtrati -->
      <div v-if="!isLoadingProds">
        <div v-if="filteredProducts.length > 0" class="products">
          <div v-for="product in filteredProducts" :key="product.id" class="products__item">
            <div 
              @click="goToProd(product.id)"
              class="card pointer">
              <div class="card__image">
                <img :src="product.image" class="card__img"/>
              </div>
              <div class="card__title">
                {{ product.title }}
              </div>
              <div class="card__bottom">
                <span class="card__total-price">&euro;{{ product.price }}</span>
                <span v-if="isLoggedIn" class="card__add-cart"><img class="card__bottom__icon" src="../assets/img/cart_add.svg"/></span>
                <span v-if="isLoggedIn" class="card__add-wishlist"><img class="card__bottom__icon" src="../assets/img/wishlist_add.svg"/></span>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Nessun prodotto trovato</p>
        </div>
        <!-- <div>
            <a href="https://vite.dev" target="_blank">
                <img src="/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank">
                <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
            </a>
        </div>
        <HelloWorld msg="Vite + Vue" /> -->
      </div>
      <div v-else>
        <PreLoader>Caricamento in corso...</PreLoader>
      </div>
    </div>
</template>