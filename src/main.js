import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
// global styles
import './assets/main.css'

let app 

onAuthStateChanged(projectAuth, () => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }    
})
