<template>
  <div>
    <b-container>
      <h2>{{ $t('idTitle') }}</h2>
      <div class="info">
        <b-row>
          <b-col md="6">
            <img :src="data.album_file" alt="pic" :onerror="defaultImg">
          </b-col>
          <b-col md="5" offset-md="1">
            <p>
              {{ $t('kind') }}: {{ data.animal_kind }}
            </p>
            <p>
              {{ $t('sex') }}: {{ data.animal_sex }}
            </p>
            <p>
              {{ $t('remark') }}: {{ data.animal_remark }}
            </p>
            <p>
              {{ $t('shelter') }}: {{ data.shelter_name }}
            </p>
            <p>
              {{ $t('shelterPlace') }}: {{ data.shelter_address }}
            </p>
            <p>
              {{ $t('contact') }}: {{ data.shelter_tel }}
            </p>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData (context) {
    const pageDetail = { data: {} }
    try {
      const res = await axios.get(`https://nuxt-pet-adopt.herokuapp.com/apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&animal_id=${context.params.id}`)
      pageDetail.data = res.data
    } catch (error) {
      console.log('error')
      context.error({ statusCode: 404, message: '找不到此頁面' })
    }
    return {
      data: pageDetail.data[0],
      defaultImg: `this.src="${require('../assets/img/notFound.png')}"`
    }
  },
  head: {
    title: '寵物詳細資訊頁面',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '寵物詳細資訊'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  mounted () {
    this.translate()
  },
  methods: {
    translate () {
      if (this.data.animal_sex === 'M') {
        this.data.animal_sex = this.$t('male')
      } else if (this.data.animal_sex === 'F') {
        this.data.animal_sex = this.$t('female')
      }
      if (this.data.animal_kind === '貓') {
        this.data.animal_kind = this.$t('cat')
      } else if (this.data.animal_kind === '狗') {
        this.data.animal_kind = this.$t('dog')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
      padding-top: 120px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .info{
          margin-bottom: 80px;
      }
      h2{
          margin-top: 90px;
          margin-bottom: 50px;
          text-align: center;
      }
      p{
          font-size: 24px;
          margin-bottom: 25px;
      }
  }
</style>
