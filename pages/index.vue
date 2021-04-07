<template>
  <div>
    <div class="position-relative">
      <div class="banner">
        <img src="~@/assets/img/dog.jpg" alt="">
      </div>
      <div class="search">
        <div class="input-group">
          <select ref="kind" name="kind" class="kind">
            <option value="">
              {{ $t('chooseKind') }}
            </option>
            <option v-for="item in kind" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
          <select ref="sex" name="gender" class="gender">
            <option value="">
              {{ $t('chooseSex') }}
            </option>
            <option v-for="item in sex" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
          <select ref="shelter" name="shelter" class="shelter">
            <option value="">
              {{ $t('chooseShelter') }}
            </option>
            <option v-for="item in shelter" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="button">
          <button class="btn" @click="search">
            {{ $t('search') }}
          </button>
        </div>
      </div>
    </div>
    <div class="result">
      <b-container>
        <b-row align-v="center">
          <b-col v-for="item in displayData" :key="item.animal_id" md="4">
            <div class="card">
              <div class="card-img">
                <img :src="item.album_file" class="card-img-top" alt="pic" :onerror="defaultImg">
              </div>
              <div class="card-body">
                <p class="card-text">
                  {{ $t('kind') }}: {{ item.animal_kind }}
                </p>
                <p>
                  {{ $t('sex') }}: {{ item.animal_sex }}
                </p>
                <p class="text-nowrap card-text">
                  {{ $t('from') }}: {{ item.animal_foundplace }}
                </p>
                <p>
                  {{ $t('shelter') }}: {{ item.animal_place }}
                </p>
                <nuxt-link
                  :to="localePath(`/${item.animal_id}`)"
                  class="button"
                >
                  {{ $t('detail') }}
                </nuxt-link>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="watchMore d-flex justify-content-center">
      <button class="button" @click="watchMore">
        {{ $t('more') }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { apiHomePageData } from '../api'

export default {
  async asyncData () {
    let petData = []
    try {
      const url = 'https://nuxt-pet-adopt.herokuapp.com/apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=18&$skip=0'
      const res = await axios.get(url)
      petData = res.data
    } catch (error) {
      console.log(error)
    }
    return {
      defaultImg: `this.src="${require('../assets/img/notFound.png')}"`,
      displayData: petData
    }
  },
  data () {
    return {
      currentPage: 1,
      perPage: 18,
      kind: [],
      sex: [],
      shelter: [],
      top: 18,
      isError: false
    }
  },
  computed: {
    tranSex () {
      let sex = ''
      if (this.$refs.sex.value === '公' || this.$refs.sex.value === 'male') {
        sex = 'M'
      } else if (this.$refs.sex.value === '母' || this.$refs.sex.value === 'female') {
        sex = 'F'
      }
      return sex
    },
    tranKind () {
      let kind = ''
      if (this.$refs.kind.value === '狗' || this.$refs.kind.value === 'dog') {
        kind = '狗'
      } else if (this.$refs.kind.value === '貓' || this.$refs.kind.value === 'cat') {
        kind = '貓'
      }
      return kind
    }
  },
  mounted () {
    this.translate()
    this.filterKind()
    this.filterGender()
    this.filterShelter()
  },
  updated () {
    this.translate()
  },
  methods: {
    translate () {
      this.displayData.forEach((item) => {
        if (item.animal_sex === 'M') {
          item.animal_sex = this.$t('male')
          // item.animal_sex = '公'
        } else if (item.animal_sex === 'F') {
          item.animal_sex = this.$t('female')
          // item.animal_sex = '母'
        }
        if (item.animal_kind === '貓') {
          item.animal_kind = this.$t('cat')
        } else if (item.animal_kind === '狗') {
          item.animal_kind = this.$t('dog')
        }
      })
    },
    async watchMore () {
      try {
        if (this.isError === false) {
          const top = this.top += 18
          const url = `https://nuxt-pet-adopt.herokuapp.com/apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=${top}&$skip=0`
          const res = await axios.get(url)
          this.displayData = res.data
          console.log(url, this.displayData)
        } else if (this.isError === true) {
          let top = 18
          top += 18
          if (this.$refs.kind.value === '' && this.$refs.sex.value === '' && this.$refs.shelter.value === '') {
            return alert('請選擇其中一項')
          }
          let filterString = ''
          if (this.$refs.kind.value !== '') {
            filterString += `&animal_kind=${this.tranKind}`
          }
          if (this.$refs.sex.value !== '') {
            filterString += `&animal_sex=${this.tranSex}`
          }
          if (this.$refs.shelter.value !== '') {
            filterString += `&shelter_name=${this.$refs.shelter.value}`
          }
          const url = `https://nuxt-pet-adopt.herokuapp.com/apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=${top}&$skip=0${filterString}`
          const result = await axios.get(url)
          this.displayData = result.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    filterKind () {
      const kind = []
      this.displayData.forEach((item) => {
        kind.push(item.animal_kind)
      })
      const option = kind.filter((item, i, arr) => {
        return arr.indexOf(item) === i
      })
      this.kind = option
    },
    filterGender () {
      const sex = []
      this.displayData.forEach((item) => {
        sex.push(item.animal_sex)
      })
      const option = sex.filter((item, i, arr) => {
        if (item !== 'N') {
          return arr.indexOf(item) === i
        }
        return option
      })
      this.sex = option
    },
    filterShelter () {
      const shelter = []
      this.displayData.forEach((item) => {
        shelter.push(item.shelter_name)
      })
      const option = shelter.filter((item, i, arr) => {
        if (item !== 'N') {
          return arr.indexOf(item) === i
        }
        return option
      })
      this.shelter = option
    },
    async search () {
      this.isError = true
      const top = 18
      try {
        if (this.$refs.kind.value === '' && this.$refs.sex.value === '' && this.$refs.shelter.value === '') {
          return alert('請選擇其中一項')
        }
        let filterString = ''
        if (this.$refs.kind.value !== '') {
          filterString += `&animal_kind=${this.tranKind}`
          console.log(this.tranKind)
        }
        if (this.$refs.sex.value !== '') {
          filterString += `&animal_sex=${this.tranSex}`
        }
        if (this.$refs.shelter.value !== '') {
          filterString += `&shelter_name=${this.$refs.shelter.value}`
        }
        const url = `https://nuxt-pet-adopt.herokuapp.com/apiService/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=${top}&$skip=0${filterString}`
        const result = await axios.get(url)
        this.displayData = result.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $primary: #F2BE58;
  .banner{
    padding-top: 120px;
    height: 600px;
    width: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .search{
    display: flex;
    z-index: 10;
    justify-content: center;
    position: absolute;
    bottom: -8%;
    border-radius: 8px;
    background: #F1F0F8;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    .input-group{
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      width: 80%;
      select{
        margin-right: 6px;
        border: none;
        height: 40px;
        width: 100%;
      }
    }
  }
  .button{
    cursor: pointer;
    background-color: $primary;
    border: 1px solid $primary;
    border-radius: 4px;
  }
  .result{
    margin-top: 80px;
  }
  .card{
    margin-bottom: 40px;
    .button{
      padding: 8px 15px 8px 15px;
      color: #000000;
    }
  }
  .watchMore{
    margin-bottom: 80px;
    .button{
      padding: 8px 15px 8px 15px;
      color: #000000;
    }
  }
</style>
