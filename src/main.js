import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css/normalize.css'
import './index.css';

import store from './store';
import router from './router';

let app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app')
