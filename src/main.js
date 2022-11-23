import { createApp } from 'vue'
import Toaster from '@meforma/vue-toaster'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import SoftUIDashboard from './soft-ui-dashboard'
import './middlewares/auth'

createApp(App)
  .use(store)
  .use(router)
  .use(SoftUIDashboard)
  .use(Toaster)
  .mount('#app')
