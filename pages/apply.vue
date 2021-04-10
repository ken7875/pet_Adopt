<template>
  <div class="apply">
    <b-container>
      <h2>資料填寫</h2>
      <b-row class="wrap">
        <b-col
          align-self="center"
          offset-md="3"
          md="6"
          class="d-flex align-items-center justify-content-center"
        >
          <ValidationObserver ref="form" v-slot="{ invalid }" class="w-100 d-block">
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes, passed }" rules="name|required" class="d-block mb-4 w-100">
                <label for="name">{{ $t('name') }}</label>
                <input v-model="name" type="text" name="name" :class="['w-100 form-control', classes]">
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                <span v-if="passed" class="valid-feedback">{{ $t('correctName') }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes, passed }" rules="required|id" class="d-block mb-4 w-100">
                <label for="name">{{ $t('id') }}</label>
                <input v-model="id" type="id" name="id" :class="['w-100 form-control', classes]">
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                <span v-if="passed" class="valid-feedback">{{ $t('correctId') }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes, passed }" rules="required|phone" class="d-block mb-4 w-100">
                <label for="name">{{ $t('phone') }}</label>
                <input v-model="phone" type="text" name="phone" :class="['w-100 form-control', classes]">
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                <span v-if="passed" class="valid-feedback">{{ $t('correctPhone') }}</span>
              </validation-provider>
            </div>
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes, passed }" rules="required|email" class="d-block mb-4 w-100">
                <label for="name">{{ $t('email') }}</label>
                <input v-model="email" type="email" name="email" :class="['w-100 form-control', classes]">
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
                <span v-if="passed" class="valid-feedback">{{ $t('correctEmail') }}</span>
              </validation-provider>
            </div>
            <div class="d-flex justify-content-end">
              <button v-b-modal.modal-1 class="btn btn-primary" type="submit" :disabled="invalid" @click="$bvModal.show('bv-modal-example')">
                送出表單
              </button>
            </div>
          </ValidationObserver>
        </b-col>
      </b-row>
    </b-container>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title>
          Using <code>$bvModal</code> Methods
        </template>
        <div class="d-block text-center">
          <h3>恭喜你，成功送出表單!</h3>
        </div>
        <b-button class="mt-3" @click="$bvModal.hide('bv-modal-example'); goHome()">
          回首頁
        </b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      id: ''
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.apply {
  min-height: 100vh;
  .container {
    min-height: inherit;
    padding-top: 150px;
    h2{
      text-align: center;
      margin-bottom: 50px;
    }
  }
  .valid-feedback{
    font-size: 16px;
  }
}
</style>
