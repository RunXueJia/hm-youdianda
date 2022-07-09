import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';


Vue.use(Vant)
Vue.use(Lazyload);
Vue.use(Lazyload, {
    lazyComponent: true,
});