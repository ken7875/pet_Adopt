<template>
  <div>
    <header>
      <b-container class="container d-flex justify-content-between align-items-center h-100">
        <h1>
          <nuxt-link to="/">
            {{ $t('title') }}
          </nuxt-link>
        </h1>
        <div>
          <div class="dropdown">
            <a
              class="d-flex align-items-center"
              @click="dropdown = !dropdown"
            >
              <span class="mr-2">{{ $t('language') }}</span>
              <i class="fas fa-sort-down pb-1" />
            </a>
            <div v-if="dropdown" class="dropdown_Menu">
              <nuxt-link :to="switchLocalePath('en')">
                English
              </nuxt-link>
              <nuxt-link :to="switchLocalePath('zh-tw')">
                中文
              </nuxt-link>
            </div>
          </div>
        </div>
      </b-container>
    </header>
    <Nuxt />
    <footer>
      <b-container class="d-flex justify-content-between align-items-center h-100">
        <div>
          <p class="mb-2">
            {{ $t('phone') }}: 0800-000000
          </p>
          <p class="mb-2">
            {{ $t('address') }}: 台北市xx區xx路xx號
          </p>
        </div>
        <div>
          <p>{{ $t('source') }}: 行政院農業委員會</p>
        </div>
      </b-container>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dropdown: false
    }
  }
}
</script>

<style>

</style>
<style lang="scss">
$primary: #F2BE58;
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
a{
  &:hover{
    text-decoration: none;
    cursor: pointer;
  }
}
html, body{
  font-family: 'Dela Gothic One', cursive;
}
header{
  position: fixed;
  z-index: 20;
  background: #FFFFFF;
  width: 100%;
  height: 120px;
  box-shadow: 0 0 5px 0 #000000;
  h1{
    @include mobile(){
      font-size: 30px;
    }
  }
  ul>li{
    padding-right: 20px;
    font-size: 20px;
  }
  ul li a{
    @include mobile(){
      font-size: 12px;
    }
  }
  .dropdown{
    position: relative;
  }
  .dropdown_Menu{
    position: absolute;
    background: #FFFFFF;
    width: 85px;
    left: 50%;
    a{
      text-align: center;
      border: 1px solid #000000;
      display: block;
      &:nth-child(1){
        border-bottom: none;
      }
    }
  }
}
footer{
  width: 100%;
  height: 120px;
  background: $primary;
  p{
    font-size: 20px;
  }
}
</style>
