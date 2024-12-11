<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import { useRoute } from 'vue-router';

const route = useRoute();
const RouteParamsId = route.params.id as string;
const productId = Number(RouteParamsId);
const product = ref<{ 
    id: number; 
    title: string; 
    price: number; 
    description: string;
    category: string;
    image: string;
    rating: object
    } | null>(null);
const isLoggedIn = useLocalStorage<boolean>('isLoggedIn', false);
const cartItems = useLocalStorage<{ idprod: number; title: string; image: string; qty: number; priceSing: number, priceTot: number }[]>('cartItems', []);
const wishItems = useLocalStorage<{ idprod: number; title: string; image: string; priceSing: number}[]>('wishItems', []);
const isLoadingProd = ref<boolean>(true);
const prodQty = ref<number>(1);

const getProduct = async (idprod: number) => {
    try {
        // cartItems.value = []
        isLoadingProd.value = true
        const response = await fetch(`https://fakestoreapi.com/products/${idprod}`)
        if (!response.ok) throw new Error(`Errore nel fetching del prodotto: ${response.statusText}`);
        product.value = await response.json();
    } catch {
        console.error('Errore nel fetching del prodotto');
    } finally {
        isLoadingProd.value = false
    }
}

const addCart = ():void => {
    const existingItem = cartItems.value.find(item => item.idprod === productId);
    const priceTot = prodQty.value * product.value.price
    if (!existingItem) {
        cartItems.value.push({
            idprod: productId,
            title: product.value.title,
            image: product.value.image,
            qty: prodQty.value,
            priceSing: product.value.price,
            priceTot: priceTot
        })
    } else {
        existingItem.qty += prodQty.value;
        existingItem.priceTot += priceTot;
    }
}

const toggleInWishList = ():void => {
    if (wishItems.value.some(item => item.idprod === productId)) {
        wishItems.value = wishItems.value.filter(item => item.idprod !== productId);
    } else {
        wishItems.value.push({
            idprod: productId,
            title: product.value.title,
            image: product.value.image,
            priceSing: product.value.price
        })
    }
}

const isInWishlist = computed<boolean>(() => {
    return wishItems.value.some(item => item.idprod === productId);
});

onMounted(() => {
    getProduct(productId);
});

</script>
<template>
    <div class="card_content">
        <div>
            <div v-if="!isLoadingProd">
                <div v-if="product" class="product_container">
                    <div class="product_image card__image">
                        <img 
                            :src="product.image" 
                            class="card__img"/>
                    </div>
                    <div class="product_content">
                        <div class="product_content-title card__title">
                            <h2>{{ product.title }}</h2>
                        </div>
                        <div class="product_content-description">
                            <p>{{ product.description }}</p>
                        </div>
                        <div class="product_content-price">
                            <span class="card__total-price"><b>&euro;{{ product.price }}</b></span>
                        </div>
                        <div v-if="isLoggedIn" class="product_content-addcart">
                            <span class="card__add-cart">
                                <input 
                                    id="prodQty"
                                    type="number" 
                                    min="1" 
                                    v-model="prodQty" 
                                />
                                <button @click="addCart()">
                                    Aggiungi al carrello
                                    <img class="card__bottom__icon" src="../assets/img/cart_add.svg"/>
                                </button>
                            </span>
                        </div>
                        <div v-if="isLoggedIn" class="product_content-wishlist">
                            <span class="card__add-wishlist">
                                <button @click="toggleInWishList()">
                                    <span v-if="isInWishlist">
                                        Rimuovi dalla lista dei desideri
                                    </span>
                                    <span v-else>
                                        Aggiungi alla lista dei desideri
                                    </span>
                                    <img class="card__bottom__icon" src="../assets/img/wishlist_add.svg"/>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <PreLoader>Caricamento del prodotto in corso...</PreLoader>
            </div>
        </div>
    </div>
</template>