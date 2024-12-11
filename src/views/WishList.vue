<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = useLocalStorage<boolean>('isLoggedIn', false);
const cartItems = useLocalStorage<{ idprod: number; title: string; image: string; qty: number; priceSing: number, priceTot: number }[]>('cartItems', []);
const wishItems = useLocalStorage<{ idprod: number; title: string; image: string; priceSing: number}[]>('wishItems', []);
// const prodQty = ref<number>(1);

const checkIsLogged = ():void => {
    if(!isLoggedIn.value) router.push({name: 'Home'})
}

const removeItem = (idProd: number) => {
    wishItems.value = wishItems.value.filter(item => item.idprod !== idProd); 
}

watch(
  () => isLoggedIn.value,
  (newStatus) => {
    if (!newStatus) checkIsLogged()
  }
);

onMounted(() => {
    checkIsLogged();
});

</script>
<template>
    <div class="card_content">
        <div class="wishlist_container">
            <h2>Lista dei desideri</h2>        
            <div v-if="wishItems.length > 0" class="wishlist_list">
                <div class="wish_item">
                    <div class="wish_item-img">Immagine</div>
                    <div class="wish_item-title">Titolo</div>
                    <div class="wish_item-price">Prezzo</div>
                    <div class="wish_item-delete"></div>
                </div>
                <div v-for="item in wishItems" :key="item.idprod" class="wish_item">
                    <div class="wish_item-img">
                        <img :src="item.image" />
                    </div>
                    <div class="wish_item-title">
                        {{ item.title }}
                    </div>
                    <div class="wish_item-price">
                        &euro; {{ item.priceSing }}
                    </div>
                    <div class="wish_item-delete">
                        <img 
                        class="pointer"
                        @click="removeItem(item.idprod)"
                        src="../assets/img/delete.svg" />
                    </div>
                </div>
            </div>
            <div v-else>
                <i>Nessun prodotto nella lista dei desideri</i>
            </div>
        </div>
    </div>
</template>