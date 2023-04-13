const { createApp } = require('vue');
import App from './App.vue';
import ProductGridItem from './components/ProductGridItem.vue';

const app = createApp(App);
app.component('ProductGridItem', ProductGridItem);

app.mount('#app');
