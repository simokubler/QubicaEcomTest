import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Cart from '../views/Cart.vue';
import WishList from '../views/WishList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    props: true, // Passa il parametro come prop al componente
  },
  {
    path: '/cart/',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/wishlist/',
    name: 'WishList',
    component: WishList
  },
];

const router = createRouter({
  history: createWebHistory('/QubicaEcomTest/'),
  routes,
});

export default router;
