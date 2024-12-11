import { createApp } from 'vue'
import './style.css'
// import './assets/css/style.css'
import './assets/css/responsive.css'
import App from './App.vue'
import router from './router';
import BaseHeader from './components/BaseHeader.vue'
import PreLoader from './components/PreLoader.vue'


createApp(App)
.use(router)
.component('BaseHeader', BaseHeader)
.component('PreLoader', PreLoader)
.mount('#app')
