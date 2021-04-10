import Vue from 'vue'
import { ValidationObserver, ValidationProvider, configure, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
extend('required', {
  ...required,
  message: () => '此為必填欄位 It is required'
})
extend('name', {
  validate (value) {
    return /^[\u4E00-\u9FA5A-Za-z]+$/gi.test(value)
  },
  message: () => '請填入正確姓名 Please enter correctName'
})
extend('phone', {
  validate (value) {
    return /^09\d{8}$/gi.test(value)
  },
  message: '請輸入正確手機號碼 Please enter correct phone number'
})
extend('id', {
  validate (value) {
    return /^[A-Z]{1}[1-2]{1}[0-9]{8}$/gi.test(value)
  },
  message: '請輸入正確身份證字號 Please enter correct ID number'
})
extend('min', {
  validate (value, { length }) {
    return value.length >= length
  },
  params: ['length'],
  message: '請至少填滿 {length} 個數字 The length of number should be {length}'
})
extend('max', {
  validate (value, { length }) {
    return value.length <= length
  },
  params: ['length'],
  message: '請勿超過 {length} 個數字 Can not more then {length} number'
})
extend('email', {
  ...email,
  message: '請填入正確的 email 格式 Please enter correct email'
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
