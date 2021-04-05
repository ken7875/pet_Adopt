<template>
  <div>
    <b-container v-if="!isError">
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
              {{ $t('from') }}: {{ data.animal_remark }}
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
    <div v-if="isError" class="d-flex justify-content-center align-items-center">
      <h1>{{ errorMessage }}</h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData (context) {
    const pageDetail = { data: {} }
    let isError = false
    const errorMessage = '找不到此頁面'
    try {
      const res = await axios.get(`http://localhost:3000/apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=200&animal_id=${context.params.id}`)
      // filter=animal_id=${context.params.id}
      pageDetail.data = res.data
    } catch (error) {
      isError = true
    }
    return {
      data: pageDetail.data[0],
      isError,
      errorMessage,
      defaultImg: `this.src="${require('../assets/img/notFound.png')}"`
    }
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
