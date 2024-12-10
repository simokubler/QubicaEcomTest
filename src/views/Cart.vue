<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = useLocalStorage<boolean>('isLoggedIn', false);
const cartItems = useLocalStorage<{ idprod: number; title: string; image: string; qty: number; priceSing: number, priceTot: number }[]>('cartItems', []);
const wishItems = useLocalStorage<{ idprod: number; title: string; image: string; priceSing: number}[]>('wishItems', []);

const checkIsLogged = ():void => {
    if(!isLoggedIn.value) router.push({name: 'Home'})
}

const updateItem = (idProd: number, qtyProd: number, priceProd: number) => {
    const existingIndex = cartItems.value.findIndex(item => item.idprod === idProd);
    if (existingIndex !== -1) {
        cartItems.value[existingIndex] = {
            ...cartItems.value[existingIndex],
            qty: qtyProd,
            priceTot: qtyProd * priceProd,
        };
    }
}
const removeItem = (idProd: number) => {
    cartItems.value = cartItems.value.filter(item => item.idprod !== idProd); 
}

watch(
  () => isLoggedIn.value,
  (newStatus) => {
    if (!newStatus) checkIsLogged()
  }
);

const totalCart = computed<number>(() => {
    let total = 0;
    for (const item of cartItems.value) {
        total += item.priceTot;
    }
    return total;
});

onMounted(() => {
    checkIsLogged();
});

</script>
<template>
    <div>
        <div>
            <h2>cartItems</h2>
            {{ cartItems }}
        
            <div v-if="cartItems.length > 0" class="cart_container">
                <div class="cart_item">
                    <div class="cart_item-img">Immagine</div>
                    <div class="cart_item-title">Titolo</div>
                    <div class="cart_item-qty">Quantità</div>
                    <div class="cart_item-price">Prezzo</div>
                </div>
                <div v-for="item in cartItems" :key="item.idprod" class="cart_item">
                    <div class="cart_item-img">
                        <img :src="item.image" />
                    </div>
                    <div class="cart_item-title">
                        {{ item.title }}
                    </div>
                    <div class="cart_item-qty">
                        <input 
                        type="number"
                        min="1"
                        v-model="item.qty"
                        @input="updateItem(item.idprod, item.qty, item.priceSing)"
                        />
                    </div>
                    <div class="cart_item-price">
                        &euro; {{ item.priceTot }}
                    </div>
                    <div class="cart_item-delete pointer">
                        <img 
                        @click="removeItem(item.idprod)"
                        src="../assets/img/delete.svg" />
                    </div>
                </div>
                <div class="total_container">
                    <div class="total-item">&euro; {{ totalCart }}</div>
                </div>
            </div>
            <div v-else>
                <i>Nessun prodotto nel carrello</i>
            </div>
        </div>
    </div>
</template>