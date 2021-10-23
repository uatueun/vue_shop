/* eslint-disable eol-last */
import Vue from 'vue'
import lang from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'
// element ui 按需導入
import { Button, Form, FormItem, Input, Message } from 'element-ui'

locale.use(lang)

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$msg = Message