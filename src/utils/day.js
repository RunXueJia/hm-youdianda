// console.log('dayjs');
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export const getrelativeTime = (time) => dayjs().to(dayjs(time))
import Vue from "vue";
Vue.filter('getrelativeTime', (time) => dayjs().to(dayjs(time)))
export const TimeToString = (time) => dayjs(time).format('YYYY-MM-DD')