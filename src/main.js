import { createApp } from 'vue'
import './style.css'
// import './assets/css/style.css'
import './assets/css/responsive.css'
import App from './App.vue'
import router from './router';
import BaseHeader from './components/BaseHeader.vue'
import HeaderButtonLogin from './components/HeaderButtonLogin.vue'; 
import HeaderButtonCart from './components/HeaderButtonCart.vue'; 
import HeaderButtonWishList from './components/HeaderButtonWishList.vue'; 
import HeaderButtonDarkMode from './components/HeaderButtonDarkMode.vue'; 
import PreLoader from './components/PreLoader.vue'


createApp(App)
.use(router)
.component('BaseHeader', BaseHeader)
.component('HeaderButtonLogin', HeaderButtonLogin)
.component('HeaderButtonCart', HeaderButtonCart)
.component('HeaderButtonWishList', HeaderButtonWishList)
.component('HeaderButtonDarkMode', HeaderButtonDarkMode)
.component('PreLoader', PreLoader)
.mount('#app')
