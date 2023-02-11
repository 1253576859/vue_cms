import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import useLoginStore from './store/login/login'
import registerIcons from './global/register-icons'


const app = createApp(App)
app.use(registerIcons)
app.use(pinia)
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router)
app.mount('#app')
